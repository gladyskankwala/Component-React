import { useState } from "react";

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const signs = ["-", "+", "/", "*"];

function Calculater() {
  const [input, setInput] = useState("");

  const [click, setClick] = useState(false);

  const clearInput = () => {
    setInput("");
  };

  const handleNumberClick = (num) => {
    setInput((prev) => prev + num);
  };

  const handleEqualsClick = () => {
    if (!input) return;

    setClick(true);
  };

  return (
    <section className="flex justify-center p-4 min-h-full bg-gray-100">
      <div className="bg-black flex flex-col p-6 rounded-2xl shadow-xl w-96">
        <div className="mb-4">
          <input
            type="text"
            placeholder="0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 text-right text-2xl font-mono bg-zinc-800 text-white rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <div className="grid grid-cols-3 gap-3 flex-grow">
            {nums.map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className={`bg-zinc-700 hover:bg-zinc-600 text-white text-xl font-semibold p-4 rounded-full transition-all duration-150 
                           ${num === 0 ? "col-span-3 rounded-xl" : ""}`}
              >
                {num}
              </button>
            ))}

            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold p-4 rounded-full text-sm"
              onClick={clearInput}
            >
              C
            </button>
          </div>

          <div className="flex flex-col">
            {signs.map((sign) => (
              <button
                key={sign}
                onClick={(e) => handleNumberClick(sign)}
                className="bg-amber-500 hover:bg-amber-400 text-black text-xl font-bold p-4 rounded-full transition-all duration-150 w-14 h-14 flex items-center justify-center"
              >
                {sign}
              </button>
            ))}

            <button onClick={handleEqualsClick}
            className="bg-amber-500 hover:bg-amber-400 text-black text-xl font-bold p-4 rounded-full transition-all duration-150 w-14 h-14 flex items-center justify-center"
            >=</button>
          </div>
        </div>

        {click && (
          <div className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center p-6 text-center transition-all duration-300 backdrop-blur-sm">
            <div className="text-4xl mb-2">🔒</div>
            <h2 className="text-xl font-black text-amber-400 uppercase tracking-wider mb-2">
              Math Premium Required
            </h2>
            <p className="text-zinc-400 text-xs mb-6 px-2">
              You've used your 0 free daily calculations. Subscribe now to
              unlock the "=" button and see your answers!
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 w-full mb-4">
              <span className="text-white text-lg font-bold">$4.99</span>
              <span className="text-zinc-500 text-xs"> / month</span>
            </div>

            <button
              onClick={() => alert("Processing fake payment... 😉")}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm mb-3"
            >
              Unlock Calculations Now
            </button>

            <button
              onClick={() => setShowPaywall(false)}
              className="text-zinc-500 text-xs hover:text-zinc-300 underline"
            >
              No thanks, I'll stay bad at math
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Calculater;
