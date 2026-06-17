import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import api from "../../services/api";
import '../css/Home.css'

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);


    async function getMovies() {
    try {
        const response = await api.get('tfilms-repo-backend.onrender.com/movies');

        
        setMovies(response.data);
    } catch (error) {
        console.error(error);
    }
}

    useEffect(() => {
        getMovies();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            <div className="movies-grid">
                {movies
                    .filter(movie =>
                        movie.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                    )
                    .map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Home;
