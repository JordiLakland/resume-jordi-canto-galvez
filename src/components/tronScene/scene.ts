// Vanilla three.js TRON scene. Loaded lazily (own chunk) after the page content is painted.
//
// The camera travels forward along -Z as the page scrolls, crossing three layers:
//   frontend  (z    0 .. -40)  floating wireframe UI panels
//   API       (z  -30 .. -75)  light-cycle data packets racing over the grid
//   backend   (z  -78 .. -118) server racks with blinking LEDs
// and ends facing an open horizon for the contact section.

import {
    AdditiveBlending,
    BoxGeometry,
    BufferGeometry,
    Color,
    DoubleSide,
    Float32BufferAttribute,
    Group,
    InstancedBufferAttribute,
    InstancedMesh,
    LineBasicMaterial,
    LineSegments,
    Material,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    PlaneGeometry,
    Points,
    PointsMaterial,
    SRGBColorSpace,
    Scene,
    ShaderMaterial,
    Vector3,
    WebGLRenderer,
} from 'three';

import { accentMix, accentRgb, BG_COLOR, CYAN, ORANGE } from './palette';
import {
    gridFragment,
    gridVertex,
    horizonFragment,
    horizonVertex,
    packetFragment,
    packetVertex,
    rackFragment,
    rackVertex,
} from './shaders';

export interface TronSceneOptions {
    lite: boolean;
}

export interface TronScene {
    setScroll(progress: number): void;
    setPointer(x: number, y: number): void;
    resize(): void;
    dispose(): void;
}

const FOG_DENSITY = 0.028;
const CAMERA_START_Z = 8;
const CAMERA_TRAVEL = 133;
const PACKET_LENGTH = 3.2;

// Deterministic random so the layout is identical on every visit.
function seededRandom(seed: number) {
    return () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    };
}

