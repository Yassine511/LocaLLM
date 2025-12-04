import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/landing/Hero"
import { ProblemSolution } from "@/components/landing/ProblemSolution"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { TeamSection } from "@/components/landing/TeamSection"
import { ContactSection } from "@/components/landing/ContactSection"
import { MarketStats } from "@/components/landing/MarketStats"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <MarketStats />
      <HowItWorks />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
