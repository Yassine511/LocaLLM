"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingUp, Zap } from "lucide-react"

export function ServiceBenefits() {
    return (
        <section className="py-24 bg-zinc-950">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose LocaLLM?</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        The advantages of owning your AI infrastructure.
                    </p>
                </div>

                <Tabs defaultValue="privacy" className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3 bg-zinc-900/50 p-1 rounded-full border border-white/10">
                        <TabsTrigger
                            value="privacy"
                            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black transition-all"
                        >
                            Privacy First
                        </TabsTrigger>
                        <TabsTrigger
                            value="cost"
                            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black transition-all"
                        >
                            Cost Efficiency
                        </TabsTrigger>
                        <TabsTrigger
                            value="performance"
                            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black transition-all"
                        >
                            Performance
                        </TabsTrigger>
                    </TabsList>

                    <div className="mt-8">
                        <TabsContent value="privacy">
                            <Card className="bg-zinc-900 border-white/10">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-2xl text-white">Zero Data Leakage</CardTitle>
                                    </div>
                                    <CardDescription>Your data never leaves your premises.</CardDescription>
                                </CardHeader>
                                <CardContent className="text-zinc-400 space-y-4">
                                    <p>
                                        With LocaLLM, your proprietary data remains strictly within your local network.
                                        We deploy air-gapped or locally networked servers that have no external internet connection requirements for operation.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-sm">
                                        <li>Full GDPR and HIPAA compliance capabilities.</li>
                                        <li>Complete control over data retention and deletion.</li>
                                        <li>Immunity to external cloud outages and breaches.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="cost">
                            <Card className="bg-zinc-900 border-white/10">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-2xl text-white">Predictable Pricing</CardTitle>
                                    </div>
                                    <CardDescription>Eliminate token-based billing anxiety.</CardDescription>
                                </CardHeader>
                                <CardContent className="text-zinc-400 space-y-4">
                                    <p>
                                        Cloud AI providers charge per token, making costs unpredictable as you scale.
                                        LocaLLM offers a fixed infrastructure cost, allowing you to run unlimited inferences without increasing your bill.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-sm">
                                        <li>One-time hardware investment or fixed leasing.</li>
                                        <li>No hidden fees for high-volume usage.</li>
                                        <li>Lower total cost of ownership (TCO) over 12+ months.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="performance">
                            <Card className="bg-zinc-900 border-white/10">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-2xl text-white">Low Latency</CardTitle>
                                    </div>
                                    <CardDescription>Lightning-fast inference speeds.</CardDescription>
                                </CardHeader>
                                <CardContent className="text-zinc-400 space-y-4">
                                    <p>
                                        By processing data locally, you eliminate network latency associated with sending requests to remote cloud servers.
                                        Achieve real-time performance for critical applications.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-sm">
                                        <li>Optimized for your specific hardware configuration.</li>
                                        <li>Fine-tuned models for your specific use cases.</li>
                                        <li>Direct integration with local databases for faster RAG.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </section>
    )
}
