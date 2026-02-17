import gsap from "gsap"
import { useEffect, useLayoutEffect } from "react"
import { useState, useRef } from "react"

const panels =[
    {
        img: "https://images.unsplash.com/photo-1665042099439-39d93c1117e6?q=80&w=1156",
        title: "Hallowin"
    },
    {
        img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1170",
        title: "Tokyo Night"
    },
    {
        img: "https://images.unsplash.com/photo-1666153184660-a09d73e5b755?q=80&w=1170",
        title: "Fire Force"
    }
]

function CarouselGsap() {
    const panelRef = useRef([])
    const [items, setItems] = useState(panels)

    /*useEffect(() => {
        animate()
    }, [items])

    const animate= () => {
        panelRef.current.forEach((panel, i) =>{
            const offset = i - 1

            gsap.set(panel, {
                x: offset * 320,
                scale: offset === 0 ? 1: 0.5,
                opacity: offset === 0 ? 1 : 0.5,
                zIndex: offset === 0 ? 2 : 1,
            })

            gsap.to(panel, {
                 duration: 0.6,
                ease: 'power3.out'
            })
        })
    }*/

    useLayoutEffect(() => {
        const tl = gsap.timeline({defaults: {duration: 0.7}})

        panelRef.current.forEach((panel, i) => {
            const offset = i - 1

            tl.to(
                panel,
                {
                    x: offset * 340,
                    scale: offset ===0 ? 1 : 0.75,
                    opacity: offset === 0 ? 1 : 0.5,
                    zIndex: offset === 0 ? 2 : 1,
                    filter: offset === 0 ? "blur(0px)" : "blur(2px)",
                    ease: offset === 0 
                     ? "back.out(1.7)" : "power3.out"
                },
                0
            )
        })

        return () => tl.kill()
        
    }, [items])

    useEffect(() => {
        const id = setInterval(next, 3500)
        return () => clearInterval(id)
    }, [])

    const animateAndRotate = (directions = "next") => {
        const distance = 340

        const tl = gsap.timeline({
            defaults: {duration: 0.6, ease: "power3.inOut"},
            onComplete: () => {
                setItems((prev) => 
                    directions === "next" ?
                    [...prev.slice(1), prev[0]] 
                    : [prev[prev.length - 1], ...prev.slice(0, -1)]
                )

                gsap.set(panelRef.current, {x:0})
            }
        })

        panelRef.current.forEach((panel, i) => {
            const offset = i - 1

            tl.to(
                panel, {
                    x: (offset - (directions === "next" ? 1 : -1)) * distance,
                    scale:offset ===0 ? 1 : 0.75,
                    opacity:  offset === 0 ? 1 : 0.5,
                },
                0
            )
        })
    }

    const next = () => animateAndRotate("next")
    const prev = () => animateAndRotate("prev")

    return(
        <div>
            <div className="carousel">
                {items.map((panel, i) => (
                    <div
                      key={i}
                      className="panel"
                      ref={(el) => panelRef.current[i] = el}
                      style={{backgroundImage: `url(${panel.img})`}}
                    >
                        <h2>{panel.title}</h2>
                    </div>
                ))}
            </div>

            <div className="controls">
                <button onClick={prev}>Prev</button>
                <button onClick={next}>Next</button>
            </div>
        </div>
    )
}

export default CarouselGsap