import { FaFacebook } from "react-icons/fa"
import { GrGoogle } from "react-icons/gr"
import { FaLinkedinIn } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { section } from "framer-motion/client"


function SignIn() {

    const [signin, setSignin] = useState(true)
    const [name, setName] = useState("")

    const leftRef = useRef(null)
    const rightRef = useRef(null)

    useEffect(() =>{
       const tl = gsap.timeline()

       if (signin) {
        tl.fromTo(
            leftRef.current,
            {x: -80, opacity: 0},
            {x: 0, opacity: 1, duration: 0.5, ease: "power3.out"}
        ).fromTo(rightRef.current,
            {x: 80, opacity: 0},
            {x: 0, opacity: 1, duration: 0.5, ease: 'power3.out'}
        )
       } else {
        tl.fromTo(leftRef.current,
            {x:80, opacity: 0},
            {x: 0, opacity: 1, duration: 0.5, ease: "power3.out"}
        ).fromTo(rightRef.current, 
            {x: -80, opacity: 0},
            {x: 0, opacity: 1, duration: 0.5, ease: 'power3.out'}
        )
       }

    }, [signin])

    return(
       <section className="flex h-screen w-screen justify-center items-center">
        <div className="flex shadow-lg rounded-xl overflow-hidden w-[700px]">
            <div ref={leftRef}
              className={`w-1/2 flex flex-col justify-center items-center px-6 py-20
                ${signin ? "bg-white text-white" : "bg-violet-600 text-white"}`}
               >
                {signin ? (
                    <form className="flex flex-col gap-4">
                      <h1 className="text-2xl font-bold">Sign In</h1>
                      <input placeholder="Email" className="border-b" />
                      <input placeholder="Password" className="border-b" />
                      <button className="bg-violet-600 text-white rounded-full py-2">
                       SIGN IN
                      </button>
                    </form>
                ) : (
                    <>
                      <h1 className="text-2xl font-bold">Welcome Back</h1>
                      <button
                        onClick={() => setSignin(true)}
                        className="border rounded-full px-6 py-2 mt-4"
                       >
                       SIGN IN
                       </button>
                    </>
                )}
            </div>

            <div
                ref={rightRef}
                className={`w-1/2 flex flex-col justify-center items-center px-6 py-20
                ${signin ? "bg-violet-600 text-white" : "bg-white text-black"}`}
             >
                {signin ? (
                <>
                    <h1 className="text-2xl font-bold">Hello, Friend</h1>
                    <button
                      onClick={() => setSignin(false)}
                      className="border rounded-full px-6 py-2 mt-4"
                    >
                    SIGN UP
                    </button>
                </>
             ) : (
                <form className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Create Account</h1>
                    <input placeholder="Email" className="border-b" />
                    <input placeholder="Password" className="border-b" />
                    <button className="bg-violet-600 text-white rounded-full py-2">
                     SIGN UP
                    </button>
                </form>
              )}
            </div>

        </div>
       </section>
    )

}

export default SignIn