import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useGLTF, Environment, Float, Center, Html, useScroll } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, ToneMapping } from '@react-three/postprocessing'
import * as THREE from 'three'

function AgencyKeyboard() {
  const group = useRef()
  const scroll = useScroll()
  const { scene } = useGLTF('/assets/keyboard.glb')
  const clonedScene = useMemo(() => scene.clone(), [scene])

  useFrame((state) => {
    const offset = scroll.offset 
    
    // Smooth cinematic movement
    // Moves keyboard from a hero focus to a background element
    group.current.position.x = THREE.MathUtils.lerp(0, 3, offset)
    group.current.position.y = THREE.MathUtils.lerp(0, -1, offset)
    group.current.position.z = THREE.MathUtils.lerp(0, -2, offset)

    // Scaling (subtle zoom for quality feel)
    const dynamicScale = THREE.MathUtils.lerp(30, 32, offset)
    group.current.scale.setScalar(dynamicScale)

    // Pro-level rotation (less chaotic, more deliberate)
    group.current.rotation.x = THREE.MathUtils.lerp(0.2, 0.8, offset)
    group.current.rotation.y = THREE.MathUtils.lerp(-0.4, 0.2, offset)
    group.current.rotation.z = THREE.MathUtils.lerp(0, 0.1, offset)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center>
        <primitive ref={group} object={clonedScene} />
      </Center>
    </Float>
  )
}

function Starfield() {
  const points = useMemo(() => {
    const p = new Float32Array(800 * 3)
    for (let i = 0; i < 800; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30
      p[i * 3 + 1] = (Math.random() - 0.5) * 30
      p[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return p
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.2} sizeAttenuation />
    </points>
  )
}

export default function KeyScroll() {
  return (
    <div className="w-full h-screen bg-[#000000]">
      <Canvas camera={{ position: [0, 0, 10], fov: 25 }} gl={{ antialias: true }}>
        <color attach="background" args={['#000000']} />
        
        {/* Apple-Style Rim Lighting */}
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        <spotLight position={[-5, -10, -5]} angle={0.3} penumbra={1} intensity={1} color="#00f2ff" />
        <rectAreaLight width={15} height={15} intensity={5} position={[0, 0, 10]} color="#ffffff" />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <ScrollControls pages={5} damping={0.1}>
            <AgencyKeyboard />
            <Starfield />

            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.3} />
              <ToneMapping middleGrey={0.6} maxLuminance={16.0} />
              <Vignette offset={0.3} darkness={0.8} />
            </EffectComposer>

            <Scroll html>
              <div className="w-screen font-sans">
                
                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center text-center">
                  <h1 className="text-[10vw] font-medium tracking-tight text-white leading-none">
                    ULTRA<span className="font-light text-zinc-500">MANUAL</span>
                  </h1>
                  <p className="text-zinc-400 mt-4 text-xl font-light tracking-wide">
                    Designed for the future of tactile logic.
                  </p>
                </section>

                {/* Bento Grid Features (Based on watermarked_img_7188842171983203063.png) */}
                <section className="h-screen flex items-center justify-center px-10">
                  <div className="grid grid-cols-2 gap-4 max-w-5xl w-full">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl col-span-2 md:col-span-1">
                      <h3 className="text-cyan-400 font-mono text-xs uppercase mb-4 tracking-tighter">Precision</h3>
                      <h2 className="text-3xl font-medium text-white">Mechanical Perfection</h2>
                      <p className="text-zinc-500 mt-2 text-sm">Every keycap is CNC machined for absolute symmetry.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl">
                      <h3 className="text-white font-mono text-xs uppercase mb-4">Response</h3>
                      <h2 className="text-3xl font-medium text-white">0.1ms Latency</h2>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl col-span-2">
                       <p className="text-zinc-400 text-lg leading-relaxed italic">
                        "The interface is the soul of the machine." — Alex Solver
                       </p>
                    </div>
                  </div>
                </section>

                {/* Tech Specs Section */}
                <section className="h-screen flex items-center justify-between px-24">
                  <div className="text-white">
                    <h2 className="text-[8vw] font-bold opacity-10 tracking-tighter">HARDWARE</h2>
                    <div className="flex gap-20 mt-10">
                      <div>
                        <span className="block text-5xl font-light">100M</span>
                        <span className="text-zinc-500 font-mono text-xs uppercase">Keystrokes</span>
                      </div>
                      <div>
                        <span className="block text-5xl font-light">8000Hz</span>
                        <span className="text-zinc-500 font-mono text-xs uppercase">Polling Rate</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Apple-style White CTA Finish */}
                <section className="h-[120vh] flex flex-col items-center justify-center bg-white text-black rounded-t-[100px]">
                  <h2 className="text-7xl font-bold tracking-tight mb-4">JOIN_US</h2>
                  <p className="text-zinc-500 text-lg mb-10">Available Spring 2026</p>
                  <button className="px-10 py-4 bg-black text-white rounded-full text-lg font-medium hover:scale-105 transition-transform">
                    Reserve Now
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