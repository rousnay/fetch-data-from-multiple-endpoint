import { useEffect, useState } from "react";

import MovieDetail from "../MovieDetail";
import { useParams } from "react-router-dom";

const showMovie = async (movieId) => {
  const res = await fetch("https://www.swapi.tech/api/films/");
  const json = await res.json();
  const movie = json.result.find(
    (value) => value.properties.episode_id === Number(movieId)
  );

  if (!movie) {
    throw new Error("No match found.");
  }

  return movie;
};

const ItemContainer = () => {
  const [film, setFilm] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    console.log("params movieId container", movieId);

    showMovie(movieId)
      .then((movie) => {
        setFilm(movie);
      })
      .catch((error) => {
        console.error("error useEffet itemContainer", error);

        setFilm({});
      });
  }, [movieId]);
  console.log("film in itemContainer", { film });

  return <MovieDetail key={film.properties?.episode_id} film={film} />;
};

export default ItemContainer;
