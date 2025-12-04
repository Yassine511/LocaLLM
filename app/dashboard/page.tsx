import { Navbar } from "@/components/layout/Navbar"
import { GpuMarketplace } from "@/components/dashboard/GpuMarketplace"

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-black selection:bg-white/20">
            <Navbar />
            <div className="pt-20 pb-10">
                <GpuMarketplace />
            </div>
        </main>
    )
}
