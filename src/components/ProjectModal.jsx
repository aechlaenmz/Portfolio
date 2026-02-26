import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
                background: 'rgba(0,0,0,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                backdropFilter: 'blur(8px)'
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{
                    background: 'var(--bg-secondary)',
                    width: '100%',
                    maxWidth: '1000px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        zIndex: 10,
                        background: 'var(--bg-secondary)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        color: 'var(--text-primary)'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ width: '100%', background: '#000', display: 'flex', justifyContent: 'center' }}>
                    {project.type === 'video' ? (
                        <video
                            src={project.url}
                            controls
                            autoPlay
                            style={{ width: '100%', maxHeight: '60vh', display: 'block' }}
                        />
                    ) : (
                        <img
                            src={project.url}
                            alt={project.title}
                            style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', display: 'block' }}
                        />
                    )}
                </div>

                <div style={{ padding: '2.5rem', overflowY: 'auto' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '800' }}>{project.title}</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                        {project.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
