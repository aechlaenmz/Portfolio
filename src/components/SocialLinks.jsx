import { motion } from 'framer-motion'
import { Github, Youtube, Twitter, MessageCircle } from 'lucide-react'

const SocialLinks = ({ style = {} }) => {
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/aechlaenm',
      label: 'GitHub',
      color: '#ffffff'
    },
    {
      icon: Youtube,
      href: 'https://youtube.com/@aechlaenm',
      label: 'YouTube',
      color: '#ff0000'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/aechlaenm',
      label: 'Twitter',
      color: '#1da1f2'
    },
    {
      icon: MessageCircle,
      href: 'https://discord.gg/aechlaenm',
      label: 'Discord',
      color: '#5865f2'
    }
  ]

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      ...style
    }}>
      {socialLinks.map((link, index) => {
        const Icon = link.icon
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ 
              scale: 1.1,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = link.color
              e.currentTarget.style.borderColor = link.color
              e.currentTarget.style.boxShadow = `0 4px 20px ${link.color}20`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Icon size={20} />
          </motion.a>
        )
      })}
    </div>
  )
}

export default SocialLinks
