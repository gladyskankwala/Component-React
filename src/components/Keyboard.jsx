import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useGLTF, Environment, Float, Center, Html, useScroll } from '@react-three/drei'
import * as THREE from 'three'

// 1. THE 3D MODEL COMPONENT
function AgencyKeyboard() {
  const group = useRef()
  const scroll = useScroll()
  
  // Pointing to public/assets/keyboard.glb
  // The leading "/" tells Vite to look in the public folder
  const { scene } = useGLTF('/assets/keyboard.glb')

  useFrame((state) => {
    const offset = scroll.offset // Value from 0 to 1 based on scroll

    // Position: Transitions from center-left to bottom-right
    group.current.position.x = THREE.MathUtils.lerp(-1, 3, offset)
    group.current.position.y = THREE.MathUtils.lerp(0, -4, offset)
    
    // Rotation: A full 360 spin plus a slight tilt
    group.current.rotation.x = offset * Math.PI * 0.5
    group.current.rotation.y = offset * Math.PI * 2
    group.current.rotation.z = Math.sin(offset) * 0.2
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center>
        <primitive 
          ref={group} 
          object={scene} 
          scale={15} // Adjust this if the keyboard is too big/small
          rotation={[0.4, -0.4, 0]} 
        />
      </Center>
    </Float>
  )
}

// 2. THE MAIN APP
export default function App() {
  return (
    <div className="w-full h-screen bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        {/* Force a black background immediately to prevent white flashes */}
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00f2ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
        
        <Suspense fallback={<Html center className="text-cyan-500 font-mono">LOADING_SYSTEM...</Html>}>
          <Environment preset="city" />
          
          <ScrollControls pages={4} damping={0.2}>
            <AgencyKeyboard />

            <Scroll html>
              <div className="w-screen text-white uppercase overflow-x-hidden">
                
                {/* Hero Section */}
                <section className="h-screen flex flex-col justify-center px-10 md:px-24">
                  <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter">
                    KEY<br/><span className="text-zinc-800">STROKE</span>
                  </h1>
                  <p className="text-cyan-500 mt-6 font-mono tracking-widest text-lg">
                    Digital Solutions / [01]
                  </p>
                </section>

                {/* Info Section */}
                <section className="h-screen flex items-center justify-end px-10 md:px-24">
                  <div className="max-w-xl border-r-8 border-cyan-500 pr-10 text-right">
                    <h2 className="text-6xl font-bold mb-4">Tactile Logic</h2>
                    <p className="normal-case text-zinc-400 text-xl leading-relaxed">
                      We bridge the gap between physical sensation and digital interface. 
                      Every pixel is a conscious decision.
                    </p>
                  </div>
                </section>

                {/* Tech Section */}
                <section className="h-screen flex items-center justify-start px-10 md:px-24">
                  <div className="space-y-2">
                    <p className="text-zinc-500 font-mono">CORE_STACK</p>
                    <h3 className="text-8xl font-black hover:text-cyan-500 transition-colors cursor-default">WEBGL</h3>
                    <h3 className="text-8xl font-black hover:text-cyan-500 transition-colors cursor-default">REACT</h3>
                    <h3 className="text-8xl font-black hover:text-cyan-500 transition-colors cursor-default">TAILWIND</h3>
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
      </Canvas>
    </div>
  )
}import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useGLTF, Environment, Float, Center, Html, useScroll } from '@react-three/drei'
import * as THREE from 'three'

// 1. THE 3D MODEL COMPONENT
function AgencyKeyboard() {
  const group = useRef()
  const scroll = useScroll()
  
  // Pointing to public/assets/keyboard.glb
  // The leading "/" tells Vite to look in the public folder
  const { scene } = useGLTF('/assets/keyboard.glb')

  useFrame((state) => {
    const offset = scroll.offset // Value from 0 to 1 based on scroll

    // Position: Transitions from center-left to bottom-right
    group.current.position.x = THREE.MathUtils.lerp(-1, 3, offset)
    group.current.position.y = THREE.MathUtils.lerp(0, -4, offset)
    
    // Rotation: A full 360 spin plus a slight tilt
    group.current.rotation.x = offset * Math.PI * 0.5
    group.current.rotation.y = offset * Math.PI * 2
    group.current.rotation.z = Math.sin(offset) * 0.2
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center>
        <primitive 
          ref={group} 
          object={scene} 
          scale={15} // Adjust this if the keyboard is too big/small
          rotation={[0.4, -0.4, 0]} 
        />
      </Center>
    </Float>
  )
}

// 2. THE MAIN APP
export default function App() {
  return (
    <div className="w-full h-screen bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        {/* Force a black background immediately to prevent white flashes */}
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00f2ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
        
        <Suspense fallback={<Html center className="text-cyan-500 font-mono">LOADING_SYSTEM...</Html>}>
          <Environment preset="city" />
          
          <ScrollControls pages={4} damping={0.2}>
            <AgencyKeyboard />

            <Scroll html>
              <div className="w-screen text-white uppercase overflow-x-hidden">
                
                {/* Hero Section */}
                <section className="h-screen flex flex-col justify-center px-10 md:px-24">
                  <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter">
                    KEY<br/><span className="text-zinc-800">STROKE</span>
                  </h1>
                  <p className="text-cyan-500 mt-6 font-mono tracking-widest text-lg">
                    Digital Solutions / [01]
                  </p>
                </section>

                {/* Info Section */}
                <section className="h-screen flex items-center justify-end px-10 md:px-24">
                  <div className="max-w-xl border-r-8 border-cyan-500 pr-10 text-right">
                    <h2 className="text-6xl font-bold mb-4">Tactile Logic</h2>
                    <p className="normal-case text-zinc-400 text-xl leading-relaxed">
                      We bridge the gap between physical sensation and digital interface. 
                      Every pixel is a conscious decision.
                    </p>
                  </div>
                </section>

                {/* Tech Section */}
                <section className="h-screen flex items-center justify-start px-10 md:px-24">
                  <div className="space-y-2">
                    <p className="text-zinc-500 font-mono">CORE_STACK</p>
                    <h3 className="text-8xl font-black hover:text-cyan-500 transition-colors cursor-default">WEBGL</h3>
                    <h3 className="text-8xl font-black hover:text-cyan-500 transition-colors cursor-default">REACT</h3>
                    <h3 className="text-8xl font-black hover:text-cyan-500 transition-colors cursor-default">TAILWIND</h3>
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
      </Canvas>
    </div>
  )
}