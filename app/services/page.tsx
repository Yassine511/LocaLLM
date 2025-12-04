import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ServiceIntro } from "@/components/services/ServiceIntro"
import { ServiceQuotes } from "@/components/services/ServiceQuotes"
import { ServiceTimeline } from "@/components/services/ServiceTimeline"
import { ServiceBenefits } from "@/components/services/ServiceBenefits"
import { ServiceCTA } from "@/components/services/ServiceCTA"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Our Services - Secure On-Prem AI | LocaLLM",
    description: "Comprehensive private AI solutions: from GPU procurement to model fine-tuning and secure integration.",
}

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/20">
            <Navbar />
            <ServiceIntro />
            <ServiceQuotes />
            <ServiceTimeline />
            <ServiceBenefits />
            <ServiceCTA />
            <Footer />
        </main>
    )
}
