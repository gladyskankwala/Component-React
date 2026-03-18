import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, useGLTF, Float, Center } from '@react-three/drei'
import * as THREE from 'three'

export function Keyboard() {
  const group = useRef()
  const scroll = useScroll()
  
  // Using a CDN model for testing, replace with your '/assets/keyboard.glb'
  const { scene } = useGLTF('public/assets/keyboard.gld') 

  useFrame((state) => {
    const offset = scroll.offset
    
    // 1. Massive Movement
    // Moves from left to right across the screen
    group.current.position.x = THREE.MathUtils.lerp(-2, 5, offset)
    group.current.position.y = THREE.MathUtils.lerp(0, -5, offset)
    
    // 2. Dramatic Rotation
    // Flips the keyboard to show the bottom/side during scroll
    group.current.rotation.x = offset * Math.PI
    group.current.rotation.y = offset * Math.PI * 0.5
    group.current.rotation.z = Math.sin(offset) * 0.5
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center>
        <primitive 
          ref={group} 
          object={scene} 
          scale={15} // MASSIVE SCALE
          rotation={[0.5, -0.5, 0]} 
        />
      </Center>
    </Float>
  )
}