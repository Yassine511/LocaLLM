"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for additional polish
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  const isAppPage = pathname?.startsWith("/dashboard") || pathname?.startsWith("/demo") || pathname?.startsWith("/rent")

  return (
    <nav className={cn(
      "fixed z-50 flex justify-center pointer-events-none",
      isAppPage ? "top-0 left-0 right-0 px-0" : "top-6 left-0 right-0 px-4"
    )}>
      <div
        className={cn(
          "pointer-events-auto relative flex items-center justify-between",
          "h-14 px-2 pl-6 pr-2",
          "border border-white/10",
          "bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/50",
          "transition-all duration-300 ease-in-out",
          isAppPage ? "w-full max-w-none rounded-none border-x-0 border-t-0" : "w-full max-w-5xl rounded-full",
          scrolled ? "bg-black/90 border-white/5" : "bg-black/60"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-8">
          <span className="text-lg font-bold tracking-tight text-white">LocaLLM</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                "text-zinc-400 hover:text-white hover:bg-white/5",
                pathname === link.href && "text-white bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 ml-auto">


          <Link href="/demo">
            <Button
              className={cn(
                "rounded-full h-10 px-5",
                "bg-zinc-900 text-white border border-white/10",
                "hover:bg-zinc-800 hover:text-white hover:border-white/20",
                "shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset]", // Top highlight
                "group relative overflow-hidden"
              )}
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                DEMO
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              {/* Subtle bottom glow */}
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-zinc-400 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 ml-2"
                suppressHydrationWarning
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full border-b border-white/10 bg-black/95 backdrop-blur-xl pt-20 pb-10">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px w-12 bg-white/10 my-2" />
                <Link href="/demo" onClick={() => setIsOpen(false)}>
                  <Button className="rounded-full px-8 bg-white text-black hover:bg-zinc-200">
                    Demo
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
