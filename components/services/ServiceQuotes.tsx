"use client"

import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const quotes = [
    {
        text: "Privacy is not an option, and it shouldn't be the price we accept for just getting on the Internet.",
        author: "Gary Kovacs"
    },
    {
        text: "Arguing that you don't care about the right to privacy because you have nothing to hide is no different than saying you don't care about free speech because you have nothing to say.",
        author: "Edward Snowden"
    },
    {
        text: "Open source is the only way to build software that is verifiable and trustworthy.",
        author: "LocaLLM Philosophy"
    },
    {
        text: "Data is the new oil. Don't let yours spill.",
        author: "Security Principle"
    }
]

export function ServiceQuotes() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Manual navigation state
    const manualOffset = useMotionValue(0)

    // Combine scroll-based movement (percentage) with manual offset (pixels)
    // We use a transform to create a CSS calc() string
    const baseX = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])
    const manualX = useTransform(manualOffset, (value) => `${value}px`)
    const x = useTransform([baseX, manualX], ([base, manual]) => `calc(${base} + ${manual})`)

    const handlePrev = () => {
        const current = manualOffset.get()
        animate(manualOffset, current + 400, { type: "spring", stiffness: 300, damping: 30 })
    }

    const handleNext = () => {
        const current = manualOffset.get()
        animate(manualOffset, current - 400, { type: "spring", stiffness: 300, damping: 30 })
    }

    return (
        <section ref={containerRef} className="py-32 bg-black overflow-hidden border-y border-white/5 relative">
            {/* Navigation Controls */}
            <div className="absolute top-8 right-8 z-20 flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    className="rounded-full bg-black/50 border-white/10 text-white hover:bg-white/10"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    className="rounded-full bg-black/50 border-white/10 text-white hover:bg-white/10"
                >
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            <div className="relative w-full mt-12">
                {/* Gradient Overlay Left */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />

                {/* Gradient Overlay Right */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <motion.div
                    style={{ x }}
                    className="flex gap-16 w-max px-4"
                >
                    {/* Tripled list to ensure enough content for scrolling and manual nav */}
                    {[...quotes, ...quotes, ...quotes].map((quote, index) => (
                        <div
                            key={index}
                            className="w-[400px] md:w-[600px] flex-shrink-0 group"
                        >
                            <blockquote className="space-y-6">
                                <p className="text-2xl md:text-4xl font-serif text-zinc-500 group-hover:text-white transition-colors duration-500 leading-tight">
                                    "{quote.text}"
                                </p>
                                <footer className="text-sm font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500">
                                    ƒ?" {quote.author}
                                </footer>
                            </blockquote>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
