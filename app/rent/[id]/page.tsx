"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GPU, MOCK_GPUS, generateRandomGpus } from "@/lib/gpu-data";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, CreditCard, ShieldCheck, ArrowLeft, Cpu, HardDrive, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { TermsOfServiceModal } from "@/components/modals/TermsOfServiceModal";

const rentSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    duration: z.string(),
    quantity: z.coerce.number().min(1, "At least 1 GPU required"),
    bidPrice: z.coerce.number().optional(),
    cardNumber: z.string().min(16, "Invalid card number").max(19),
    expiry: z.string().min(5, "Invalid expiry (MM/YY)"),
    cvv: z.string().min(3, "Invalid CVV"),
    terms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

export default function RentPage() {
    const params = useParams();
    const router = useRouter();
    const [gpu, setGpu] = useState<GPU | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [showTerms, setShowTerms] = useState(false);

    const form = useForm<z.infer<typeof rentSchema>>({
        resolver: zodResolver(rentSchema),
        defaultValues: {
            name: "",
            email: "",
            duration: "hourly",
            quantity: 1,
            cardNumber: "",
            expiry: "",
            cvv: "",
            terms: false,
        },
    });

    // Watch values to calculate cost
    const duration = form.watch("duration");
    const quantity = form.watch("quantity");
    const bidPrice = form.watch("bidPrice");

    useEffect(() => {
        if (params.id) {
            const id = params.id as string;
            const foundGpu = MOCK_GPUS.find((g) => g.id === id);

            if (foundGpu) {
                setGpu(foundGpu);
            } else if (id.startsWith("gen-")) {
                // Try to reconstruct a generated GPU or find a template
                // Format: gen-{index}-{random}-{model}
                // We'll just find a matching model template for simplicity
                const modelPart = id.split("-").pop(); // e.g., RTX5090
                const template = MOCK_GPUS.find(g => g.model.replace(/\s/g, '') === modelPart);
                if (template) {
                    setGpu({
                        ...template,
                        id: id,
                        // Randomize slightly to match the "generated" feel
                        price: Number((template.price * (0.9 + Math.random() * 0.2)).toFixed(3)),
                    });
                }
            }
        }
    }, [params.id]);

    useEffect(() => {
        if (!gpu) return;

        let multiplier = 1;
        if (duration === "daily") multiplier = 24;
        if (duration === "monthly") multiplier = 730;

        const price = bidPrice || gpu.price;
        const cost = price * multiplier * (quantity || 1);
        setTotalCost(Number(cost.toFixed(2)));
    }, [gpu, duration, quantity, bidPrice]);

    const onSubmit = async (values: z.infer<typeof rentSchema>) => {
        if (!gpu) return;

        setIsLoading(true);
        try {
            const response = await fetch("/api/rent-gpu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gpuId: gpu.id,
                    gpuModel: gpu.model,
                    userDetails: {
                        name: values.name,
                        email: values.email,
                    },
                    rentalOptions: {
                        duration: values.duration,
                        quantity: values.quantity,
                        bidPrice: values.bidPrice,
                    },
                    totalCost: totalCost,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Rental Request Submitted", {
                    description: "Check your email for confirmation details.",
                });
                router.push("/dashboard");
            } else {
                toast.error("Submission Failed", {
                    description: "Please try again later.",
                });
            }
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!gpu && !params.id) return null;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <Button
                    variant="ghost"
                    className="mb-8 text-zinc-400 hover:text-white pl-0 gap-2"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Marketplace
                </Button>

                {!gpu ? (
                    <div className="flex items-center justify-center h-[400px]">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: GPU Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1 space-y-6"
                        >
                            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-6 overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <h1 className="text-3xl font-bold mb-2">{gpu.model}</h1>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-sm font-medium">
                                            {gpu.status}
                                        </span>
                                        <span className="text-zinc-400 text-sm">{gpu.location}</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Cpu className="h-5 w-5 text-purple-400" />
                                                <span className="text-zinc-300">VRAM</span>
                                            </div>
                                            <span className="font-mono font-bold">{gpu.vram} GB</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Activity className="h-5 w-5 text-blue-400" />
                                                <span className="text-zinc-300">TFLOPS</span>
                                            </div>
                                            <span className="font-mono font-bold">{gpu.tflops}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <Zap className="h-5 w-5 text-yellow-400" />
                                                <span className="text-zinc-300">Price</span>
                                            </div>
                                            <span className="font-mono font-bold text-emerald-400">${gpu.price}/hr</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <h3 className="text-sm font-medium text-zinc-400 mb-4">Technical Specifications</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="block text-zinc-500">Architecture</span>
                                                <span className="text-zinc-300">{gpu.specs.architecture}</span>
                                            </div>
                                            <div>
                                                <span className="block text-zinc-500">CUDA Cores</span>
                                                <span className="text-zinc-300">{gpu.specs.cudaCores.toLocaleString()}</span>
                                            </div>
                                            <div>
                                                <span className="block text-zinc-500">Memory Type</span>
                                                <span className="text-zinc-300">{gpu.specs.memoryType}</span>
                                            </div>
                                            <div>
                                                <span className="block text-zinc-500">Bandwidth</span>
                                                <span className="text-zinc-300">{gpu.specs.memoryBandwidth}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Rental Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2"
                        >
                            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8">
                                <h2 className="text-2xl font-bold mb-6">Configure Rental</h2>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        {/* User Details Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium text-zinc-300 border-b border-white/5 pb-2">User Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Full Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="John Doe" {...field} className="bg-black/50 border-white/10 focus:border-emerald-500/50 transition-colors h-11" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email Address</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="john@example.com" {...field} className="bg-black/50 border-white/10 focus:border-emerald-500/50 transition-colors h-11" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Rental Options Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium text-zinc-300 border-b border-white/5 pb-2">Rental Configuration</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="duration"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Duration</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="bg-black/50 border-white/10 h-11">
                                                                        <SelectValue placeholder="Select duration" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                                                    <SelectItem value="hourly">Hourly</SelectItem>
                                                                    <SelectItem value="daily">Daily</SelectItem>
                                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="quantity"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Quantity</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" min={1} max={gpu.count} {...field} className="bg-black/50 border-white/10 h-11" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="bidPrice"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Bid Price ($/hr)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    placeholder={gpu.price.toString()}
                                                                    {...field}
                                                                    value={field.value ?? ""}
                                                                    className="bg-black/50 border-white/10 h-11"
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-xs text-zinc-500">Optional - Default: ${gpu.price}</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Payment Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium text-zinc-300 border-b border-white/5 pb-2 flex items-center gap-2">
                                                <CreditCard className="h-5 w-5" />
                                                Payment Method (Simulated)
                                            </h3>
                                            <div className="p-6 rounded-xl border border-white/10 bg-white/5 space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="cardNumber"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Card Number</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="0000 0000 0000 0000" {...field} className="bg-black border-white/10 font-mono h-11" maxLength={19} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="grid grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="expiry"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Expiry</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="MM/YY" {...field} className="bg-black border-white/10 font-mono h-11" maxLength={5} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="cvv"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>CVV</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="123" {...field} className="bg-black border-white/10 font-mono h-11" maxLength={3} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer / Submit */}
                                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                            <div className="space-y-1">
                                                <p className="text-sm text-zinc-400">Total Estimated Cost</p>
                                                <p className="text-4xl font-bold text-white tracking-tight">${totalCost.toFixed(2)}</p>
                                            </div>

                                            <div className="flex flex-col items-end gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="terms"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    className="border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-black"
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal text-zinc-400 cursor-pointer">
                                                                I agree to the <button type="button" onClick={() => setShowTerms(true)} className="text-white hover:underline hover:text-emerald-400 transition-colors">Terms of Service</button>
                                                            </FormLabel>
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button
                                                    type="submit"
                                                    disabled={isLoading || !form.formState.isValid}
                                                    className="bg-white text-black hover:bg-zinc-200 h-12 px-8 text-lg font-medium min-w-[200px]"
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Confirm Rental
                                                            <ShieldCheck className="ml-2 h-5 w-5" />
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>
            <TermsOfServiceModal open={showTerms} onOpenChange={setShowTerms} />
        </div>
    );
}
