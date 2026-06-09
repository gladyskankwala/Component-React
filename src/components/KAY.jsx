import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useGLTF, Environment, Float, Center, Html, useScroll, Text } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, Scanline } from '@react-three/postprocessing'
import * as THREE from 'three'

function AgencyKeyboard() {
  const group = useRef()
  const scroll = useScroll()
  const { scene } = useGLTF('/assets/keyboard.glb')

  // Clone scene to avoid reference issues if used multiple times
  const clonedScene = useMemo(() => scene.clone(), [scene])

  useFrame((state) => {
    const offset = scroll.offset 

    // 1. POSITIONING with "Wobble" 
    // Added a slight sine wave to make the movement feel more fluid/organic
    group.current.position.x = THREE.MathUtils.lerp(-2, 4, offset)
    group.current.position.y = THREE.MathUtils.lerp(0, -2, offset) + Math.sin(state.clock.elapsedTime) * 0.1
    group.current.position.z = THREE.MathUtils.lerp(0, 5, offset)

    // 2. SCALING 
    const dynamicScale = THREE.MathUtils.lerp(25, 45, offset)
    group.current.scale.setScalar(dynamicScale)

    // 3. ROTATION
    // Faster rotation during the middle of the scroll (acceleration effect)
    group.current.rotation.x = THREE.MathUtils.lerp(0.4, Math.PI * 2, offset)
    group.current.rotation.y = THREE.MathUtils.lerp(-0.4, Math.PI * 3, offset)
    group.current.rotation.z = Math.sin(offset * Math.PI) * 1.5
  })

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <Center>
        <primitive ref={group} object={clonedScene} />
      </Center>
    </Float>
  )
}

// Separate component for the 3D Background Grid/Particles
function Particles() {
  const points = useMemo(() => {
    const p = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20
      p[i * 3 + 1] = (Math.random() - 0.5) * 20
      p[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return p
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00f2ff" transparent opacity={0.4} />
    </points>
  )
}

export default function KAY() {
  return (
    <div className="w-full h-screen bg-[#020202]">
      <Canvas camera={{ position: [0, 0, 15], fov: 35 }} gl={{ antialias: false }}>
        <color attach="background" args={['#020202']} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} color="#00f2ff" castShadow />
        <rectAreaLight width={10} height={10} intensity={10} position={[-10, 0, 5]} color="#7000ff" />
        
        <Suspense fallback={<Html center className="text-cyan-500 font-mono animate-pulse">INITIALIZING_ENGINE...</Html>}>
          <Environment preset="night" />
          
          <ScrollControls pages={6} damping={0.25}>
            <AgencyKeyboard />
            <Particles />

            {/* Post Processing Effects */}
            <EffectComposer>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
              <Scanline opacity={0.1} density={2.5} />
              <Noise opacity={0.05} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>

            <Scroll html>
              <div className="w-screen text-white">
                
                {/* Section 1: Hero */}
                <section className="h-screen flex flex-col justify-center px-10 md:px-24">
                  <h1 className="text-[12vw] font-black leading-none tracking-tighter mix-blend-difference">
                    ULTRA<br/>MANUAL
                  </h1>
                  <div className="h-1 w-32 bg-cyan-500 mt-4" />
                  <p className="text-zinc-500 mt-6 font-mono text-sm uppercase tracking-[0.5em]">
                    Precision Craftsmanship / Vol. 2026
                  </p>
                </section>

                {/* Section 2: Large Quote */}
                <section className="h-screen flex items-center px-10 md:px-24">
                  <div className="max-w-3xl">
                    <p className="text-4xl md:text-6xl font-light italic leading-tight text-zinc-300">
                      "The interface is the <span className="text-white font-bold not-italic">soul</span> of the machine."
                    </p>
                  </div>
                </section>

                {/* Section 3: Feature Grid */}
                <section className="h-screen grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-10 md:px-24">
                  <div className="space-y-8">
                    <div className="group border-l-2 border-zinc-800 pl-6 hover:border-cyan-500 transition-colors">
                      <h4 className="text-cyan-500 font-mono mb-2">01 / TACTILE</h4>
                      <h3 className="text-3xl font-bold">Mechanical Precision</h3>
                      <p className="text-zinc-400 mt-2">Custom tuned switches for the ultimate feedback loop.</p>
                    </div>
                    <div className="group border-l-2 border-zinc-800 pl-6 hover:border-purple-500 transition-colors">
                      <h4 className="text-purple-500 font-mono mb-2">02 / OPTICAL</h4>
                      <h3 className="text-3xl font-bold">Latency Zero</h3>
                      <p className="text-zinc-400 mt-2">Light-speed actuation for competitive dominance.</p>
                    </div>
                  </div>
                </section>

                {/* Section 4: Full Width Tech */}
                <section className="h-screen flex flex-col justify-end pb-20 items-center text-center">
                  <h2 className="text-[15vw] font-black text-transparent stroke-white stroke-2 opacity-10 leading-none" 
                      style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                    HARDWARE
                  </h2>
                </section>

                {/* Section 5: Stats */}
                <section className="h-screen flex items-center justify-between px-10 md:px-24">
                   <div className="flex flex-col items-center">
                      <span className="text-7xl font-black text-cyan-500">0.1ms</span>
                      <span className="font-mono text-zinc-500">RESPONSE_TIME</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className="text-7xl font-black text-white">100M</span>
                      <span className="font-mono text-zinc-500">KEY_STROKES</span>
                   </div>
                </section>

                {/* Section 6: Contact */}
                <section className="h-screen flex flex-col items-center justify-center bg-white text-black">
                  <h2 className="text-8xl font-black mb-8">JOIN_US</h2>
                  <p className="mb-12 font-mono uppercase tracking-widest text-zinc-500">Limited Edition Access</p>
                  <button className="px-16 py-8 bg-black text-white text-xl font-bold hover:scale-110 transition-transform">
                    RESERVE NOW
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