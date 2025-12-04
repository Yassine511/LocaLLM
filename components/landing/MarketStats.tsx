"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const data = [
    { year: "2020", value: 20 },
    { year: "2021", value: 45 },
    { year: "2022", value: 70 },
    { year: "2023", value: 95 },
    { year: "2024", value: 110 },
    { year: "2025", value: 160 },
]

export function MarketStats() {
    return (
        <section className="bg-black py-24 text-white" id="market">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Explosive Market Growth</h2>
                    <p className="text-zinc-400">The demand for secure, local compute is accelerating.</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 items-center">
                    <div className="space-y-6">
                        <Card className="border-zinc-800 bg-zinc-900/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                    Global AI Market
                                </CardTitle>
                                <CardDescription className="text-zinc-400">
                                    Projected growth in Billions USD (2020-2025)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                            <XAxis
                                                dataKey="year"
                                                stroke="#666"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#666"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `$${value}B`}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#fff" }}
                                                itemStyle={{ color: "#fff" }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#fff"
                                                strokeWidth={2}
                                                dot={{ fill: "#fff", strokeWidth: 2, r: 4 }}
                                                activeDot={{ r: 6, fill: "#00BFFF" }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <Card className="border-zinc-800 bg-zinc-900/50">
                            <CardHeader>
                                <CardTitle className="text-4xl font-bold text-white">$330B</CardTitle>
                                <CardDescription className="text-zinc-400">Projected GPU Services by 2035</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-zinc-800 bg-zinc-900/50">
                            <CardHeader>
                                <CardTitle className="text-4xl font-bold text-white">51%</CardTitle>
                                <CardDescription className="text-zinc-400">Hybrid Cloud Adoption</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-zinc-800 bg-zinc-900/50">
                            <CardHeader>
                                <CardTitle className="text-4xl font-bold text-white">19%</CardTitle>
                                <CardDescription className="text-zinc-400">Increase in On-Prem Spending</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-zinc-800 bg-zinc-900/50">
                            <CardHeader>
                                <CardTitle className="text-4xl font-bold text-white">25%</CardTitle>
                                <CardDescription className="text-zinc-400">Annual AI Market Growth</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
