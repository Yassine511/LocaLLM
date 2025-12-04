"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GPU } from "@/lib/gpu-data";
import { motion } from "framer-motion";
import { Check, Cpu, Zap, Activity, HardDrive, Server } from "lucide-react";

interface GPUSpecsDialogProps {
    gpu: GPU | null;
    isOpen: boolean;
    onClose: () => void;
}

export function GPUSpecsDialog({ gpu, isOpen, onClose }: GPUSpecsDialogProps) {
    if (!gpu) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-black border border-white/10 text-white p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
                            System Specifications
                        </span>
                    </div>
                    <DialogTitle className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        {gpu.count}x {gpu.model}
                        {gpu.status === "Verified" && (
                            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-normal text-white/80 tracking-wide">
                                VERIFIED
                            </span>
                        )}
                    </DialogTitle>
                    <DialogDescription className="text-white/60 text-base">
                        {gpu.location} • {gpu.reliability}% Reliability
                    </DialogDescription>
                </DialogHeader>

                <div className="p-6 pt-2 space-y-6">
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricCard
                            label="VRAM"
                            value={`${gpu.vram} GB`}
                            sub="Total Memory"
                        />
                        <MetricCard
                            label="Compute"
                            value={gpu.tflops.toFixed(1)}
                            sub="TFLOPS (FP32)"
                        />
                        <MetricCard
                            label="Price"
                            value={`$${gpu.price.toFixed(3)}`}
                            sub="Per Hour"
                        />
                        <MetricCard
                            label="Max Duration"
                            value={gpu.maxDuration}
                            sub="Lease Time"
                        />
                    </div>

                    {/* Detailed Specs */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">
                            Hardware Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <SpecRow label="Architecture" value={gpu.specs.architecture} />
                            <SpecRow label="CUDA Cores" value={gpu.specs.cudaCores.toLocaleString()} />
                            <SpecRow label="Tensor Cores" value={gpu.specs.tensorCores.toLocaleString()} />
                            <SpecRow label="Memory Type" value={gpu.specs.memoryType} />
                            <SpecRow label="Bandwidth" value={gpu.specs.memoryBandwidth} />
                            <SpecRow label="Power (TDP)" value={gpu.specs.powerConsumption} />
                            <SpecRow label="CPU" value={gpu.cpu} icon={<Cpu className="w-3 h-3" />} isVertical />
                            <SpecRow label="Storage" value={gpu.storage} icon={<HardDrive className="w-3 h-3" />} />
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 pt-2 flex items-center justify-between border-t border-white/10 bg-white/5">
                    <div className="text-xs text-white/40 font-mono">
                        ID: {gpu.id}
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onClose} className="border-white/20 hover:bg-white/10 hover:text-white text-white/70">
                            Close
                        </Button>
                        <Button className="bg-white text-black hover:bg-white/90 font-medium px-8">
                            Rent Instance
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex flex-col">
            <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{label}</span>
            <span className="text-xl font-bold text-white">{value}</span>
            <span className="text-[10px] text-white/30">{sub}</span>
        </div>
    );
}

function SpecRow({ label, value, icon, isVertical }: { label: string; value: string; icon?: React.ReactNode; isVertical?: boolean }) {
    return (
        <div className={`flex ${isVertical ? 'flex-col items-start gap-1' : 'justify-between items-center'} py-1 border-b border-white/5 last:border-0`}>
            <span className="text-white/50 flex items-center gap-2">
                {icon}
                {label}
            </span>
            <span className="text-white font-mono">{value}</span>
        </div>
    );
}
