'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add
} from 'three/tsl';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as unknown as { [key: string]: unknown });

// Post Processing component
const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as unknown as THREE.Renderer);
    const uScanProgress = uniform(0);

    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;

    return { postProcessing, uScanProgress };
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    // eslint-disable-next-line react-hooks/immutability
    render.uScanProgress.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
    render.postProcessing.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);

  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, [rawMap, depthMap]);

  const { material } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);

    const strength = 0.01;
    const tDepthMap = texture(depthMap);

    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength))
    );

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);

    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));

    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    const depth = tDepthMap.r;

    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    const mask = dot.mul(flow).mul(vec3(10, 0, 0));

    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    }) as THREE.MeshBasicNodeMaterial & { uPointer: { value: THREE.Vector2 }, uProgress: { value: number } };
    
    material.uPointer = uPointer;
    material.uProgress = uProgress;

    return {
      material,
    };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicNodeMaterial & { uPointer: { value: THREE.Vector2 }, uProgress: { value: number } };
      if (mat.uProgress) {
        mat.uProgress.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
      }
      mat.opacity = THREE.MathUtils.lerp(
        mat.opacity,
        visible ? 1 : 0,
        0.07
      );
    }
  });

  useFrame(({ pointer }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicNodeMaterial & { uPointer: { value: THREE.Vector2 }, uProgress: { value: number } };
      if (mat.uPointer) {
        mat.uPointer.value = pointer;
      }
    }
  });

  const scaleFactor = 0.40;
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

export const HeroFuturistic = () => {
  const titleWords = "Hi, I'm Dhruvil adroja".split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [webGpuSupported, setWebGpuSupported] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const isSupported = !!(navigator as unknown as { gpu: unknown }).gpu;
      // Use setTimeout to move the state update out of the synchronous render/effect loop
      // to avoid the 'react-hooks/set-state-in-effect' error which is triggered by 
      // synchronous state updates inside an effect.
      setTimeout(() => setWebGpuSupported(isSupported), 0);
    }
  }, []);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="h-screen w-full relative bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-between px-6 md:px-12 transition-opacity duration-1000" style={{ opacity: subtitleVisible ? 1 : 0 }}>
        <div className="text-[10px] md:text-lg xl:text-xl font-extrabold text-zinc-400 uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180">
          Full-Stack Developer
        </div>
        <div className="text-[10px] md:text-lg xl:text-xl font-extrabold text-zinc-400 uppercase tracking-[0.2em] [writing-mode:vertical-lr]">
          Security Engineer
        </div>
      </div>

      <div className="h-full uppercase items-center w-full absolute z-40 pointer-events-none px-10 flex justify-center flex-col">
        <div className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold">
          <div className="flex space-x-2 lg:space-x-6 overflow-hidden text-white">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className="transition-opacity duration-500"
                style={{ opacity: index < visibleWords ? 1 : 0 }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 z-50 animate-bounce">
        <span className="text-white/50 text-xs tracking-widest uppercase font-mono">
          Scroll to explore
        </span>
      </div>

      {webGpuSupported === true ? (
        <Canvas
          flat
          gl={async (props) => {
            const renderer = new THREE.WebGPURenderer(props as unknown as THREE.WebGPURendererParameters);
            await renderer.init();
            return renderer;
          }}
        >
          <PostProcessing fullScreenEffect={true} />
          <Scene />
        </Canvas>
      ) : webGpuSupported === false ? (
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Fallback Animation if WebGPU is not supported */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/40 via-black to-black animate-pulse" />
            <div className="w-64 h-64 border-[1px] border-sky-500/30 rounded-full animate-spin [animation-duration:10s]" />
            <div className="absolute w-48 h-48 border-[1px] border-purple-500/30 rounded-full animate-spin [animation-duration:7s] [animation-direction:reverse]" />
        </div>
      ) : null}
    </div>
  );
};

export default HeroFuturistic;
