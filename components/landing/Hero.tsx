"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ParticleSphere } from "@/components/landing/ParticleSphere"

export function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16">
            <ParticleSphere />
            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto max-w-4xl"
                >
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-md">
                        <span className="mr-2 flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Secure On-Premise AI Computing
                    </div>

                    <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
                        AI Without <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                            Compromise
                        </span>
                    </h1>

                    <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400 sm:text-xl">
                        Secure. Local. Yours. Deploy fine-tuned open-source LLMs on your own infrastructure.
                        Zero data leakage. Full regulatory compliance.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/demo">
                            <Button size="lg" className="h-12 min-w-[160px] rounded-full bg-white text-black hover:bg-zinc-200">
                                Try Demo
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#contact">
                            <Button size="lg" variant="outline" className="h-12 min-w-[160px] rounded-full border-white/20 bg-black/50 text-white backdrop-blur-sm hover:bg-white/10">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-zinc-500">Scroll to explore</span>
                    <div className="h-12 w-[1px] bg-gradient-to-b from-zinc-500 to-transparent" />
                </div>
            </motion.div>
        </section>
    )
}
