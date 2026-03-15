import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Environment } from '@react-three/drei'
import { Basketball } from './Basketball'

export default function ThreeScroll() {
  return (
    <div className="h-screen w-full bg-zinc-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          {/* pages={3} creates a scrollable area 3x the height of the window */}
          <ScrollControls pages={3} damping={0.25}>
            <Basketball />
            
            {/* HTML Content that moves with scroll */}
            <Scroll html>
              <main className="w-screen">
                <section className="h-screen flex items-center justify-center">
                  <h1 className="text-9xl font-black text-white uppercase tracking-tighter italic">
                    The Court
                  </h1>
                </section>

                <section className="h-screen flex items-center justify-end px-20">
                  <div className="max-w-md text-right">
                    <h2 className="text-5xl font-bold text-orange-500 mb-4">Pure Physics</h2>
                    <p className="text-zinc-400 text-xl">
                      Experience the game like never before with real-time 3D motion tracking.
                    </p>
                  </div>
                </section>

                <section className="h-screen flex items-center justify-start px-20">
                  <div className="max-w-md">
                    <h2 className="text-5xl font-bold text-orange-500 mb-4">Full Control</h2>
                    <p className="text-zinc-400 text-xl">
                      Master every dribble, every shot, and every moment.
                    </p>
                    <button className="mt-8 px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-500 transition-colors">
                      GET STARTED
                    </button>
                  </div>
                </section>
              </main>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}