import axios from "axios";
import { useState, useEffect } from "react";
import Movie from "../components/Movie.js";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const { data } = await axios({
      url: "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year",
    });
    console.log(data, "2312");
    const moviesData = data.data.movies;
    setMovies(moviesData);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log("@@@@", movies);
  return (
    <div>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <ul>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;