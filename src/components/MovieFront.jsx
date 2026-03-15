import { useState, useEffect } from "react"

function MovieFront() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")

    const IMG_PATH = "https://image.tmdb.org/t/p/w1280"

    const fetchData = async (e) => {
        const res = await fetch("http://localhost:3000/movies")
        const data = await res.json()
        setMovies(data.results.map(movie => ({...movie, saved: false})))

    }

    const searchData = async (e) => {
        e.preventDefault()

        if (!search.trim()) return

        const res = await fetch(`http://localhost:3000/search?q=${search}`)
        const data = await res.json()
        setMovies(data.results.map(movie => ({...movie, saved: false})))
        setSearch("")
    }

    const saveMovie = async (movie) => {
        try{
            const res = await fetch("http://localhost:3000/save", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    title: movie.title,
                    rating: movie.vote_average,
                    poster: movie.poster_path
                })
            })

            const data = await res.json()
            console.log("saved:", data)

            setMovies(prev =>
                prev.map(m =>
                    m.id === movie.id ? {...m , saved : true} : m
                ))
            

        } catch (error) {
            console.error("Error saving movie", error)
        }
    }

    useEffect(()=>{
        fetchData()
    }, [])

    return(
        <div>
            <form onSubmit={searchData}>
                <input 
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                />
            </form>

            <div style={{display: "flex", flexWrap: "wrap"}}>
                {movies.map((movie) => (
                    <div key={movie.id} style={{ width: "300px", margin: "10px"}}>
                        <img 
                          src={IMG_PATH + movie.poster_path} 
                          alt={movie.title}
                          width="100%"
                        />

                        <h3>{movie.title}</h3>
                        <p>{movie.vote_average}</p>
                        <button onClick={() => saveMovie(movie)} disabled={movie.saved}>
                            {movie.saved ? "Saved" : "save"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default MovieFront