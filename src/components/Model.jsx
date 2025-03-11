import { Canvas } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const ModelComponent = ({ playAnimation, selectedFace }) => {
  const modelRef = useRef();
  const { scene, animations } = useGLTF("CoffeeCup1.gltf");
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (actions?.ArmatureAction) {
      actions.ArmatureAction.paused = true;
    }
  }, [actions]);

  useEffect(() => {
    if (!actions || !modelRef.current || playAnimation === null) return;

    Object.keys(actions).forEach((animationName) => {
      const action = actions[animationName];
      if (!action) return;

      action.reset();
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.paused = false;

      if (playAnimation) {
        action.setEffectiveTimeScale(1);
        action.play();
      } else {
        action.time = action.getClip().duration;
        action.setEffectiveTimeScale(-1);
        action.play();
      }
    });

  }, [playAnimation, actions]);

  // ✅ Change Color of Selected Face
  useEffect(() => {
    if (!modelRef.current || !selectedFace) return;
  
    if (selectedFace === "FullBody") {
      const uniformColor = new THREE.Color(Math.random(), Math.random(), Math.random());
  
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(uniformColor); // Apply the same color to all parts
          child.material.map = null; // Remove textures
          child.material.needsUpdate = true;
        }
      });
    } else {
      modelRef.current.traverse((child) => {
        if (child.isMesh && child.material.name === selectedFace) {
          child.material.map = null; 
          child.material.color.set(new THREE.Color(Math.random(), Math.random(), Math.random()));
          child.material.needsUpdate = true;
        }
      });
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
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, 5, 5]} intensity={0.4} />
          <directionalLight position={[5, -5, -5]} intensity={0.4} />
          <directionalLight position={[-5, -5, 5]} intensity={0.4} />
          <pointLight position={[0, 5, 0]} intensity={0.4} />
          <spotLight position={[10, 15, 10]} angle={0.3} intensity={0.4} castShadow />

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
          Close
        </button>
        <button
          onClick={() => setPlayAnimation(false)}
          className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-300 text-white rounded-lg transition-all hover:scale-110"
        >
          Open
        </button>
      </div>

      {/* Face Color Controls */}
      <div className="flex gap-2 mt-4">
        {["Front", "Back", "Top", "Bottom", "Left", "Right", "FullBody"].map((face) => (
          <button
            key={face}
            onClick={() => setSelectedFace(face)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:scale-105 transition"
          >
            {face}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoxModel;