import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeMap = {
    small: 20,
    medium: 32,
    large: 48
  }

  const dotSize = sizeMap[size] || sizeMap.medium

  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
          style={{
            width: `${dotSize * 0.3}px`,
            height: `${dotSize * 0.3}px`,
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: `0 0 ${dotSize * 0.5}px var(--accent)`
          }}
        />
      ))}
    </div>
  )
}

export default LoadingSpinner
