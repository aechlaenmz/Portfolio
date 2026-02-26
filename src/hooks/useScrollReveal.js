import { useInView } from 'framer-motion'
import { useRef } from 'react'

export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold })

  return { ref, isInView }
}
