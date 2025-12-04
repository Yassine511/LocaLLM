"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ClipboardCheck,
    Cpu,
    Server,
    Code2,
    Network,
    Activity,
    RefreshCw,
    ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
    {
        title: "Initial Consultation",
        description: "We assess your privacy needs, regulatory requirements, and AI use cases to deliver a tailored implementation plan.",
        icon: ClipboardCheck,
        visual: "Assessment Checklist"
    },
    {
        title: "GPU Selection",
        description: "Recommend and procure the optimal GPU infrastructure for your specific workload, leveraging our global partnerships.",
        icon: Cpu,
        visual: "GPU Marketplace"
    },
    {
        title: "On-Site Installation",
        description: "Deploy secure servers or containerized environments directly on your local network. Zero external connectivity required.",
        icon: Server,
        visual: "Server Rack Deployment"
    },
    {
        title: "Model Fine-Tuning",
        description: "Customize open-source LLMs (Llama 3, Mistral, DeepSeek) with your proprietary data in a secure, isolated environment.",
        icon: Code2,
        visual: "Model Training"
    },
    {
        title: "System Integration",
        description: "Seamlessly connect the AI models to your internal documentation and databases via secure APIs.",
        icon: Network,
        visual: "Secure Integration"
    },
    {
        title: "Testing & Pilots",
        description: "Rigorous simulation testing for latency, security, and accuracy before full-scale deployment.",
        icon: Activity,
        visual: "Performance Metrics"
    },
    {
        title: "Ongoing Maintenance",
        description: "Continuous firmware updates, performance monitoring, and scalability management to ensure peak operation.",
        icon: RefreshCw,
        visual: "Support Cycle"
    },
    {
        title: "Compliance & Optimization",
        description: "Regular security audits and performance tuning to maintain compliance with evolving standards.",
        icon: ShieldCheck,
        visual: "Compliance Shield"
    }
]

export function ServiceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section ref={containerRef} className="relative py-24 bg-black overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Implementation Process</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        A systematic approach to deploying your private AI infrastructure.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
                        />
                    </div>

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <TimelineItem key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function TimelineItem({ step, index }: { step: any, index: number }) {
    const isEven = index % 2 === 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "relative flex flex-col md:flex-row gap-8 md:gap-0",
                isEven ? "md:flex-row-reverse" : ""
            )}
        >
            {/* Timeline Node */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-black border-2 border-white/20 rounded-full -translate-x-1/2 mt-6 z-10 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20" />
            </div>

            {/* Content Card */}
            <div className={cn(
                "ml-12 md:ml-0 md:w-1/2",
                isEven ? "md:pl-16" : "md:pr-16"
            )}>
                <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm hover:bg-zinc-900/80 transition-colors duration-300 group">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-white/5 text-white group-hover:text-indigo-400 transition-colors">
                                <step.icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-mono text-zinc-500">Step 0{index + 1}</span>
                        </div>
                        <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-400 leading-relaxed">
                            {step.description}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Visual Placeholder (Optional, can be replaced with actual visual components) */}
            <div className={cn(
                "hidden md:block md:w-1/2",
                isEven ? "md:pr-16 text-right" : "md:pl-16 text-left"
            )}>
                <div className="h-full flex items-center justify-center opacity-20">
                    {/* Abstract visual representation */}
                    <div className="text-sm font-mono text-zinc-600 border border-zinc-800 px-4 py-2 rounded-full">
                        {step.visual}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
