import React, { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { useScroll, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export function Basketball2() {
  const ballRef = useRef()
  const scroll = useScroll()

  // Load the textures
  const [colorMap, bumpMap, roughnessMap] = useLoader(THREE.TextureLoader, [
    '/basketball_color.jpg', // Replace with your color texture path
    '/basketball_bump.jpg',  // Replace with your bump texture path
    '/basketball_roughness.jpg', // Replace with your roughness texture path (optional)
  ])

  // Optional: Adjust texture wrapping/tiling if needed
  useMemo(() => {
    colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping
    bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping
    if (roughnessMap) {
      roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping
    }
  }, [colorMap, bumpMap, roughnessMap])

  useFrame((state) => {
    // scroll.offset goes from 0 to 1
    const offset = scroll.offset
    
    // Animate position: starts center, moves right, then back left
    ballRef.current.position.x = Math.sin(offset * Math.PI) * 2
    ballRef.current.position.y = (offset * -5) + 2
    
    // Constant rotation for the "rolling" effect
    ballRef.current.rotation.x += 0.01
    ballRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ballRef} scale={1.5}>
      <sphereGeometry args={[1, 64, 64]} /> {/* Increased detail for better texture display */}
      <meshStandardMaterial 
        map={colorMap} 
        bumpMap={bumpMap}
        bumpScale={0.05} // Adjust this for bump intensity
        roughnessMap={roughnessMap}
        metalness={0.1} // Adjust for the slight shine of a new ball
      />
    </mesh>
  )
}