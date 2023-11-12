'use client';
/* eslint-disable */
import * as THREE from 'three';
import * as React from 'react';
import { useLayoutEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ScrollControls, useScroll } from '@react-three/drei';
import gsap from 'gsap';

const Box = (props: JSX.IntrinsicElements['mesh']) => {
  const ref = useRef<THREE.Mesh>(null!);
  const tl = useRef<gsap.core.Timeline>();
  const scroll = useScroll();
  useFrame(() => {
    if (tl.current) tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.from(
      ref.current.rotation,
      {
        duration: 1,
        y: Math.PI / 2,
      },
      0
    );
    tl.current.to(
      ref.current.rotation,
      {
        duration: 1,
        y: -Math.PI / 2,
      },
      1
    );
  }, []);

  return (
    <mesh {...props} ref={ref} scale={1} rotation={[0, -Math.PI / 3, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'white'} />
    </mesh>
  );
};

const BoxScrollable = () => {
  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={1} />
      <ScrollControls pages={2} damping={1}>
        <Box />
      </ScrollControls>
    </Canvas>
  );
};

export default BoxScrollable;
