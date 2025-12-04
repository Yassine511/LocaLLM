"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, DollarSign, Activity, Lock, Server, Zap } from "lucide-react"

export function ProblemSolution() {
    return (
        <section className="bg-black py-24 text-white" id="features">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">The AI Dilemma</h2>
                    <p className="text-zinc-400">Why enterprises are rethinking cloud AI.</p>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Problem Section */}
                    <div>
                        <h3 className="mb-6 text-xl font-semibold text-zinc-200">The Problem</h3>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-zinc-800">
                                <AccordionTrigger className="text-zinc-200 hover:text-white">
                                    <div className="flex items-center gap-3">
                                        <ShieldAlert className="h-5 w-5 text-red-500" />
                                        Data Exposure Risks
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-400">
                                    Public clouds like OpenAI and Azure often use your data for training unless you opt-out.
                                    Sensitive corporate data leaving your network is a major security vulnerability.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-zinc-800">
                                <AccordionTrigger className="text-zinc-200 hover:text-white">
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="h-5 w-5 text-yellow-500" />
                                        Unpredictable Costs
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-400">
                                    Cloud AI costs can spiral out of control with token-based pricing.
                                    Scaling up usage often means scaling up costs linearly or exponentially.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="border-zinc-800">
                                <AccordionTrigger className="text-zinc-200 hover:text-white">
                                    <div className="flex items-center gap-3">
                                        <Activity className="h-5 w-5 text-orange-500" />
                                        Latency & Performance
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-400">
                                    External API calls introduce network latency, making real-time applications sluggish.
                                    Dependency on external uptime affects your business continuity.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Solution Section */}
                    <div>
                        <h3 className="mb-6 text-xl font-semibold text-zinc-200">The LocaLLM Solution</h3>
                        <Tabs defaultValue="security" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
                                <TabsTrigger value="security">Security</TabsTrigger>
                                <TabsTrigger value="control">Control</TabsTrigger>
                                <TabsTrigger value="speed">Speed</TabsTrigger>
                            </TabsList>
                            <TabsContent value="security">
                                <Card className="border-zinc-800 bg-zinc-900/50">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-white">
                                            <Lock className="h-5 w-5 text-blue-500" />
                                            Zero Data Leakage
                                        </CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            Your data never leaves your network.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-zinc-300">
                                        We install private AI systems directly on your local infrastructure.
                                        End-to-end encryption and strict access controls ensure your IP remains yours.
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="control">
                                <Card className="border-zinc-800 bg-zinc-900/50">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-white">
                                            <Server className="h-5 w-5 text-purple-500" />
                                            Full Sovereignty
                                        </CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            Own your models and infrastructure.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-zinc-300">
                                        Fine-tune open-source models on your specific data.
                                        No vendor lock-in, no surprise policy changes, and predictable hardware costs.
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="speed">
                                <Card className="border-zinc-800 bg-zinc-900/50">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-white">
                                            <Zap className="h-5 w-5 text-yellow-400" />
                                            Ultra-Low Latency
                                        </CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            Lightning fast inference.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-zinc-300">
                                        Run AI at the speed of your local network.
                                        Eliminate internet bottlenecks and ensure real-time responsiveness for critical workflows.
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </section>
    )
}