export function createTronScene(canvas: HTMLCanvasElement, options: TronSceneOptions): TronScene {
    const { lite } = options;
    const random = seededRandom(42);
    const range = (min: number, max: number) => min + random() * (max - min);

    const renderer = new WebGLRenderer({ canvas, antialias: !lite, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1 : 1.5));

    const bg = new Color(BG_COLOR);
    const cyan = new Color(CYAN);
    const orange = new Color(ORANGE);
    const accent = cyan.clone();

    const scene = new Scene();
    scene.background = bg;

    const camera = new PerspectiveCamera(60, 1, 0.1, 400);
    const lookTarget = new Vector3();

    const fogUniforms = {
        uBg: { value: bg },
        uFogDensity: { value: FOG_DENSITY },
    };
    const timeUniform = { value: 0 };

    // ---- Grid floor ---------------------------------------------------------
    const gridMaterial = new ShaderMaterial({
        vertexShader: gridVertex,
        fragmentShader: gridFragment,
        uniforms: {
            ...fogUniforms,
            uColor: { value: accent },
            uCam: { value: camera.position },
            uTime: timeUniform,
        },
    });
    const grid = new Mesh(new PlaneGeometry(400, 400), gridMaterial);
    grid.rotation.x = -Math.PI / 2;
    grid.position.z = -60;
    scene.add(grid);

    // ---- Horizon glow -------------------------------------------------------
    const horizonMaterial = new ShaderMaterial({
        vertexShader: horizonVertex,
        fragmentShader: horizonFragment,
        uniforms: { uColor: { value: accent } },
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
    });
    const horizon = new Mesh(new PlaneGeometry(700, 120), horizonMaterial);
    horizon.position.set(0, 0, -280);
    scene.add(horizon);

    // ---- Frontend layer: wireframe UI panels ---------------------------------
    const panelLines = new LineBasicMaterial({
        color: cyan,
        transparent: true,
        opacity: 0.55,
        blending: AdditiveBlending,
        depthWrite: false,
    });
    const panelFill = new MeshBasicMaterial({
        color: cyan,
        transparent: true,
        opacity: 0.035,
        blending: AdditiveBlending,
        depthWrite: false,
        side: DoubleSide,
    });
    const panelGeometries = [createWindowPanelGeometry(), createCardPanelGeometry()];
    const panelFillGeometry = new PlaneGeometry(4, 2.6);
    const panels = new Group();
    const panelCount = lite ? 8 : 16;
    for (let i = 0; i < panelCount; i++) {
        const side = i % 2 === 0 ? -1 : 1;
        const panel = new Group();
        panel.add(new LineSegments(panelGeometries[i % panelGeometries.length], panelLines));
        panel.add(new Mesh(panelFillGeometry, panelFill));
        panel.position.set(side * range(4.5, 13), range(1.6, 6.5), 3 - (i / panelCount) * 42 - range(0, 2));
        panel.rotation.y = -side * range(0.25, 0.55);
        panel.scale.setScalar(range(0.7, 1.25));
        panel.userData.baseY = panel.position.y;
        panel.userData.phase = range(0, Math.PI * 2);
        panels.add(panel);
    }
    scene.add(panels);

    // ---- API layer: light-cycle packets ---------------------------------------
    const packetCount = lite ? 18 : 40;
    const packetGeometry = new BoxGeometry(0.1, 0.1, PACKET_LENGTH);
    packetGeometry.translate(0, 0, PACKET_LENGTH / 2); // head at z=0, tail towards +z
    const packetColors = new Float32Array(packetCount * 3);
    const packetData: { axis: 'x' | 'z'; lane: number; dir: number; speed: number; offset: number }[] = [];
    for (let i = 0; i < packetCount; i++) {
        const axis = random() < 0.55 ? 'z' : 'x';
        const lane = axis === 'z'
            ? (random() < 0.5 ? -1 : 1) * Math.round(range(4, 22) / 2) * 2
            : -Math.round(range(16, 37)) * 2;
        packetData.push({ axis, lane, dir: random() < 0.5 ? -1 : 1, speed: range(6, 16), offset: range(0, 100) });
        (random() < 0.5 ? cyan : orange).toArray(packetColors, i * 3);
    }
    packetGeometry.setAttribute('aColor', new InstancedBufferAttribute(packetColors, 3));
    const packetMaterial = new ShaderMaterial({
        vertexShader: packetVertex,
        fragmentShader: packetFragment,
        uniforms: { ...fogUniforms, uLength: { value: PACKET_LENGTH } },
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
    });
    const packets = new InstancedMesh(packetGeometry, packetMaterial, packetCount);
    packets.frustumCulled = false;
    scene.add(packets);
    const dummy = new Object3D();

    function updatePackets(time: number) {
        packetData.forEach((p, i) => {
            if (p.axis === 'z') {
                // travels along a z-lane between z=-30 and z=-75
                const t = (time * p.speed + p.offset) % 45;
                dummy.position.set(p.lane, 0.06, p.dir < 0 ? -30 - t : -75 + t);
                dummy.rotation.set(0, p.dir < 0 ? 0 : Math.PI, 0);
            } else {
                const t = (time * p.speed + p.offset) % 56;
                dummy.position.set(p.dir < 0 ? 28 - t : -28 + t, 0.06, p.lane);
                dummy.rotation.set(0, p.dir < 0 ? Math.PI / 2 : -Math.PI / 2, 0);
            }
            dummy.updateMatrix();
            packets.setMatrixAt(i, dummy.matrix);
        });
        packets.instanceMatrix.needsUpdate = true;
    }

    // ---- Backend layer: server racks -------------------------------------------
    const rackRowStep = lite ? 8 : 4;
    const rackSlots: [number, number][] = [];
    for (let z = -78; z >= -118; z -= rackRowStep) {
        for (const x of [-4.2, -6.4, 4.2, 6.4, -10, 10]) {
            if (lite && Math.abs(x) > 7) continue;
            if (random() < 0.15) continue;
            rackSlots.push([x, z]);
        }
    }
    const rackGeometry = new BoxGeometry(1, 1, 1);
    rackGeometry.translate(0, 0.5, 0);
    const rackData = new Float32Array(rackSlots.length * 2);
    const rackMaterial = new ShaderMaterial({
        vertexShader: rackVertex,
        fragmentShader: rackFragment,
        uniforms: { ...fogUniforms, uColor: { value: orange }, uTime: timeUniform },
    });
    const racks = new InstancedMesh(rackGeometry, rackMaterial, rackSlots.length);
    rackSlots.forEach(([x, z], i) => {
        const height = Math.abs(x) > 8 ? range(4, 8) : range(1.6, 4.2);
        dummy.position.set(x, 0, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1.3, height, 1.3);
        dummy.updateMatrix();
        racks.setMatrixAt(i, dummy.matrix);
        rackData[i * 2] = height;
        rackData[i * 2 + 1] = random() * 10;
    });
    rackGeometry.setAttribute('aData', new InstancedBufferAttribute(rackData, 2));
    scene.add(racks);

    // ---- Floating data dust -------------------------------------------------
    const dustCount = lite ? 150 : 400;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
        dustPositions.set([range(-30, 30), range(0.3, 14), range(12, -140)], i * 3);
    }
    const dustGeometry = new BufferGeometry();
    dustGeometry.setAttribute('position', new Float32BufferAttribute(dustPositions, 3));
    const dustMaterial = new PointsMaterial({
        color: accent,
        size: 0.07,
        transparent: true,
        opacity: 0.6,
        blending: AdditiveBlending,
        depthWrite: false,
    });
    scene.add(new Points(dustGeometry, dustMaterial));

    // ---- Animation state ------------------------------------------------------
    let targetProgress = 0;
    let progress = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    function updateCamera() {
        const z = CAMERA_START_Z - progress * CAMERA_TRAVEL;
        const y = 2.8 - progress * 0.8;
        camera.position.set(pointer.x * 0.8, y + pointer.y * 0.35, z);
        lookTarget.set(pointer.x * 0.3, y - 1.1, z - 12);
        camera.lookAt(lookTarget);

        const [r, g, b] = accentRgb(accentMix(progress));
        accent.setRGB(r / 255, g / 255, b / 255, SRGBColorSpace);
    }

    function render() {
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;
        elapsed += dt;
        timeUniform.value = elapsed;

        const ease = 1 - Math.exp(-dt * 5);
        progress += (targetProgress - progress) * ease;
        pointer.x += (pointer.tx - pointer.x) * ease * 0.6;
        pointer.y += (pointer.ty - pointer.y) * ease * 0.6;
        updateCamera();

        panels.children.forEach((panel) => {
            panel.position.y = panel.userData.baseY + Math.sin(elapsed * 0.6 + panel.userData.phase) * 0.25;
        });
        updatePackets(elapsed);

        renderer.render(scene, camera);
    }

    function loop() {
        render();
        frame = requestAnimationFrame(loop);
    }

    function onVisibilityChange() {
        cancelAnimationFrame(frame);
        if (!document.hidden) {
            lastTime = performance.now();
            frame = requestAnimationFrame(loop);
        }
    }

    function resize() {
        const parent = canvas.parentElement ?? canvas;
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // keep the corridor framed on portrait screens
        camera.fov = camera.aspect < 1 ? 75 : 60;
        camera.updateProjectionMatrix();
    }

    resize();
    render();
    frame = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return {
        setScroll(value) {
            targetProgress = value;
        },
        setPointer(x, y) {
            pointer.tx = x;
            pointer.ty = y;
        },
        resize,
        dispose() {
            cancelAnimationFrame(frame);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            scene.traverse((object) => {
                if (object instanceof Mesh || object instanceof LineSegments || object instanceof Points) {
                    object.geometry.dispose();
                    (object.material as Material).dispose();
                }
            });
            renderer.dispose();
        },
    };
}

