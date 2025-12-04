"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    company: z.string().optional(),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
})

export function ServiceCTA() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // In a real app, this would send data to an API
        console.log(values)
        toast.success("Message sent!", {
            description: "We'll get back to you shortly.",
        })
        form.reset()
    }

    return (
        <section id="contact" className="py-24 bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-black pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Ready to Secure Your AI Future?
                        </h2>
                        <p className="text-zinc-400 text-lg">
                            Get in touch with our experts to discuss your on-premise AI requirements.
                            We'll help you design a solution that fits your specific needs.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span>Free Initial Consultation</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span>Custom Hardware Sizing</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span>POC in 2 Weeks</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} className="bg-black/50 border-white/10 text-white placeholder:text-zinc-600" />
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
                                            <FormLabel className="text-white">Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@company.com" {...field} className="bg-black/50 border-white/10 text-white placeholder:text-zinc-600" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Company (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Acme Inc." {...field} className="bg-black/50 border-white/10 text-white placeholder:text-zinc-600" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Message</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us about your project..."
                                                    className="min-h-[120px] bg-black/50 border-white/10 text-white placeholder:text-zinc-600 resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200">
                                    Send Message
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}
