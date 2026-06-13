import { useState } from "react";

const nums = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0
]

function Calculater() {

    const [ input, setInput] = useState('')

    const [click, setClick] = useState(false)

    const handleNumberClick = (num) => {
        setInput((prev) => prev + num)
    }

    return(
        <section className="flex justify-center p-4 min-h-full bg-gray-100">
            <div className="bg-black flex flex-col p-6 rounded-2xl shadow-xl w-80">
                <div className="mb-4">
                    <input 
                    type="text" 
                    placeholder="0"
                    value={input}
                    onChange={ (e) => handleNumberClick(e.target.value)}
                    className="w-full p-3 text-right text-2xl font-mono bg-zinc-800 text-white rounded-lg focus:outline-none"
                    />
                </div>
                <div className="grid grid-colls gap-3">
                    {nums.map( num => (
                       <button
                       key={num}
                       onClick={() => handleNumberClick(num)}
                       >
                       </button>
                    ))}
                </div>
            </div>
        </section>
    )

}

export default Calculater;