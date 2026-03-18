import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Environment } from '@react-three/drei'
import { Keyboard } from './Keyboard'

export default function KeyScroll() {
  return (
    <div className="fixed inset-0 bg-[#050505] w-full h-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        {/* Immediate Background Color */}
        <color attach="background" args={['#050505']} />
        
        {/* Lights - Using higher intensity since we don't have Bloom */}
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={3} color="#00f2ff" />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#7000ff" />
        
        <Suspense fallback={null}>
          {/* Environment provides realistic reflections on the keyboard keys */}
          <Environment preset="city" />
          
          <ScrollControls pages={4} damping={0.2}>
            <Keyboard />

            <Scroll html>
              <main className="w-screen text-white uppercase select-none">
                
                {/* Section 1 */}
                <section className="h-screen flex flex-col justify-center px-10 md:px-24">
                  <h1 className="text-[12vw] font-black leading-none tracking-tighter">
                    DIGITAL<br/><span className="text-zinc-800">AGENCY</span>
                  </h1>
                  <p className="text-cyan-500 font-mono tracking-widest mt-4">Scroll to explore</p>
                </section>
                
                {/* Section 2 */}
                <section className="h-screen flex items-center justify-end px-10 md:px-24">
                  <div className="max-w-xl text-right border-r-4 border-cyan-500 pr-8">
                    <h2 className="text-5xl md:text-7xl font-bold">Tactile</h2>
                    <p className="normal-case text-zinc-400 text-xl mt-4">
                      We design interfaces that feel physical, responsive, and alive.
                    </p>
                  </div>
                </section>

                {/* Section 3 */}
                <section className="h-screen flex items-center justify-start px-10 md:px-24">
                  <div className="space-y-4">
                    <h3 className="text-7xl md:text-9xl font-black text-white">CRAFT</h3>
                    <h3 className="text-7xl md:text-9xl font-black text-zinc-800">CODE</h3>
                    <h3 className="text-7xl md:text-9xl font-black text-zinc-800">CORE</h3>
                  </div>
                </section>

                {/* Section 4 */}
                <section className="h-screen flex flex-col items-center justify-center">
                  <button className="px-16 py-8 bg-white text-black font-black text-2xl hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105">
                    WORK_WITH_US
                  </button>
                </section>

              </main>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}