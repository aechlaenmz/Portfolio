import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioCard from './PortfolioCard';
import LoadingSpinner from './LoadingSpinner';
import { projects } from '../data/projects';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const PortfolioGrid = ({ onProjectSelect }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const visibleProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        setIsLoading(true);
        setTimeout(() => {
            setCurrentPage(newPage);
            setIsLoading(false);
        }, 300);
    };

    return (
        <div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        padding: '2rem 0'
                    }}
                >
                    {visibleProjects.map((project) => (
                        <PortfolioCard
                            key={project.id}
                            project={project}
                            onClick={onProjectSelect}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '2rem 0'
                }}>
                    <motion.button
                        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0 || isLoading}
                        whileHover={{ scale: currentPage === 0 || isLoading ? 1 : 1.1 }}
                        whileTap={{ scale: currentPage === 0 || isLoading ? 1 : 0.95 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            color: currentPage === 0 || isLoading ? 'var(--bg-hover)' : 'var(--text-primary)',
                            transition: 'all 0.3s ease',
                            cursor: currentPage === 0 || isLoading ? 'not-allowed' : 'pointer',
                            boxShadow: currentPage === 0 || isLoading ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        {isLoading && currentPage === 0 ? (
                            <LoadingSpinner size="small" />
                        ) : (
                            <ChevronLeft size={20} />
                        )}
                    </motion.button>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => handlePageChange(i)}
                                disabled={isLoading}
                                whileHover={{ scale: isLoading ? 1 : 1.2 }}
                                whileTap={{ scale: isLoading ? 1 : 0.9 }}
                                style={{
                                    width: currentPage === i ? '36px' : '12px',
                                    height: '12px',
                                    borderRadius: '6px',
                                    background: currentPage === i ? 'var(--accent)' : 'var(--bg-hover)',
                                    transition: 'all 0.3s ease',
                                    cursor: isLoading ? 'not-allowed' : 'pointer'
                                }}
                            />
                        ))}
                    </div>

                    <motion.button
                        onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                        disabled={currentPage === totalPages - 1 || isLoading}
                        whileHover={{ scale: currentPage === totalPages - 1 || isLoading ? 1 : 1.1 }}
                        whileTap={{ scale: currentPage === totalPages - 1 || isLoading ? 1 : 0.95 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            color: currentPage === totalPages - 1 || isLoading ? 'var(--bg-hover)' : 'var(--text-primary)',
                            transition: 'all 0.3s ease',
                            cursor: currentPage === totalPages - 1 || isLoading ? 'not-allowed' : 'pointer',
                            boxShadow: currentPage === totalPages - 1 || isLoading ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        {isLoading && currentPage === totalPages - 1 ? (
                            <LoadingSpinner size="small" />
                        ) : (
                            <ChevronRight size={20} />
                        )}
                    </motion.button>
                </div>
            )}
        </div>
    );
};

export default PortfolioGrid;
