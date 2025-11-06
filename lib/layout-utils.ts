import { cn } from './utils'
import { LAYOUT_CLASSES } from '@/utils/constants'

// Reusable layout component classes
export const containerClass = LAYOUT_CLASSES.container

export const sectionClass = LAYOUT_CLASSES.section

export const sectionCompactClass = LAYOUT_CLASSES.sectionCompact

// Combined utility functions
export function sectionContainerClass(className?: string) {
  return cn(containerClass, className)
}

export function sectionWrapperClass(className?: string) {
  return cn(sectionClass, className)
}

