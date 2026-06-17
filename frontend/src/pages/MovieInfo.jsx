import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import "../css/MovieInfo.css";

function MovieInfo() {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);

    async function getMovie() {
        const response = await api.get(`tfilms-repo-backend.onrender.com/movie/${id}`);
        setMovie(response.data);
    }

    useEffect(() => {
        getMovie();
    }, []);

    if (!movie) {
        return (
            <div className="loading">
                <h2>Carregando filme...</h2>
            </div>
        );
    }

    return (
        <div className="movie-details">

            <div className="movie-poster-container">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            </div>

            <div className="movie-content">
                <h1>{movie.title}</h1>

                <div className="movie-meta">
                    <span>📅 {movie.release_date}</span>
                    <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>

                <h3>Sinopse</h3>

                <p>{movie.overview}</p>
            </div>

        </div>
    );
}

export default MovieInfo;
