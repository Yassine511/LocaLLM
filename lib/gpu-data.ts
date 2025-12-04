export interface GPU {
    id: string;
    model: string;
    count: number;
    vram: number; // in GB
    tflops: number;
    cpu: string;
    storage: string;
    location: string;
    price: number; // per hour
    reliability: number; // percentage
    maxDuration: string;
    status: "Verified" | "Occupied" | "Unverified";
    specs: GPUSpecs;
}

export interface GPUSpecs {
    architecture: string;
    cudaCores: number;
    tensorCores: number;
    rtCores?: number; // Optional as some older/server cards might not have them in the same way
    baseClock: string;
    boostClock: string;
    memoryType: string;
    memoryBandwidth: string;
    powerConsumption: string; // TDP
    cudaVersion: string;
    fp32Performance: string;
    fp16Performance: string;
}

const LOCATIONS = [
    "US-East (N. Virginia)", "US-West (Oregon)", "US-Central (Iowa)",
    "EU-West (Ireland)", "EU-Central (Frankfurt)", "EU-North (Stockholm)",
    "Asia-Pacific (Tokyo)", "Asia-Pacific (Singapore)", "Asia-Pacific (Sydney)",
    "South America (São Paulo)"
];

const CPUS = [
    "AMD EPYC 9654 96-Core", "AMD EPYC 7763 64-Core", "AMD EPYC 7543 32-Core",
    "Intel Xeon Platinum 8480+", "Intel Xeon Gold 6348", "Intel Xeon w9-3495X",
    "AMD Ryzen Threadripper PRO 5995WX", "AMD Ryzen 9 7950X"
];

// Helper to generate random reliability between 98.0 and 99.9
const getReliability = () => (98 + Math.random() * 1.9).toFixed(1);

// Helper to get random location
const getLocation = () => LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

// Helper to get random CPU
const getCpu = () => CPUS[Math.floor(Math.random() * CPUS.length)];

// Helper to get random status (mostly Verified)
const getStatus = (): "Verified" | "Occupied" => Math.random() > 0.8 ? "Occupied" : "Verified";

