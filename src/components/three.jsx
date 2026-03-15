import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Sphere, MeshDistortMaterial } from '@react-three/drei'

export function Basketball() {
  const ballRef = useRef()
  const scroll = useScroll()

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
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#ff8c00" 
        roughness={0.8} 
        metalness={0.1} 
        wireframe={false} 
      />
    </mesh>
  )
}