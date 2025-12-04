"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsOfServiceModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function TermsOfServiceModal({ open, onOpenChange }: TermsOfServiceModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col bg-zinc-950 border-white/10 text-white p-6">
                <DialogHeader className="flex-none">
                    <DialogTitle className="text-2xl font-bold">Terms of Service</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Last updated: November 27, 2025
                    </DialogDescription>
                </DialogHeader>
                <div className="h-[60vh] mt-4">
                    <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 text-sm text-zinc-300 pb-6">
                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">1. Acceptance of Terms</h3>
                                <p>
                                    By accessing and using LocaLLM's GPU rental services and sovereign AI infrastructure ("Service"),
                                    you agree to be bound by these Terms of Service. If you do not agree to these terms,
                                    please do not use our services.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">2. Service Description</h3>
                                <p>
                                    LocaLLM provides high-performance computing resources, specifically GPU clusters (including but not limited to NVIDIA H100/A100 units),
                                    for AI model training, fine-tuning, and inference. We offer both cloud-connected and air-gapped environments
                                    tailored for data sovereignty and privacy.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">3. User Responsibilities</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>You are responsible for maintaining the security of your account credentials.</li>
                                    <li>You agree not to use the Service for any illegal purposes, including but not limited to mining cryptocurrencies without authorization, launching cyberattacks, or processing illegal content.</li>
                                    <li>You are responsible for the data you process and store on our infrastructure. While we provide secure environments, you maintain ownership and liability for your data.</li>
                                </ul>
                            </section>

                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">4. Privacy and Data Sovereignty</h3>
                                <p>
                                    We prioritize your privacy. For air-gapped deployments, LocaLLM guarantees that your data never leaves the physical hardware
                                    assigned to you. We do not access, monitor, or use your data for training our own models.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">5. Payment and Billing</h3>
                                <p>
                                    Services are billed according to the rates displayed at the time of rental.
                                    Hourly rates are calculated based on actual usage. Reserved instances (daily/monthly) are billed upfront.
                                    Refunds are processed on a case-by-case basis for service interruptions caused by hardware failure.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">6. Service Level Agreement (SLA)</h3>
                                <p>
                                    We strive for 99.9% uptime. However, scheduled maintenance and unforeseen hardware failures may occur.
                                    In the event of significant downtime, compensation may be provided in the form of service credits.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">7. Termination</h3>
                                <p>
                                    LocaLLM reserves the right to terminate or suspend access to our Service immediately, without prior notice or liability,
                                    for any reason whatsoever, including without limitation if you breach the Terms.
                                </p>
                            </section>

                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">8. Limitation of Liability</h3>
                                <p>
                                    In no event shall LocaLLM, nor its directors, employees, partners, agents, suppliers, or affiliates,
                                    be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
                                    loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to use the Service.
                                </p>
                            </section>
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}
