"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { GPU, MOCK_GPUS, generateRandomGpus } from "@/lib/gpu-data";
import { DashboardTable } from "./DashboardTable";
import { GPUSpecsDialog } from "./GPUSpecsDialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

export function GpuMarketplace() {
    const [gpus, setGpus] = useState<GPU[]>(MOCK_GPUS);
    const [search, setSearch] = useState("");
    const [locationFilter, setLocationFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [sortColumn, setSortColumn] = useState<keyof GPU | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [selectedGpu, setSelectedGpu] = useState<GPU | null>(null);
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);

    // Hydration fix: Initialize with null/false
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [mounted, setMounted] = useState(false);

    const initialized = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        setMounted(true);
        setLastUpdated(new Date());
        // Add random GPUs only on client side
        setGpus(prev => [...prev, ...generateRandomGpus(MOCK_GPUS)]);
    }, []);

    // Simulate market fluctuations
    useEffect(() => {
        const interval = setInterval(() => {
            setGpus((currentGpus) =>
                currentGpus.map((gpu) => ({
                    ...gpu,
                    price: Number((gpu.price * (0.98 + Math.random() * 0.04)).toFixed(3)), // +/- 2%
                }))
            );
            setLastUpdated(new Date());
        }, 5000); // Update every 5 seconds for visibility

        return () => clearInterval(interval);
    }, []);

    // Filter and Sort
    const filteredAndSortedGpus = useMemo(() => {
        let result = [...gpus];

        // Search
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(
                (gpu) =>
                    gpu.model.toLowerCase().includes(lowerSearch) ||
                    gpu.cpu.toLowerCase().includes(lowerSearch) ||
                    gpu.location.toLowerCase().includes(lowerSearch)
            );
        }

        // Location Filter
        if (locationFilter !== "all") {
            result = result.filter((gpu) => gpu.location.includes(locationFilter));
        }

        // Type Filter (Simple check for now)
        if (typeFilter !== "all") {
            result = result.filter((gpu) => gpu.model.includes(typeFilter));
        }

        // Sort
        if (sortColumn) {
            result.sort((a, b) => {
                const aValue = a[sortColumn!];
                const bValue = b[sortColumn!];

                if (typeof aValue === "string" && typeof bValue === "string") {
                    return sortDirection === "asc"
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                if (typeof aValue === "number" && typeof bValue === "number") {
                    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
                }

                return 0;
            });
        }

        return result;
    }, [gpus, search, locationFilter, typeFilter, sortColumn, sortDirection]);

    const handleSort = (column: keyof GPU) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handleRent = (gpu: GPU) => {
        router.push(`/rent/${gpu.id}`);
    };

    const handleRowClick = (gpu: GPU) => {
        setSelectedGpu(gpu);
        setIsSpecsOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                        GPU Marketplace
                    </h1>
                    <p className="text-white/60">
                        Rent secure, on-premise compute power instantly.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <span className="text-sm font-medium text-white/80">Live Market</span>
                    <span className="text-xs text-white/40 font-mono ml-2 min-w-[60px]">
                        {mounted && lastUpdated ? lastUpdated.toLocaleTimeString() : "--:--:--"}
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                        placeholder="Search GPUs, CPUs, or Locations..."
                        className="pl-10 bg-black border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 h-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="bg-black border-white/10 text-white h-10">
                            <SelectValue placeholder="GPU Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/10 text-white">
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="H100">H100</SelectItem>
                            <SelectItem value="A100">A100</SelectItem>
                            <SelectItem value="RTX 5090">RTX 5090</SelectItem>
                            <SelectItem value="RTX 4090">RTX 4090</SelectItem>
                            <SelectItem value="RTX 3090">RTX 3090</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="md:col-span-2">
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger className="bg-black border-white/10 text-white h-10">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/10 text-white">
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="EU">Europe</SelectItem>
                            <SelectItem value="Asia">Asia Pacific</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="md:col-span-2">
                    <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-10">
                        <Filter className="w-4 h-4 mr-2" />
                        More Filters
                    </Button>
                </div>
            </div>

            {/* Table */}
            <DashboardTable
                data={filteredAndSortedGpus}
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onRent={handleRent}
                onRowClick={handleRowClick}
            />

            {/* Specs Dialog */}
            <GPUSpecsDialog
                gpu={selectedGpu}
                isOpen={isSpecsOpen}
                onClose={() => setIsSpecsOpen(false)}
            />
        </div>
    );
}
