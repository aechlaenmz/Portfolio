import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const InteractiveBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const canvasRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const smoothMouse = useSpring(mousePosition, { stiffness: 100, damping: 20 });

    // Generate particles
    useEffect(() => {
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        }));
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 80,
                y: (e.clientY / window.innerHeight - 0.5) * 80,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animate particles
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => ({
                ...particle,
                x: (particle.x + particle.speedX + 100) % 100,
                y: (particle.y + particle.speedY + 100) % 100,
            })));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            overflow: 'hidden',
            pointerEvents: 'none'
        }}>
            {/* Dynamic Gradients with enhanced effects */}
            <motion.div
                animate={{
                    x: smoothMouse.x,
                    y: smoothMouse.y,
                }}
                transition={{ type: 'spring', damping: 50, stiffness: 200 }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    width: '140%',
                    height: '140%',
                    background: `
                        radial-gradient(circle at 25% 25%, var(--accent) 0%, transparent 35%),
                        radial-gradient(circle at 75% 75%, var(--accent) 0%, transparent 35%),
                        radial-gradient(circle at 50% 10%, var(--accent-hover) 0%, transparent 25%)
                    `,
                    opacity: 0.2,
                    filter: 'blur(100px)',
                }}
            />

            {/* Secondary gradient layer */}
            <motion.div
                animate={{
                    x: -smoothMouse.x * 0.5,
                    y: -smoothMouse.y * 0.5,
                }}
                transition={{ type: 'spring', damping: 60, stiffness: 150 }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '120%',
                    height: '120%',
                    background: `
                        radial-gradient(circle at 80% 20%, var(--accent-hover) 0%, transparent 30%),
                        radial-gradient(circle at 20% 80%, var(--accent) 0%, transparent 30%)
                    `,
                    opacity: 0.15,
                    filter: 'blur(120px)',
                }}
            />

            {/* Grid Pattern — two-level glowing grid */}
            <motion.div
                style={{
                    y,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '200%',
                    backgroundImage: `
                        linear-gradient(rgba(232,242,0,0.12) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(232,242,0,0.12) 1px, transparent 1px),
                        linear-gradient(rgba(232,242,0,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(232,242,0,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '120px 120px, 120px 120px, 30px 30px, 30px 30px',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)'
                }}
            />

            {/* Floating Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    animate={{
                        x: `${particle.x}%`,
                        y: `${particle.y}%`,
                        opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
                    }}
                    transition={{
                        x: { duration: 20, repeat: Infinity, ease: "linear" },
                        y: { duration: 25, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{
                        position: 'absolute',
                        width: `${particle.size * 2}px`,
                        height: `${particle.size * 2}px`,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        filter: 'blur(1px)',
                        boxShadow: `0 0 ${particle.size * 4}px var(--accent)`,
                    }}
                />
            ))}

            {/* Enhanced Floating Blobs */}
            <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={`blob-${i}`}
                        animate={{
                            x: [0, 30, -30, 0],
                            y: [0, -20, 20, 0],
                            scale: [1, 1.2, 0.8, 1],
                            opacity: [0.1, 0.2, 0.15, 0.1],
                        }}
                        transition={{
                            duration: 15 + i * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 2
                        }}
                        style={{
                            position: 'absolute',
                            width: `${25 + i * 5}vw`,
                            height: `${25 + i * 5}vw`,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
                            filter: 'blur(150px)',
                            left: `${15 + i * 20}%`,
                            top: `${10 + i * 15}%`,
                        }}
                    />
                ))}
            </div>

            {/* Noise texture overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.03,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

export default InteractiveBackground;
