import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const Detail = () => {
  const { id } = useParams();
  const [detailMovie, setDetailMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const movieDetail = async (id) => {
    const movieDetailData = await axios({
      url: `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`,
    });
    const { movie } = movieDetailData.data.data;
    console.log("22", movie);
    setDetailMovie(movie);
    setLoading(false);
  };

  useEffect(() => {
    movieDetail(id);
  }, [id]);
  return (
    <div>
      <h3>{loading ? <Loading /> : detailMovie.title}</h3>
    </div>
  );
};

export default Detail;
