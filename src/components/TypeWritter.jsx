import { useState, useEffect } from "react"

function TypeWritter({text, speed= 80}) {
    const [display, setDisplay] = useState("")
    const [index, setIndex] = useState(0)

    useEffect(()=>{
        if (index <  text.length) {
            const timeout = setInterval(() => {
                setDisplay(prev => prev + text[index])
                setIndex(prev => prev + 1)
            }, speed)
            
            return () => clearInterval(timeout)
        }
    }, [index, text, speed])

    return <span>{display}</span>
}

export default TypeWritter