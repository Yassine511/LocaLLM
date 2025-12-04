import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-bold">
                                L
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">LocaLLM</span>
                        </div>
                        <p className="text-sm text-zinc-400">
                            AI Without Compromise: Secure. Local. Yours.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/#market" className="hover:text-white transition-colors">Market</Link></li>
                            <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/#team" className="hover:text-white transition-colors">Team</Link></li>
                            <li><Link href="/#vision" className="hover:text-white transition-colors">Vision</Link></li>
                            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">Connect</h3>
                        <div className="flex gap-4">
                            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-zinc-500">
                    © {new Date().getFullYear()} LocaLLM. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
