"use client"

import ReactFlow, {
    Background,
    MarkerType,
    Panel,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Maximize2, Minus, Plus } from "lucide-react";

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 100 },
        data: { label: 'Client Devices' },
        style: { background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '8px', width: 150 }
    },
    {
        id: '2',
        position: { x: 250, y: 100 },
        data: { label: 'Local Network' },
        style: { background: '#18181b', color: '#fff', border: '1px solid #333', borderRadius: '8px', width: 150 }
    },
    {
        id: '3',
        position: { x: 500, y: 100 },
        data: { label: 'AI Server (On-Prem)' },
        style: { background: '#000', color: '#fff', border: '1px solid #fff', borderRadius: '8px', width: 150, boxShadow: '0 0 20px rgba(255,255,255,0.2)' }
    },
    {
        id: '4',
        position: { x: 500, y: 250 },
        data: { label: 'Internal Docs/DB' },
        style: { background: '#18181b', color: '#fff', border: '1px solid #333', borderRadius: '8px', width: 150 }
    },
    {
        id: '5',
        position: { x: 750, y: 100 },
        data: { label: 'Private local Model' },
        style: { background: '#fff', color: '#000', border: '1px solid #fff', borderRadius: '8px', width: 150, fontWeight: 'bold' }
    },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#fff' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#fff' } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#666' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#666' } },
    { id: 'e4-3', source: '4', target: '3', animated: true, style: { stroke: '#666' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#666' } },
    { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#fff' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fff' } },
];

export function HowItWorks() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <section className="bg-black py-24 border-t border-white/10" id="how-it-works">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">How It Works</h2>
                    <p className="text-zinc-400">Zero external transmission. Your data stays with you.</p>
                </div>

                <div className="relative h-[520px] w-full max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black to-black/80 shadow-[0_0_60px_rgba(0,0,0,0.35)]">

                    <ReactFlow
                        className="!bg-transparent"
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        fitViewOptions={{ padding: 0.4 }}
                        fitView
                        minZoom={0.5}
                        maxZoom={1.8}
                        panOnScroll
                        zoomOnScroll
                        zoomOnPinch
                        attributionPosition="bottom-right"
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background color="rgba(255, 255, 255, 0.2)" gap={32} size={1.5} />
                        <CustomFlowControls />
                    </ReactFlow>
                </div>
            </div>
        </section>
    );
}

function CustomFlowControls() {
    const instance = useReactFlow();

    return (
        <Panel position="top-right" className="flow-controls" data-testid="flow-controls">
            <button aria-label="Zoom out" onClick={() => instance.zoomOut({ duration: 200 })}>
                <Minus className="h-4 w-4" />
            </button>
            <button aria-label="Zoom in" onClick={() => instance.zoomIn({ duration: 200 })}>
                <Plus className="h-4 w-4" />
            </button>
            <button aria-label="Fit to screen" onClick={() => instance.fitView({ duration: 300, padding: 0.4 })}>
                <Maximize2 className="h-4 w-4" />
            </button>
        </Panel>
    );
}
