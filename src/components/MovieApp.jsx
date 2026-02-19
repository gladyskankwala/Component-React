import { useState, useEffect } from "react"

function MovieApp() {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    const [error, setError] = useState()

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1')

                if (!res.ok) {
                    throw new Error ("Data could not be loaded")
                }
                const data = await res.json()
                setMovies(data.results)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    },[])
    

    return(
        <div className="flex h-screen w-screen justify-center">
            <div className="flex flex-wrap justify-center">
                {!loading ? 
                  movies.map((movie) =>(
                    <div key={movie.id}
                    className="w-[300px] m-3 overflow-hidden rounded-sm shadow-sm bg-slate-950 text-white"
                    >
                        <img className="w-full" src={IMG_PATH + movie.poster_path} alt={movie.title} />
                        <div>
                            <h3>{movie.title} <span>{movie.vote_average}</span></h3>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                  ))
                 : 
                <h1>Data Loading</h1>}
            </div>
        </div>
    )
}

export default MovieApp