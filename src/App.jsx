import { useState, useEffect } from 'react'
import Header from './components/Header'
import PortfolioGrid from './components/PortfolioGrid'
import ProjectModal from './components/ProjectModal'
import TypingAnimation from './components/TypingAnimation'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  const [selectedProject, setSelectedProject] = useState(null)
  const { ref: portfolioRef, isInView: portfolioInView } = useScrollReveal(0.1)
  const { ref: footerRef, isInView: footerInView } = useScrollReveal(0.1)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="app">
      <Header theme={theme} setTheme={setTheme} />

      <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container">
          {/* Hero Section */}
          <section style={{
            padding: '6rem 0 4rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: ' clamp(3rem, 8vw, 5rem)', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: 1 }}
            >
              Aechlaenm
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '1.5rem', color: 'var(--accent)', minHeight: '2em' }}
            >
              <TypingAnimation
                words={[
                  "Roblox Developer",
                  "Programmer"
                ]}
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px' }}
            >
              Hi, I'm Aechlaenm — a passionate Roblox developer based in GMT+7. I've contributed to games with over 4B combined visits on the platform. Have a project in mind? Feel free to reach out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '99px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>Discord:</span>
              <span style={{ color: 'var(--accent)' }}>@aechlaenm</span>
            </motion.div>

          </section>

          {/* Portfolio Grid */}
          <motion.section
            ref={portfolioRef}
            initial={{ opacity: 0, y: 50 }}
            animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={portfolioInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}
            >
              <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Selected Works</h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={portfolioInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}
              >
                {selectedProject ? 'Viewing Detail' : 'Click to explore'}
              </motion.p>
            </motion.div>
            <PortfolioGrid onProjectSelect={setSelectedProject} />
          </motion.section>
        </div>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <motion.footer 
        ref={footerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={footerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', marginTop: '4rem', textAlign: 'center' }}
      >
        <motion.p 
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}
        >
          © {new Date().getFullYear()} Aechlaenm
        </motion.p>
      </motion.footer>
    </div>
  )
}

export default App
