import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

function ScrollTriger () {
    const main = useRef()
    const sectionRef = useRef(null)

    useGSAP(() => {
        const boxes = gsap.utils.toArray('.box')

        boxes.forEach((box) => {
            gsap.from(box, {
                scale: 0.2,
                scrollTrigger: {
                    trigger: box,
                    start: "bottom bottom",
                    end: "top 20%",
                    scrub: true,
                    markers: true
                }
            })
        })

           gsap.from('.section', {
            scale: 0.5 ,
            scrollTrigger: {
                trigger: '.section',
                start: "bottom bottom",
                end: 'top top',
                scrub: true,
                //markers: true
            }
        })

    }, {scope: main})

    window.addEventListener('load', () => {
        ScrollTrigger.refresh()
    })

 

    
        

    return(
        <div>
            <section className="flex justify-center gap-4 items-center flex-col h-screen w-screen text-white">
                <h1 className="text-4xl">Basic ScrollTrigger with React</h1>
                <p>Scroll down to see the magic happening</p>
            </section>
            <div className="box-container gap-4 space-y-48" ref={main}>
                <div className="box h-screen w-screen">
                    <h1>Welcome to our beautiful page</h1>
                </div>
            </div>
            <section className="section flex justify-center items-center h-screen screen w-screen bg-white">
                <h1>Gladis</h1>
            </section>
            <section className="h-screen w-screen"></section>
        </div>
    )
}

export default ScrollTriger