export const MOCK_GPUS: GPU[] = [
    // RTX 5090 Instances
    {
        id: "5090-1",
        model: "RTX 5090",
        count: 1,
        vram: 32,
        tflops: 107.6,
        cpu: "AMD EPYC 9654",
        storage: "1TB NVMe Gen5",
        location: "US-East (N. Virginia)",
        price: 0.303,
        reliability: 99.8,
        maxDuration: "5 mon",
        status: "Verified",
        specs: {
            architecture: "Blackwell",
            cudaCores: 21760,
            tensorCores: 672,
            rtCores: 168,
            baseClock: "2.23 GHz",
            boostClock: "2.52 GHz",
            memoryType: "GDDR7",
            memoryBandwidth: "1.8 TB/s",
            powerConsumption: "450W",
            cudaVersion: "12.4",
            fp32Performance: "107.6 TFLOPS",
            fp16Performance: "215.2 TFLOPS"
        }
    },
    {
        id: "5090-2",
        model: "RTX 5090",
        count: 2,
        vram: 64,
        tflops: 215.2,
        cpu: "AMD EPYC 9654",
        storage: "2TB NVMe Gen5",
        location: "EU-West (Ireland)",
        price: 0.780,
        reliability: 99.4,
        maxDuration: "2 mon 2d",
        status: "Verified",
        specs: {
            architecture: "Blackwell",
            cudaCores: 21760,
            tensorCores: 672,
            rtCores: 168,
            baseClock: "2.23 GHz",
            boostClock: "2.52 GHz",
            memoryType: "GDDR7",
            memoryBandwidth: "1.8 TB/s",
            powerConsumption: "450W",
            cudaVersion: "12.4",
            fp32Performance: "107.6 TFLOPS",
            fp16Performance: "215.2 TFLOPS"
        }
    },
    {
        id: "5090-4",
        model: "RTX 5090",
        count: 4,
        vram: 128,
        tflops: 430.4,
        cpu: "AMD Threadripper PRO 7995WX",
        storage: "4TB NVMe Gen5 RAID0",
        location: "US-West (Oregon)",
        price: 1.550,
        reliability: 99.9,
        maxDuration: "1 mon",
        status: "Verified",
        specs: {
            architecture: "Blackwell",
            cudaCores: 21760,
            tensorCores: 672,
            rtCores: 168,
            baseClock: "2.23 GHz",
            boostClock: "2.52 GHz",
            memoryType: "GDDR7",
            memoryBandwidth: "1.8 TB/s",
            powerConsumption: "450W",
            cudaVersion: "12.4",
            fp32Performance: "107.6 TFLOPS",
            fp16Performance: "215.2 TFLOPS"
        }
    },

    // H100 Instances
    {
        id: "h100-1",
        model: "H100 SXM5",
        count: 1,
        vram: 80,
        tflops: 3958, // FP8 Tensor Core
        cpu: "Intel Xeon Max 9480",
        storage: "1TB NVMe",
        location: "EU-Central (Frankfurt)",
        price: 2.874,
        reliability: 99.9,
        maxDuration: "16d",
        status: "Verified",
        specs: {
            architecture: "Hopper",
            cudaCores: 14592,
            tensorCores: 456,
            baseClock: "1.06 GHz",
            boostClock: "1.76 GHz",
            memoryType: "HBM3",
            memoryBandwidth: "3.35 TB/s",
            powerConsumption: "700W",
            cudaVersion: "12.2",
            fp32Performance: "67 TFLOPS",
            fp16Performance: "1979 TFLOPS"
        }
    },
    {
        id: "h100-8",
        model: "H100 SXM5",
        count: 8,
        vram: 640,
        tflops: 31664,
        cpu: "2x AMD EPYC 9654",
        storage: "30TB NVMe Pool",
        location: "US-East (N. Virginia)",
        price: 22.500,
        reliability: 99.99,
        maxDuration: "Unlimited",
        status: "Occupied",
        specs: {
            architecture: "Hopper",
            cudaCores: 14592,
            tensorCores: 456,
            baseClock: "1.06 GHz",
            boostClock: "1.76 GHz",
            memoryType: "HBM3",
            memoryBandwidth: "3.35 TB/s",
            powerConsumption: "700W",
            cudaVersion: "12.2",
            fp32Performance: "67 TFLOPS",
            fp16Performance: "1979 TFLOPS"
        }
    },

    // A100 Instances
    {
        id: "a100-4",
        model: "A100 80GB",
        count: 4,
        vram: 320,
        tflops: 1248, // TF32
        cpu: "AMD EPYC 7763",
        storage: "4TB NVMe",
        location: "US-West (Oregon)",
        price: 4.506,
        reliability: 99.3,
        maxDuration: "1 mon 2d",
        status: "Occupied",
        specs: {
            architecture: "Ampere",
            cudaCores: 6912,
            tensorCores: 432,
            baseClock: "1.06 GHz",
            boostClock: "1.41 GHz",
            memoryType: "HBM2e",
            memoryBandwidth: "2.0 TB/s",
            powerConsumption: "400W",
            cudaVersion: "11.8",
            fp32Performance: "19.5 TFLOPS",
            fp16Performance: "312 TFLOPS"
        }
    },
    {
        id: "a100-8",
        model: "A100 40GB",
        count: 8,
        vram: 320,
        tflops: 2496,
        cpu: "2x Intel Xeon Platinum 8380",
        storage: "16TB NVMe",
        location: "Asia-Pacific (Tokyo)",
        price: 7.200,
        reliability: 99.5,
        maxDuration: "Unlimited",
        status: "Verified",
        specs: {
            architecture: "Ampere",
            cudaCores: 6912,
            tensorCores: 432,
            baseClock: "1.06 GHz",
            boostClock: "1.41 GHz",
            memoryType: "HBM2",
            memoryBandwidth: "1.6 TB/s",
            powerConsumption: "400W",
            cudaVersion: "11.8",
            fp32Performance: "19.5 TFLOPS",
            fp16Performance: "312 TFLOPS"
        }
    },

    // RTX 4090 Instances
    {
        id: "4090-1",
        model: "RTX 4090",
        count: 1,
        vram: 24,
        tflops: 82.6,
        cpu: "Intel Core i9-13900K",
        storage: "2TB NVMe",
        location: "EU-North (Stockholm)",
        price: 0.450,
        reliability: 98.9,
        maxDuration: "3 mon",
        status: "Verified",
        specs: {
            architecture: "Ada Lovelace",
            cudaCores: 16384,
            tensorCores: 512,
            rtCores: 128,
            baseClock: "2.23 GHz",
            boostClock: "2.52 GHz",
            memoryType: "GDDR6X",
            memoryBandwidth: "1.0 TB/s",
            powerConsumption: "450W",
            cudaVersion: "12.0",
            fp32Performance: "82.6 TFLOPS",
            fp16Performance: "82.6 TFLOPS"
        }
    },
    {
        id: "4090-8",
        model: "RTX 4090",
        count: 8,
        vram: 192,
        tflops: 660.8,
        cpu: "AMD Threadripper PRO 5995WX",
        storage: "8TB NVMe",
        location: "US-East (N. Virginia)",
        price: 3.202,
        reliability: 99.3,
        maxDuration: "2 mon",
        status: "Verified",
        specs: {
            architecture: "Ada Lovelace",
            cudaCores: 16384,
            tensorCores: 512,
            rtCores: 128,
            baseClock: "2.23 GHz",
            boostClock: "2.52 GHz",
            memoryType: "GDDR6X",
            memoryBandwidth: "1.0 TB/s",
            powerConsumption: "450W",
            cudaVersion: "12.0",
            fp32Performance: "82.6 TFLOPS",
            fp16Performance: "82.6 TFLOPS"
        }
    },

    // RTX 3090 Instances
    {
        id: "3090-1",
        model: "RTX 3090",
        count: 1,
        vram: 24,
        tflops: 35.6,
        cpu: "AMD Ryzen 9 5950X",
        storage: "1TB SSD",
        location: "South America (São Paulo)",
        price: 0.220,
        reliability: 97.5,
        maxDuration: "1 mon",
        status: "Verified",
        specs: {
            architecture: "Ampere",
            cudaCores: 10496,
            tensorCores: 328,
            rtCores: 82,
            baseClock: "1.40 GHz",
            boostClock: "1.70 GHz",
            memoryType: "GDDR6X",
            memoryBandwidth: "936 GB/s",
            powerConsumption: "350W",
            cudaVersion: "11.6",
            fp32Performance: "35.6 TFLOPS",
            fp16Performance: "35.6 TFLOPS"
        }
    },
    {
        id: "3090-4",
        model: "RTX 3090",
        count: 4,
        vram: 96,
        tflops: 142.4,
        cpu: "AMD Threadripper 3970X",
        storage: "4TB NVMe",
        location: "Asia-Pacific (Singapore)",
        price: 0.850,
        reliability: 98.2,
        maxDuration: "6 mon",
        status: "Verified",
        specs: {
            architecture: "Ampere",
            cudaCores: 10496,
            tensorCores: 328,
            rtCores: 82,
            baseClock: "1.40 GHz",
            boostClock: "1.70 GHz",
            memoryType: "GDDR6X",
            memoryBandwidth: "936 GB/s",
            powerConsumption: "350W",
            cudaVersion: "11.6",
            fp32Performance: "35.6 TFLOPS",
            fp16Performance: "35.6 TFLOPS"
        }
    },

    // L40S Instances
    {
        id: "l40s-1",
        model: "L40S",
        count: 1,
        vram: 48,
        tflops: 91.6,
        cpu: "Intel Xeon Gold 6430",
        storage: "2TB NVMe",
        location: "US-Central (Iowa)",
        price: 1.100,
        reliability: 99.8,
        maxDuration: "1 yr",
        status: "Verified",
        specs: {
            architecture: "Ada Lovelace",
            cudaCores: 18176,
            tensorCores: 568,
            rtCores: 142,
            baseClock: "1.11 GHz",
            boostClock: "2.52 GHz",
            memoryType: "GDDR6",
            memoryBandwidth: "864 GB/s",
            powerConsumption: "350W",
            cudaVersion: "12.2",
            fp32Performance: "91.6 TFLOPS",
            fp16Performance: "183 TFLOPS"
        }
    },

    // MI300X Instances
    {
        id: "mi300x-1",
        model: "MI300X",
        count: 1,
        vram: 192,
        tflops: 1300, // Peak FP16
        cpu: "AMD EPYC 9654",
        storage: "4TB NVMe",
        location: "US-East (N. Virginia)",
        price: 3.500,
        reliability: 99.1,
        maxDuration: "3 mon",
        status: "Verified",
        specs: {
            architecture: "CDNA 3",
            cudaCores: 0, // AMD
            tensorCores: 304, // Compute Units
            baseClock: "1.1 GHz",
            boostClock: "2.1 GHz",
            memoryType: "HBM3",
            memoryBandwidth: "5.3 TB/s",
            powerConsumption: "750W",
            cudaVersion: "ROCm 6.0",
            fp32Performance: "163 TFLOPS",
            fp16Performance: "1300 TFLOPS"
        }
    },

    // RTX 5070 Ti Instances
    {
        id: "5070ti-1",
        model: "RTX 5070 Ti",
        count: 1,
        vram: 16,
        tflops: 45.8,
        cpu: "Intel Core i7-14700K",
        storage: "512GB NVMe",
        location: "Asia-Pacific (Sydney)",
        price: 0.117,
        reliability: 97.9,
        maxDuration: "62 mon", // As per prompt example
        status: "Verified",
        specs: {
            architecture: "Blackwell",
            cudaCores: 7680, // Estimated
            tensorCores: 240,
            rtCores: 60,
            baseClock: "2.1 GHz",
            boostClock: "2.6 GHz",
            memoryType: "GDDR7",
            memoryBandwidth: "800 GB/s",
            powerConsumption: "250W",
            cudaVersion: "12.4",
            fp32Performance: "45.8 TFLOPS",
            fp16Performance: "91.6 TFLOPS"
        }
    },

    // A6000 Instances
    {
        id: "a6000-2",
        model: "RTX A6000",
        count: 2,
        vram: 96,
        tflops: 77.4,
        cpu: "AMD EPYC 7543",
        storage: "2TB NVMe",
        location: "EU-West (Ireland)",
        price: 0.800,
        reliability: 99.6,
        maxDuration: "Unlimited",
        status: "Verified",
        specs: {
            architecture: "Ampere",
            cudaCores: 10752,
            tensorCores: 336,
            rtCores: 84,
            baseClock: "1.41 GHz",
            boostClock: "1.80 GHz",
            memoryType: "GDDR6",
            memoryBandwidth: "768 GB/s",
            powerConsumption: "300W",
            cudaVersion: "11.6",
            fp32Performance: "38.7 TFLOPS",
            fp16Performance: "38.7 TFLOPS"
        }
    },

    // V100 Instances
    {
        id: "v100-4",
        model: "Tesla V100",
        count: 4,
        vram: 128, // 32GB x 4
        tflops: 56, // FP32
        cpu: "Intel Xeon Gold 6148",
        storage: "1TB SSD",
        location: "US-East (N. Virginia)",
        price: 1.200,
        reliability: 98.5,
        maxDuration: "1 yr",
        status: "Verified",
        specs: {
            architecture: "Volta",
            cudaCores: 5120,
            tensorCores: 640,
            baseClock: "1.23 GHz",
            boostClock: "1.38 GHz",
            memoryType: "HBM2",
            memoryBandwidth: "900 GB/s",
            powerConsumption: "250W",
            cudaVersion: "11.0",
            fp32Performance: "14 TFLOPS",
            fp16Performance: "28 TFLOPS"
        }
    }
];

// Helper to generate more random instances
export const generateRandomGpus = (baseGpus: GPU[], count: number = 15): GPU[] => {
    const newGpus: GPU[] = [];
    for (let i = 0; i < count; i++) {
        const base = baseGpus[Math.floor(Math.random() * Math.min(baseGpus.length, 10))]; // Pick from first 10 templates
        if (!base) continue;

        newGpus.push({
            ...base,
            id: `gen-${i}-${Math.random().toString(36).substr(2, 9)}-${base.model.replace(/\s/g, '')}`,
            location: getLocation(),
            cpu: getCpu(),
            price: Number((base.price * (0.9 + Math.random() * 0.2)).toFixed(3)), // +/- 10% price
            reliability: Number(getReliability()),
            status: getStatus(),
        });
    }
    return newGpus;
};
