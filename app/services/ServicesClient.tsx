"use client"

import { motion } from "framer-motion"
import {
    MessageSquareText,
    Cpu,
    Server,
    BrainCircuit,
    Network,
    Wrench,
    ShieldCheck,
    Zap,
    Lock,
    Coins,
    Rocket,
    ArrowRight
} from "lucide-react"
import { ServiceStep } from "@/components/services/ServiceStep"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Our Services - LocaLLM Private AI Solutions",
    description: "End-to-end secure on-premise AI computing services. From GPU installation to custom model fine-tuning.",
}

export default function ServicesPage() {
    const steps = [
        {
            title: "Consultation & Needs Assessment",
            description: "We begin by analyzing your data privacy requirements, regulatory constraints, and specific AI use cases to create a customized implementation plan.",
            icon: MessageSquareText,
        },
        {
            title: "GPU Selection & Procurement",
            description: "Based on your workload, we recommend and source the optimal GPU hardware, whether it's H100s for training or A6000s for inference.",
            icon: Cpu,
        },
        {
            title: "On-Site Installation",
            description: "Our team deploys preconfigured, containerized servers directly on your network, ensuring complete isolation and zero external connectivity.",
            icon: Server,
        },
        {
            title: "Model Fine-Tuning",
            description: "We customize open-source LLMs (Llama 3, Mistral, DeepSeek) with your proprietary data, creating a model that speaks your business language.",
            icon: BrainCircuit,
        },
        {
            title: "Integration & Testing",
            description: "Seamlessly connect your private model to internal documentation and databases via secure APIs, followed by rigorous latency and security testing.",
            icon: Network,
        },
        {
            title: "Maintenance & Support",
            description: "Continuous monitoring, firmware updates, and proactive hardware maintenance ensure your on-premise AI infrastructure runs at peak performance.",
            icon: Wrench,
        },
        {
            title: "Compliance & Auditing",
            description: "We provide detailed logs, encryption protocols, and certification assistance to ensure full compliance with GDPR, HIPAA, and SOC2.",
            icon: ShieldCheck,
        },
        {
            title: "Optimization & Expansion",
            description: "As your needs grow, we fine-tune models for better performance and help expand your AI capabilities to new departments or use cases.",
            icon: Zap,
        },
    ]

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-[#00BFFF]/30">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#4B0082]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00BFFF]/10 rounded-full blur-[120px]" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00BFFF] to-[#4B0082]">
                            End-to-End Private AI Solutions
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-10">
                            From hardware installation to model fine-tuning, we provide a complete on-premise ecosystem for secure, enterprise-grade AI.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/dashboard">
                                <Button size="lg" className="rounded-full bg-[#00BFFF] text-black hover:bg-[#00BFFF]/90 font-bold px-8 h-12">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/demo">
                                <Button size="lg" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 px-8 h-12">
                                    View Demo
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#4B0082] to-[#00BFFF] mx-auto rounded-full" />
                    </motion.div>

                    <div className="space-y-0">
                        {steps.map((step, index) => (
                            <ServiceStep
                                key={index}
                                stepNumber={index + 1}
                                title={step.title}
                                description={step.description}
                                icon={step.icon}
                                isLast={index === steps.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="relative z-10 py-20 px-6 bg-zinc-900/30 border-y border-white/5 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-2xl bg-black/50 border border-white/10 hover:border-[#00BFFF]/50 transition-colors"
                        >
                            <Lock className="w-12 h-12 text-[#00BFFF] mb-6" />
                            <h3 className="text-2xl font-bold mb-3">Total Privacy</h3>
                            <p className="text-zinc-400">Your data never leaves your premises. Zero external API calls, zero data leakage risks.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-2xl bg-black/50 border border-white/10 hover:border-[#00BFFF]/50 transition-colors"
                        >
                            <Coins className="w-12 h-12 text-[#00BFFF] mb-6" />
                            <h3 className="text-2xl font-bold mb-3">Cost Efficiency</h3>
                            <p className="text-zinc-400">Eliminate unpredictable token costs. Own your infrastructure for a fixed, predictable monthly expense.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-2xl bg-black/50 border border-white/10 hover:border-[#00BFFF]/50 transition-colors"
                        >
                            <Rocket className="w-12 h-12 text-[#00BFFF] mb-6" />
                            <h3 className="text-2xl font-bold mb-3">Low Latency</h3>
                            <p className="text-zinc-400">On-premise inference means lightning-fast response times, critical for real-time applications.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-32 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Secure Your AI Future?</h2>
                    <p className="text-xl text-zinc-400 mb-10">
                        Join the leading enterprises switching to LocaLLM for secure, private, and powerful on-premise intelligence.
                    </p>
                    <Link href="/dashboard">
                        <Button className="h-14 px-10 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all">
                            Start Your Transformation <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
