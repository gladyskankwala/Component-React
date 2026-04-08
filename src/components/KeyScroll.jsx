import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useGLTF, Environment, Float, Center, Html, useScroll } from '@react-three/drei'
import * as THREE from 'three'

function AgencyKeyboard() {
  const group = useRef()
  const scroll = useScroll()
  const { scene } = useGLTF('/assets/keyboard.glb')

  useFrame((state) => {
    // scroll.offset is 0 at the top and 1 at the bottom
    const offset = scroll.offset 

    // 1. DYNAMIC POSITIONING
    // Moves from left (-2) to right (4) and slightly up/down
    group.current.position.x = THREE.MathUtils.lerp(-2, 4, offset)
    group.current.position.y = THREE.MathUtils.lerp(0, -2, offset)
    group.current.position.z = THREE.MathUtils.lerp(0, 2, offset)

    // 2. SCALING (The model gets bigger as we scroll)
    // Starts at scale 25 and grows to 35
    const dynamicScale = THREE.MathUtils.lerp(25, 38, offset)
    group.current.scale.setScalar(dynamicScale)

    // 3. SMOOTH ROTATION
    // Complete 2 full rotations (4 * PI) over the whole scroll
    group.current.rotation.x = THREE.MathUtils.lerp(0.4, Math.PI * 1.2, offset)
    group.current.rotation.y = THREE.MathUtils.lerp(-0.4, Math.PI * 2, offset)
    group.current.rotation.z = Math.sin(offset * Math.PI) * 0.5
  })

  return (
    // Increased float intensity for a more premium feel
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Center>
        <primitive 
          ref={group} 
          object={scene} 
          // Initial rotation before scroll kicks in
          rotation={[0.4, -0.4, 0]} 
        />
      </Center>
    </Float>
  )
}

export default function KeyScroll() {
  return (
    <div className="w-full h-screen bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.4} />
        {/* Added more dramatic lighting */}
        <spotLight position={[20, 20, 10]} angle={0.15} penumbra={1} intensity={3} color="#00f2ff" />
        <pointLight position={[-15, -10, -10]} intensity={1.5} color="#7000ff" />
        
        <Suspense fallback={<Html center className="text-cyan-500 font-mono">LOADING_SYSTEM...</Html>}>
          <Environment preset="city" />
          
          {/* pages={6} makes the scroll area longer (more scrolling needed).
              damping={0.3} adds weight to the movement.
          */}
          <ScrollControls pages={6} damping={0.3}>
            <AgencyKeyboard />

            <Scroll html>
              <div className="w-screen text-white uppercase">
                
                {/* Hero Section */}
                <section className="h-screen flex flex-col justify-center px-10 md:px-24">
                  <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter">
                    KEY<br/><span className="text-zinc-800">STROKE</span>
                  </h1>
                  <p className="text-cyan-500 mt-6 font-mono tracking-widest text-lg">
                    Digital Solutions / [01]
                  </p>
                </section>

                {/* Added extra spacer section to showcase the model movement */}
                <section className="h-screen" />

                {/* Info Section */}
                <section className="h-screen flex items-center justify-end px-10 md:px-24">
                  <div className="max-w-xl border-r-8 border-cyan-500 pr-10 text-right">
                    <h2 className="text-6xl font-bold mb-4">Tactile Logic</h2>
                    <p className="normal-case text-zinc-400 text-xl leading-relaxed">
                      We bridge the gap between physical sensation and digital interface. 
                    </p>
                  </div>
                </section>

                <section className="h-screen" />

                {/* Tech Section */}
                <section className="h-screen flex items-center justify-start px-10 md:px-24">
                  <div className="space-y-2">
                    <p className="text-zinc-500 font-mono">CORE_STACK</p>
                    <h3 className="text-8xl font-black hover:text-cyan-500 transition-colors">WEBGL</h3>
                    <h3 className="text-8xl font-black hover:text-cyan-500 transition-colors">REACT</h3>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="h-screen flex flex-col items-center justify-center">
                  <button className="group relative px-12 py-6 overflow-hidden border border-white">
                    <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 text-2xl font-bold group-hover:text-black transition-colors">
                      GET_IN_TOUCH
                    </span>
                  </button>
                </section>

              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>-o-5>
    </div>
  )
}