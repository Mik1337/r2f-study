"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { DirectionalLightHelper, SpotLightHelper } from "three";
import { useControls } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const objs = [
  { name: "Space Man", url: "/Astronaut.glb" },
  { name: "A Box", url: "/box.glb" },
  { name: "A Small Shirt", url: "/sample.glb" },
  { name: "A Shirt", url: "/untitled.glb" },
  { name: "Akiraaa", url: "/kaneadas-bike.glb" },
  { name: "Another Shirt", url: "/wshirt.glb" },
];

export default function Home() {
  const [fileUrl, setFileUrl] = useState(objs[0]);
  const controlsRef = useRef();

  function selectFile(index) {
    setFileUrl(objs[index]);
  }

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      console.log("Orbit position:", controls.target);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-10  w-full last:flex flex-col justify-center items-center h-screen">
        <h1 className="text-7xl">{fileUrl.name}</h1>
        <Canvas>
          <CameraController />
          {/* Gizmo Wrapper */}
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport />
            <GizmoViewcube />
          </GizmoHelper>
          <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
          {/* <AnimatedBox /> */}
          <ObjectView fileUrl={fileUrl.url} scale={10} position={[0, 0, 0]} />
          {/* <SpotLightWithHelper
          intensity={200}
          position={[1, 5, 0]}
          angle={Math.PI / 8}
        /> */}
          {/* <ambientLight color={0xfcfcfc} /> */}
          {/* front */}
          <DirectionalLightWithHelper
            id="Front"
            color="0x000"
            intensity={200}
            position={[0, 0, 10]}
          />
          {/* back */}
          <DirectionalLightWithHelper
            id="Back"
            color="0x000"
            intensity={200}
            position={[0, 0, -10]}
          />
          {/* right */}
          <DirectionalLightWithHelper
            id="Right"
            color="red"
            intensity={200}
            position={[-10, 0, 0]}
          />
          {/* left */}
          <DirectionalLightWithHelper
            id="Left"
            color="yellow"
            intensity={200}
            position={[10, 0, 0]}
          />

          <OrbitControls
            minDistance={5}
            maxDistance={20}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>

        <div className="flex overflow-xscroll h-8 w-full">
          {objs.map((obj, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-800"
              onClick={() => selectFile(index)}
            >
              {obj.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DirectionalLightWithHelper({
  id,
  intensity,
  position,
  angle = 0,
  color = "0xff22aa",
}) {
  const light = useRef();

  let { vIntensity, vAngle, vColor, vPosX, vPosY, vPosZ } = useControls(
    `${id} Directional Light Helpers`,
    {
      vIntensity: {
        value: intensity,
        min: 0,
        max: 500,
        step: 1,
      },
      vAngle: {
        value: angle,
        min: -500,
        max: Math.PI * 2,
        step: 0.01,
      },
      vPosX: {
        value: position[0],
        min: -10,
        max: 10,
        step: 1,
      },
      vPosY: {
        value: position[1],
        min: -10,
        max: 10,
        step: 1,
      },
      vPosZ: {
        value: position[2],
        min: -10,
        max: 10,
        step: 1,
      },
      vColor: {
        value: color,
      },
    }
  );
  const [pos, setPos] = useState(position);
  const [int, setInte] = useState(intensity);
  const [ang, setAngle] = useState(angle);
  const [col, setColor] = useState(color);

  useHelper(light, DirectionalLightHelper, 2, col);

  useEffect(() => {
    setPos([vPosX, vPosY, vPosZ]);
  }, [vPosX, vPosY, vPosZ]);

  useEffect(() => {
    setAngle(vAngle);
  }, [vAngle]);

  useEffect(() => {
    setColor(vColor);
  }, [vColor]);

  useEffect(() => {
    setInte(vIntensity);
  }, [vIntensity]);

  return (
    <directionalLight
      ref={light}
      intensity={int}
      position={pos}
      angle={ang}
      color={col}
      castShadow
    />
  );
}

function SpotLightWithHelper() {
  const light = useRef();

  let { color, intensity, angle, positionX, positionY, positionZ } =
    useControls("Spotlight Contorls", {
      color: { value: "white" },
      intensity: {
        value: 100,
        min: 0,
        max: 100,
        step: 1,
      },
      angle: {
        value: 0,
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      positionX: {
        value: 0,
        min: 0,
        max: 50,
        step: 1,
      },
      positionY: {
        value: 0,
        min: 0,
        max: 50,
        step: 1,
      },
      positionZ: {
        value: 0,
        min: 0,
        max: 50,
        step: 1,
      },
    });

  useHelper(light, SpotLightHelper, "orange");

  return (
    <spotLight
      ref={light}
      intensity={intensity}
      position={[positionX, positionY, positionZ]}
      angle={angle}
      color={color}
    />
  );
}

function ObjectView({ fileUrl = "untitled.glb", position = [0, 0, 0] }) {
  const mesh = useRef(null);

  let { speed, scale, positionX, positionY, positionZ, fileURL } = useControls(
    "Object Helpers",
    {
      speed: {
        value: 0.005,
        min: 0.0,
        max: 0.03,
        step: 0.001,
      },
      scale: {
        value: 1,
        min: -10,
        max: 10,
        step: 0.5,
      },
      positionX: {
        value: position[0],
        min: -10,
        max: 10,
        step: 1,
      },
      positionY: {
        value: position[1],
        min: -10,
        max: 10,
        step: 1,
      },
      positionZ: {
        value: position[2],
        min: -10,
        max: 10,
        step: 1,
      },
      fileURL: {
        value: fileUrl,
      },
    }
  );

  const [pos, setPos] = useState(position);
  const [vFileUrl, setFileUrl] = useState(fileUrl);

  // Re-add the useFrame hook to rotate the object
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += speed;
    }
  });

  useEffect(() => {
    setPos([positionX, positionY, positionZ]);
  }, [positionX, positionY, positionZ]);

  useEffect(() => {
    setFileUrl(fileURL);
  }, [fileURL]);

  const gltf = useLoader(GLTFLoader, vFileUrl);

  return (
    <mesh ref={mesh} scale={scale}>
      <primitive object={gltf.scene} position={pos} />
    </mesh>
  );
}

function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    // Set the camera position
    camera.position.set(10, 2, 5);

    // Set the camera rotation
    camera.rotation.set(0, Math.PI / 4, 0);

    // Update the camera
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}