// A browser-ish window: frame, title bar with dots, text lines and a button.
function createWindowPanelGeometry() {
    const w = 2, h = 1.3;
    const segments: number[] = [];
    const line = (x1: number, y1: number, x2: number, y2: number) => segments.push(x1, y1, 0, x2, y2, 0);
    const rect = (x1: number, y1: number, x2: number, y2: number) => {
        line(x1, y1, x2, y1); line(x2, y1, x2, y2); line(x2, y2, x1, y2); line(x1, y2, x1, y1);
    };
    rect(-w, -h, w, h);
    line(-w, h - 0.32, w, h - 0.32);
    for (let i = 0; i < 3; i++) rect(-w + 0.12 + i * 0.22, h - 0.22, -w + 0.24 + i * 0.22, h - 0.1);
    line(-w + 0.25, 0.55, 0.6, 0.55);
    line(-w + 0.25, 0.25, 1.2, 0.25);
    line(-w + 0.25, -0.05, 0.1, -0.05);
    rect(w - 1.1, -h + 0.25, w - 0.25, -h + 0.6);
    return toGeometry(segments);
}

// A card component: image placeholder with a cross, heading and text lines.
function createCardPanelGeometry() {
    const w = 2, h = 1.3;
    const segments: number[] = [];
    const line = (x1: number, y1: number, x2: number, y2: number) => segments.push(x1, y1, 0, x2, y2, 0);
    const rect = (x1: number, y1: number, x2: number, y2: number) => {
        line(x1, y1, x2, y1); line(x2, y1, x2, y2); line(x2, y2, x1, y2); line(x1, y2, x1, y1);
    };
    rect(-w, -h, w, h);
    rect(-w + 0.2, -h + 0.2, -0.2, h - 0.2);
    line(-w + 0.2, -h + 0.2, -0.2, h - 0.2);
    line(-w + 0.2, h - 0.2, -0.2, -h + 0.2);
    line(0.15, 0.8, 1.6, 0.8);
    line(0.15, 0.4, 1.75, 0.4);
    line(0.15, 0.15, 1.3, 0.15);
    line(0.15, -0.1, 1.5, -0.1);
    rect(0.15, -h + 0.25, 1.1, -h + 0.6);
    return toGeometry(segments);
}

function toGeometry(segments: number[]) {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(segments, 3));
    return geometry;
}
