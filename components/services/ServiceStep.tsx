"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type ServiceStepProps = {
    stepNumber: number
    title: string
    description: string
    icon: LucideIcon
    isLast?: boolean
}

export function ServiceStep({ stepNumber, title, description, icon: Icon, isLast }: ServiceStepProps) {
    return (
        <div className="relative pl-14 py-6 group">
            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-[22px] top-[56px] w-[2px] h-[calc(100%-40px)] bg-gradient-to-b from-[#4B0082]/60 via-[#00BFFF]/30 to-transparent" />
            )}

            {/* Step badge */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black border border-white/10 shadow-[0_0_20px_rgba(0,191,255,0.35)] group-hover:shadow-[0_0_30px_rgba(75,0,130,0.4)] transition-shadow"
            >
                <Icon className="h-6 w-6 text-[#00BFFF]" />
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className={cn(
                    "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm",
                    "hover:border-[#00BFFF]/40 hover:bg-white/10 transition-colors"
                )}
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm uppercase tracking-[0.2em] text-[#00BFFF] font-semibold">
                        Step {stepNumber.toString().padStart(2, "0")}
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 leading-relaxed">{description}</p>
            </motion.div>
        </div>
    )
}
