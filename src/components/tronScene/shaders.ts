// GLSL for the TRON scene. Kept tiny on purpose: no textures, everything procedural.

const FOG = /* glsl */ `
    uniform vec3 uBg;
    uniform float uFogDensity;
    vec3 applyFog(vec3 color, float depth) {
        float f = 1.0 - exp(-uFogDensity * uFogDensity * depth * depth);
        return mix(color, uBg, clamp(f, 0.0, 1.0));
    }
`;

export const gridVertex = /* glsl */ `
    varying vec3 vWorld;
    void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
    }
`;

export const gridFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uCam;
    uniform float uTime;
    varying vec3 vWorld;
    ${FOG}

    float gridLine(vec2 p, float size, float width) {
        vec2 c = p / size;
        vec2 g = abs(fract(c - 0.5) - 0.5) / (fwidth(c) * width);
        return 1.0 - min(min(g.x, g.y), 1.0);
    }

    void main() {
        float minor = gridLine(vWorld.xz, 2.0, 1.0);
        float major = gridLine(vWorld.xz, 10.0, 1.6);
        // scan band sweeping forward along the floor
        float scan = smoothstep(2.5, 0.0, abs(mod(vWorld.z + uTime * 10.0, 70.0) - 35.0));
        float intensity = minor * (0.22 + scan * 0.6) + major * 0.75;
        vec3 color = uBg + uColor * intensity;
        float depth = length(vWorld - uCam);
        gl_FragColor = vec4(applyFog(color, depth), 1.0);
        #include <colorspace_fragment>
    }
`;

export const rackVertex = /* glsl */ `
    attribute vec2 aData; // x: height in world units, y: random seed
    varying vec2 vUv;
    varying vec2 vData;
    varying float vSide;
    varying float vDepth;
    void main() {
        vUv = uv;
        vData = aData;
        vSide = 1.0 - abs(normal.y);
        vec4 mv = viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
    }
`;

export const rackFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform float uTime;
    varying vec2 vUv;
    varying vec2 vData;
    varying float vSide;
    varying float vDepth;
    ${FOG}

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        vec2 fw = fwidth(vUv) * 1.5;
        vec2 e = 1.0 - smoothstep(vec2(0.0), fw, min(vUv, 1.0 - vUv));
        float edge = max(e.x, e.y);

        // blinking status LEDs, one grid per server unit
        float rows = vData.x * 2.5;
        float r = floor(vUv.y * rows);
        float fy = fract(vUv.y * rows);
        float c = floor(vUv.x * 6.0);
        float fx = fract(vUv.x * 6.0);
        float dotMask = step(0.3, fx) * step(fx, 0.6) * step(0.42, fy) * step(fy, 0.58);
        float rate = 0.6 + hash(vec2(r, vData.y)) * 2.5;
        float on = step(0.62, hash(vec2(r + vData.y * 17.0, c + floor(uTime * rate))));
        float unitLine = (1.0 - smoothstep(0.0, fw.y * rows, fy)) * 0.12;

        float intensity = edge * 0.6 + (dotMask * on * 0.6 + unitLine) * vSide;
        vec3 color = uBg * 1.6 + uColor * intensity;
        gl_FragColor = vec4(applyFog(color, vDepth), 1.0);
        #include <colorspace_fragment>
    }
`;

export const packetVertex = /* glsl */ `
    attribute vec3 aColor;
    uniform float uLength;
    varying vec3 vColor;
    varying float vTail;
    varying float vDepth;
    void main() {
        vColor = aColor;
        vTail = clamp(position.z / uLength, 0.0, 1.0);
        vec4 mv = viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
    }
`;

export const packetFragment = /* glsl */ `
    varying vec3 vColor;
    varying float vTail;
    varying float vDepth;
    uniform float uFogDensity;
    void main() {
        float fade = pow(1.0 - vTail, 2.0);
        float fog = exp(-uFogDensity * uFogDensity * vDepth * vDepth);
        float near = smoothstep(4.0, 14.0, vDepth); // avoid huge slabs right under the camera
        gl_FragColor = vec4(vColor * (fade * 1.4 + 0.05) * fog * near, 1.0);
        #include <colorspace_fragment>
    }
`;

export const horizonVertex = /* glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const horizonFragment = /* glsl */ `
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
        float y = vUv.y - 0.5;
        float glow = exp(-abs(y) * 14.0) * 0.45 + exp(-abs(y) * 90.0) * 0.6;
        float sides = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x);
        gl_FragColor = vec4(uColor * glow * sides, 1.0);
        #include <colorspace_fragment>
    }
`;
