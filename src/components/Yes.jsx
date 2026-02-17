import { useState } from "react"
import { useRef } from "react"
import { BsHousesFill } from "react-icons/bs"
import { FaCloudversify } from "react-icons/fa"
import { FaHeadphonesSimple } from "react-icons/fa6"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import TypeWritter from "./TypeWritter"


function Yes() {
    const [yes, setYEs] = useState(false)
    const butt1Ref = useRef(null)
    const butt2Ref = useRef(null)
    const butt3Ref = useRef(null)
    const headtrue = useRef(null)

     useGSAP(() =>{
        if (yes) {
            gsap.from(
              butt1Ref.current,
                {
                  duration: 0.6,
                  y: 100,
                  ease: 'power1.in',
                  opacity: 0
            })
        }

        if (yes) {
            gsap.from(
                butt2Ref.current, {
                    duration: 0.8,
                    y: 100,
                    ease: 'power1.in',
                    opacity: 0
                }
            )
        }

        if (yes) {
            gsap.from(
                butt3Ref.current, {
                    duration: 1,
                    y: 100,
                    ease: 'power1.in',
                    opacity: 0
                }
            )
        }

        if (yes) {
            gsap.from(
                headtrue.current, {
                    x: 50,
                    duration: 0.4,
                    opacity: 0,
                    ease: 'power1.in'
                }
            )
        }
    }, [yes])

    if (!yes) {
        return(
           <div className="flex h-screen w-screen justify-center items-center">
             <div className="flex gap-20">
                <button onClick={()=> setYEs(true)} className="animate-bounce border-2 border-dashed border-black py-4 px-8 rounded-3xl">YES</button>
                <button className="border-2 border-dashed border-black py-2 px-4 rounded-3xl">NO</button>
             </div>
           </div>
        )
    }

    return(
        <div className="flex flex-col gap-10 h-screen w-screen justify-center items-center">
            <h1 className="text-2xl">
                <span  ref={headtrue} className="text-7xl">OMG</span>, <TypeWritter text={'Choose Your Fate!'} />
            </h1>
            <div className="flex gap-10">
                <button ref={butt1Ref} className="border-2 px-4 py-2 border-black rounded-lg"> <BsHousesFill size={50}/> </button>
                <button ref={butt2Ref} className="border-2 px-4 py-2 border-black rounded-lg"> <FaCloudversify size={50}/></button>
                <button ref={butt3Ref} className="border-2 px-4 py-2 border-black rounded-lg"> <FaHeadphonesSimple size={50}/></button>
            </div>
        </div>
    )


   
}

export default Yes