"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GPU } from "@/lib/gpu-data";
import { ArrowUpDown, Server, Cpu, HardDrive, Globe, ShieldCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardTableProps {
    data: GPU[];
    onSort: (column: keyof GPU) => void;
    sortColumn: keyof GPU | null;
    sortDirection: "asc" | "desc";
    onRent: (gpu: GPU) => void;
    onRowClick: (gpu: GPU) => void;
}

export function DashboardTable({
    data,
    onSort,
    sortColumn,
    sortDirection,
    onRent,
    onRowClick,
}: DashboardTableProps) {
    return (
        <div className="rounded-md border border-white/10 bg-black overflow-hidden">
            <Table>
                <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="w-[200px] text-white/60 font-medium">
                            <SortButton column="model" label="GPU Model" currentSort={sortColumn} direction={sortDirection} onClick={() => onSort("model")} />
                        </TableHead>
                        <TableHead className="text-white/60 font-medium">
                            <SortButton column="tflops" label="TFLOPS" currentSort={sortColumn} direction={sortDirection} onClick={() => onSort("tflops")} />
                        </TableHead>
                        <TableHead className="text-white/60 font-medium">
                            <SortButton column="vram" label="VRAM" currentSort={sortColumn} direction={sortDirection} onClick={() => onSort("vram")} />
                        </TableHead>
                        <TableHead className="text-white/60 font-medium hidden md:table-cell">CPU</TableHead>
                        <TableHead className="text-white/60 font-medium hidden lg:table-cell">Storage</TableHead>
                        <TableHead className="text-white/60 font-medium hidden md:table-cell">Location</TableHead>
                        <TableHead className="text-white/60 font-medium text-right">
                            <SortButton column="price" label="Price/hr" currentSort={sortColumn} direction={sortDirection} onClick={() => onSort("price")} />
                        </TableHead>
                        <TableHead className="w-[100px] text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((gpu) => (
                        <TableRow
                            key={gpu.id}
                            className="border-white/5 hover:bg-white/5 cursor-pointer transition-colors group"
                            onClick={() => onRowClick(gpu)}
                        >
                            <TableCell className="font-medium text-white">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-2 w-2 rounded-full",
                                        gpu.status === "Verified" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500"
                                    )} />
                                    <span className="group-hover:text-white transition-colors">
                                        {gpu.count}x {gpu.model}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="text-white/70 font-mono">{gpu.tflops.toFixed(1)}</TableCell>
                            <TableCell className="text-white/70 font-mono">{gpu.vram} GB</TableCell>
                            <TableCell className="text-white/50 hidden md:table-cell text-xs">
                                <div className="flex items-center gap-2">
                                    <Cpu className="w-3 h-3" />
                                    {gpu.cpu.split(" ").slice(0, 3).join(" ")}...
                                </div>
                            </TableCell>
                            <TableCell className="text-white/50 hidden lg:table-cell text-xs">
                                <div className="flex items-center gap-2">
                                    <HardDrive className="w-3 h-3" />
                                    {gpu.storage}
                                </div>
                            </TableCell>
                            <TableCell className="text-white/50 hidden md:table-cell text-xs">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-3 h-3" />
                                    {gpu.location.split(" (")[0]}
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-mono text-white font-bold">
                                ${gpu.price.toFixed(3)}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    size="sm"
                                    variant={gpu.status === "Verified" ? "default" : "secondary"}
                                    className={cn(
                                        "h-8 px-4 font-medium transition-all duration-300",
                                        gpu.status === "Verified"
                                            ? "bg-white text-black hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                            : "bg-white/10 text-white/30 hover:bg-white/10 cursor-not-allowed"
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (gpu.status === "Verified") onRent(gpu);
                                    }}
                                    disabled={gpu.status !== "Verified"}
                                >
                                    {gpu.status === "Verified" ? "Rent" : "Occupied"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function SortButton({
    column,
    label,
    currentSort,
    direction,
    onClick,
}: {
    column: keyof GPU;
    label: string;
    currentSort: keyof GPU | null;
    direction: "asc" | "desc";
    onClick: () => void;
}) {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className={cn(
                "h-8 px-2 hover:bg-transparent hover:text-white data-[state=open]:bg-accent",
                currentSort === column ? "text-white" : "text-white/60"
            )}
        >
            {label}
            <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
    );
}
