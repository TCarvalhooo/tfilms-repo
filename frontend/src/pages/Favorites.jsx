import "../css/Favorites.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  async function getMovies() {
    try {
      const response = await api.get("/favorites");
      setMovies(response.data);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  async function removeFavorite(id) {
    try {
      await api.delete(`/favorites/${id}`);

      setMovies(
        movies.filter(movie => movie.id !== id)
      );
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  }

  if (movies.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Sua lista está vazia</h2>

        <p>
          Explore os filmes e adicione seus favoritos para
          criar sua coleção pessoal.
        </p>
      </div>
    );
  }

  return (
    <div className="favorites">

      <h1>Minha Lista ({movies.length})</h1>

      <div className="movies-grid">

        {movies.map(movie => (

          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie-info/${movie.movieId}`)}
          >

            <div className="movie-poster">

              <img
                src={movie.poster}
                alt={movie.title}
              />

              <div className="movie-overlay">

                <button
                  className="details-btn"
                >
                  Ver detalhes
                </button>

                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(movie.id);
                  }}
                >
                  Remover
                </button>

              </div>

            </div>

            <div className="movie-info">
              <h3>{movie.title}</h3>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Favorites;