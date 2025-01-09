import React, { Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

export const ModelViewer = ({
  modelPath = localModel,
  scale = 40,
  position = [0, 0, 0],
}) => {
  const gltfRef = React.useRef();

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <GltfModel
          modelPath={modelPath}
          scale={scale}
          position={position}
          ref={gltfRef}
        />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export const GltfModel = ({
  modelPath,
  scale = 40,
  position = [-40, 0, 0],
}) => {
  const ref = React.useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, hover] = React.useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.003));
  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={(event) => {
          hover(true);
        }}
        onPointerOut={(event) => hover(false)}
      />
    </>
  );
};
