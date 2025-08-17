import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage } from "@react-three/drei";

// Animation component for the chip
function AnimatedIntel4004(props: any) {
  const ref = useRef<any>(null);
  const gltf = useGLTF("/Models/intel4004.glb");

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 3.2;
      ref.current.rotation.y = Math.PI / 5;
    }
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0011;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={ref}
      scale={0.46}
      position={[0, -0.18, 0]}
      {...props}
    />
  );
}

// Make the canvas flexible and responsive
export default function Intel4004Model() {
  if (typeof window === "undefined") return null;

  return (
    <div
      style={{
        width: "100%",               // fill parent
        height: "250px",             // smaller height for a compact card
        maxWidth: "320px",           // allow card to be narrower and more compact
        margin: "0 auto",
        overflow: "visible",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none"
      }}
      className="w-full"
    >
      <Canvas
        camera={{ position: [3.4, 3.2, 4.0], fov: 40 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 3]} intensity={1.2} castShadow />
        <directionalLight position={[-2, 2, -3]} intensity={0.55} />
        <pointLight position={[0, 3, 2]} intensity={0.45} />
        <Stage intensity={0.4} shadows environment="city" adjustCamera={false}>
          <AnimatedIntel4004 />
        </Stage>
      </Canvas>
    </div>
  );
}