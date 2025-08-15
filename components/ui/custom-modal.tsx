'use client'

import React, { useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

export function CustomModal({
  isOpen,
  onClose,
  children,
  className,
  title,
  description
}: CustomModalProps) {
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.removeEventListener('keydown', handleEsc)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, handleEsc])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" />
      
      {/* Modal */}
      <div className={cn(
        "relative bg-background rounded-lg shadow-lg max-w-4xl max-h-[80vh] overflow-y-auto",
        "z-50 p-6 m-4 border",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity z-10"
          type="button"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
        
        {/* Header */}
        {(title || description) && (
          <div className="mb-4 pr-8">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        
        {/* Content */}
        <div className="pr-2">
          {children}
        </div>
      </div>
    </div>
  )
}