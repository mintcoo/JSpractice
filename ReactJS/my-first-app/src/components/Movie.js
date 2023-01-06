import PropTypes from "prop-types";

const Movie = ({ coverImg, title, summary, genres }) => {
  return (
    <li>
      <img src={coverImg} alt={title} />
      <h3>{title}</h3>
      <p>{summary}</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </li>
  );
};

Movie.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;
