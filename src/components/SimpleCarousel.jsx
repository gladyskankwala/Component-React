import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const panels = [
  { img: "https://images.unsplash.com/photo-1665042099439-39d93c1117e6?q=80&w=1156", title: "Hallowin" },
  { img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1170", title: "Tokyo Night" },
  { img: "https://images.unsplash.com/photo-1666153184660-a09d73e5b755?q=80&w=1170", title: "Fire Force" }
];

export default function SimpleCarousel() {
  const [index, setIndex] = useState(0);
  const panelRef = useRef(null);

  // Fonction pour changer le panel
  const changePanel = (direction) => {
    let newIndex = index + (direction === "next" ? 1 : -1);
    if (newIndex < 0) newIndex = panels.length - 1;
    if (newIndex >= panels.length) newIndex = 0;
    setIndex(newIndex);
  };

  // Animation GSAP simple
  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5 }
    );
  }, [index]);

  return (
    <div style={{ width: "320px", margin: "50px auto", textAlign: "center" }}>
      <div
        ref={panelRef}
        style={{
          width: "300px",
          height: "400px",
          margin: "0 auto",
          backgroundImage: `url(${panels[index].img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          color: "#fff",
          fontSize: "24px",
          fontWeight: "bold",
          padding: "1rem",
          boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
        }}
      >
        {panels[index].title}
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => changePanel("prev")} style={{ padding: "0.5rem 1rem" }}>Prev</button>
        <button onClick={() => changePanel("next")} style={{ padding: "0.5rem 1rem" }}>Next</button>
      </div>
    </div>
  );
}
