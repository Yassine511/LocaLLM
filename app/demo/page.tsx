import { ChatInterface } from "@/components/demo/ChatInterface"
import { Navbar } from "@/components/layout/Navbar"

export default function DemoPage() {
    return (
        <main className="h-screen w-full bg-black pt-24">
            <Navbar />
            <ChatInterface />
        </main>
    )
}
