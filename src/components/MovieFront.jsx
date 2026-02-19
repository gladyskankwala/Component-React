import { useState, useEffect } from "react"

function MovieFront() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")

    const IMG_PATH = "https://image.tmdb.org/t/p/w1280"

    const fetchData = async (e) => {
        const res = await fetch("http://localhost:3000/movies")
        const data = await res.json()
        setMovies(data.results)
    }

    const searchData = async (e) => {
        e.preventDefault()

        if (!search.trim()) return

        const res = await fetch(`http://localhost:3000/search?q=${search}`)
        const data = await res.json()
        setMovies(data.results)
        setSearch("")
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
                    </div>
                ))}
            </div>
        </div>
    )

}

export default MovieFront