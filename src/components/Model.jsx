import { Canvas } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const ModelComponent = ({ playAnimation, selectedFace }) => {
  const modelRef = useRef();
  const { scene, animations } = useGLTF("/box13.glb");
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (actions?.ArmatureAction) {
      actions.ArmatureAction.paused = true; // Prevent auto-start
    }
  }, [actions]);

useEffect(() => {
  if (actions?.ArmatureAction && playAnimation !== null && modelRef.current) {
    const action = actions.ArmatureAction;
    action.reset();
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    action.paused = false;

    if (playAnimation) {
      action.setEffectiveTimeScale(1);
      action.play();
      gsap.to(modelRef.current.scale, { x: 2, y: 2, z: 2, duration: 1.5 });
    } else {
      action.time = action.getClip().duration;
      action.setEffectiveTimeScale(-1);
      action.play();
      gsap.to(modelRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 });
    }
  }
}, [playAnimation, actions]);


  useEffect(() => {
    if (modelRef.current && selectedFace !== null) {
      const mesh = modelRef.current.children[0]; // Assuming first child is the mesh
      const geometry = mesh.geometry;
      if (!geometry || !geometry.attributes.position) return;

      const colorArray = new Float32Array(geometry.attributes.position.count * 3).fill(1); // Default white

      const faceMap = {
        front: [8, 9, 10, 11], // Indices of front face triangles
        back: [0, 1, 2, 3],
        top: [4, 5, 6, 7],
        bottom: [12, 13, 14, 15],
        left: [16, 17, 18, 19],
        right: [20, 21, 22, 23],
      };

      const selectedFaceIndices = faceMap[selectedFace];
      if (selectedFaceIndices) {
        const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        selectedFaceIndices.forEach((faceIndex) => {
          const i = faceIndex * 9; // 3 vertices per triangle * 3 RGB values
          colorArray.set([newColor.r, newColor.g, newColor.b], i);
          colorArray.set([newColor.r, newColor.g, newColor.b], i + 3);
          colorArray.set([newColor.r, newColor.g, newColor.b], i + 6);
        });

        geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
        geometry.attributes.color.needsUpdate = true;
      }
    }
  }, [selectedFace]);

  return <primitive ref={modelRef} object={scene} />;
};

const BoxModel = () => {
  const [playAnimation, setPlayAnimation] = useState(true);
  const [selectedFace, setSelectedFace] = useState(null);

  return (
    <div className="w-full h-[90vh] bg-gradient-to-br from-white via-white to-[#87ceeb] flex flex-col items-center">
      <div className="flex-grow w-full">
        <Canvas camera={{ position: [20, 2, 2], fov: 25 }}>
          <ambientLight intensity={3} />
          <directionalLight position={[5, 5, 5]} intensity={4} />
          <directionalLight position={[-5, 5, 5]} intensity={3} />
          <directionalLight position={[5, -5, -5]} intensity={2} />
          <directionalLight position={[-5, -5, 5]} intensity={2} />
          <pointLight position={[0, 5, 0]} intensity={3} />
          <spotLight position={[10, 15, 10]} angle={0.3} intensity={5} castShadow />

          <ModelComponent playAnimation={playAnimation} selectedFace={selectedFace} />
          <OrbitControls />
        </Canvas>
      </div>

      {/* Animation Controls */}
      <div className="flex gap-4 p-4">
        <button
          onClick={() => setPlayAnimation(true)}
          className="px-6 py-2 bg-gradient-to-l from-red-600 to-red-300 text-white rounded-lg transition-all hover:scale-110"
        >
          Open
        </button>
        <button
          onClick={() => setPlayAnimation(false)}
          className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-300 text-white rounded-lg transition-all hover:scale-110"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BoxModel;

