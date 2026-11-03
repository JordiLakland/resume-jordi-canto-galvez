import { useEffect, useRef, useState } from 'react';
import { cssClass } from '../../utils/style';
import { accentMix, accentRgb } from './palette';
import type { TronScene } from './scene';

import styles from './TronBackground.module.css';

const SECTIONS = ['about', 'experience', 'skills', 'contact'];

function supportsWebGL() {
    try {
        return !!document.createElement('canvas').getContext('webgl2');
    } catch {
        return false;
    }
}

// Maps the scroll position to [0, 1] so each section covers an equal slice of the
// scene: about -> frontend, experience -> API, skills -> backend, contact -> horizon.
function scrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    if (window.scrollY >= maxScroll - 2) return 1;

    const marker = window.scrollY + window.innerHeight * 0.35;
    const tops = SECTIONS.map((id) => {
        const element = document.getElementById(id);
        return element ? element.getBoundingClientRect().top + window.scrollY : 0;
    });
    tops.push(maxScroll + window.innerHeight * 0.35);

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
        if (marker >= tops[i]) {
            const local = (marker - tops[i]) / Math.max(tops[i + 1] - tops[i], 1);
            return Math.min((i + Math.min(local, 1)) / SECTIONS.length, 1);
        }
    }
    return 0;
}

export default function TronBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        let scene: TronScene | undefined;
        let cancelled = false;
        let scheduled = 0;

        const update = () => {
            scheduled = 0;
            const progress = scrollProgress();
            root.style.setProperty('--accent-rgb', accentRgb(accentMix(progress)).join(' '));
            scene?.setScroll(progress);
        };
        const onScroll = () => {
            if (!scheduled) scheduled = requestAnimationFrame(update);
        };
        const onPointerMove = (e: PointerEvent) => {
            scene?.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
        };
        const onResize = () => {
            scene?.resize();
            onScroll();
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        window.addEventListener('pointermove', onPointerMove, { passive: true });

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const hasIdle = 'requestIdleCallback' in window;
        const idle = (cb: () => void) =>
            hasIdle ? window.requestIdleCallback(cb, { timeout: 1500 }) : window.setTimeout(cb, 200);
        const cancelIdle = (handle: number) =>
            hasIdle ? window.cancelIdleCallback(handle) : window.clearTimeout(handle);
        let idleHandle: number | undefined;

        if (!reducedMotion && supportsWebGL()) {
            // Load three.js only once the content is on screen.
            idleHandle = idle(() => {
                import('./scene').then(({ createTronScene }) => {
                    const canvas = canvasRef.current;
                    if (cancelled || !canvas) return;
                    const lite = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
                    scene = createTronScene(canvas, { lite });
                    scene.setScroll(scrollProgress());
                    requestAnimationFrame(() => !cancelled && setReady(true));
                });
            });
        }

        return () => {
            cancelled = true;
            if (idleHandle !== undefined) cancelIdle(idleHandle);
            cancelAnimationFrame(scheduled);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('pointermove', onPointerMove);
            scene?.dispose();
        };
    }, []);

    return (
        <div className={styles.container} aria-hidden="true">
            <div className={styles.fallbackGrid} />
            <canvas ref={canvasRef} className={cssClass(styles.canvas, ready && styles.ready)} />
            <div className={styles.vignette} />
        </div>
    );
}
