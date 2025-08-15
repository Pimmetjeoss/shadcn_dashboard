'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

// Context for sidebar state
const SidebarContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

export function SidebarProvider({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = React.useState(true)

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div
        className={cn("flex min-h-screen w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("SidebarTrigger must be used within SidebarProvider")

  return (
    <button
      className={cn("p-2 hover:bg-accent rounded-md", className)}
      onClick={(event) => {
        context.setOpen(!context.open)
        onClick?.(event)
      }}
      {...props}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}

export function SidebarInset({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn("flex flex-1 flex-col bg-background", className)}
      {...props}
    />
  )
}