"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Sphere() {
    const ref = useRef<THREE.Points>(null!);

    // Create a Fibonacci sphere distribution for a uniform, premium point cloud look
    const points = useMemo(() => {
        const count = 8000; // High density for premium look
        const radius = 2.8;
        const temp = new Float32Array(count * 3);
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y

            const theta = phi * i; // golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            temp[i * 3] = x * radius;
            temp[i * 3 + 1] = y * radius;
            temp[i * 3 + 2] = z * radius;
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        // Slow, smooth rotation
        ref.current.rotation.y += delta * 0.03;
        // Gentle floating movement
        ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    });

    return (
        <group rotation={[0, 0, Math.PI / 8]}>
            <points ref={ref} position={[0, 0, 0]}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={points.length / 3}
                        array={points}
                        itemSize={3}
                        args={[points, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    transparent
                    color="#ffffff"
                    size={0.015} // Smaller, finer dots
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.5}
                />
            </points>
        </group>
    );
}

export function ParticleSphere() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                className="bg-transparent"
            >
                <Sphere />
            </Canvas>
        </div>
    );
}
