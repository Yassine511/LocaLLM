"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function ServiceIntro() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black pt-40">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-black" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                            Sovereign AI <br />
                            <span className="text-zinc-500">Infrastructure.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">
                            We provide the physical and digital foundation for your private AI.
                            From high-performance GPU clusters to secure, air-gapped environments,
                            LocaLLM ensures your models run where they belong:
                            <span className="text-white font-medium"> on your terms.</span>
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300">
                                NVIDIA H100/A100 Clusters
                            </div>
                            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300">
                                Air-Gapped Security
                            </div>
                            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300">
                                24/7 On-Site Support
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-video w-full scale-150 mx-auto">
                            {/* Glow Effect */}
                            {/* Glow Effect Removed */}


                            <div className="relative h-full w-full">
                                <Image
                                    src="/services-gpu-v2.jpg"
                                    alt="High-Performance GPU Cluster"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div >
        </section >
    )
}
