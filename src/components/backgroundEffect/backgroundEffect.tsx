import React, { useState, useEffect } from 'react';

import styles from './backgroundEffect.module.css';


interface BackgroundEffectProps {
    children: React.ReactNode;
}

export default function BackgroundEffect(props: BackgroundEffectProps) {

    const { children } = props;

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.pageX, y: e.pageY });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            className={styles.backgroundEffect}
            style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(10, 69, 158,0.22), rgba(230, 241, 255,0) 35%)`,
                width: '100%',
                height: 'auto',
            }}
        >
            {children}
        </div>
    );
}
