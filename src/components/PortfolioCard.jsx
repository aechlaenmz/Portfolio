import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, ExternalLink } from 'lucide-react';

const PortfolioCard = ({ project, onClick }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
                y: -12,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(project)}
            style={{
                background: 'var(--bg-secondary)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                boxShadow: '0 4px 20px var(--shadow)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
            }}
        >
            {/* Hover overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, var(--accent)20 0%, transparent 50%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />
            
            <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
                {project.type === 'video' ? (
                    <>
                        {project.poster ? (
                            <motion.img
                                src={project.poster}
                                alt={project.title}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease'
                                }}
                                whileHover={{ scale: 1.05 }}
                            />
                        ) : (
                            <video
                                src={project.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    pointerEvents: 'none'
                                }}
                            />
                        )}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'rgba(0,0,0,0.8)',
                                borderRadius: '50%',
                                padding: '1.2rem',
                                backdropFilter: 'blur(8px)',
                                color: 'white',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                            }}
                        >
                            <Play size={28} fill="white" />
                        </motion.div>
                    </>
                ) : (
                    <motion.img
                        src={project.url}
                        alt={project.title}
                        style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                        }}
                        whileHover={{ scale: 1.05 }}
                    />
                )}
                
                {/* Type indicator */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'var(--bg-secondary)',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--border)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        zIndex: 2
                    }}
                >
                    {project.type === 'video' ? <Play size={16} /> : <ImageIcon size={16} />}
                </motion.div>

                {/* View indicator on hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'var(--accent)',
                        color: '#000',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        zIndex: 2
                    }}
                >
                    <ExternalLink size={12} />
                    View
                </motion.div>
            </div>

            <div style={{ padding: '1.5rem', position: 'relative', zIndex: 2 }}>
                <motion.h3 
                    style={{ 
                        fontSize: '1.3rem', 
                        marginBottom: '0.5rem',
                        fontWeight: '700',
                        transition: 'color 0.2s ease'
                    }}
                    whileHover={{ color: 'var(--accent)' }}
                >
                    {project.title}
                </motion.h3>
                <p style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--text-secondary)', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden',
                    lineHeight: 1.5
                }}>
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
};

export default PortfolioCard;
