import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../css/MovieCard.css';

function MovieCard({ movie }) {
    const navigate = useNavigate();
    console.log(movie);
    function onCheckClick() {
        navigate(`/movie-info/${movie.id}`);
    }

    async function onFavoriteClick() {
    try {
        await api.post('/favorites', {
            movieId: movie.id,
            title: movie.title,
            poster: movie.poster
        });

        alert('Filme adicionado aos favoritos!');

    } catch(error) {
        if(error.response?.status === 400){
            alert("Esse filme já está nos favoritos");
        } else {
            alert("Erro ao adicionar favorito");
        }
    }
}
    return (
        <div className="movie-card">
            <div className="movie-poster">
<img
    src={movie.poster}
    alt={movie.title}
/>              <div className="movie-overlay">
                    <button
                        className="favorite-btn"
                        onClick={onFavoriteClick}
                    >
                        🤍
                    </button>

                    <button onClick={onCheckClick}>
                        Check
                    </button>
                </div>
            </div>

            <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
            </div>
        </div>
    );
}

export default MovieCard;