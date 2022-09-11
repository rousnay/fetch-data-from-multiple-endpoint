import { useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";

const MovieDetail = ({ film }) => {
  const [characters, setCharacters] = useState([]);
  const peoples = film?.properties?.characters.map(async (characterURL) => {
    try {
      const response = await fetch(characterURL);
      const people = await response.json().results;
      if (response.ok) {
        setTimeout(() => {
          return people;
        }, 1000);
      }
    } catch (err) {
      console.error("Error peoples", err);
    }
  });
  Promise.all([peoples]);
  useEffect(() => {
    setCharacters([peoples]);
  }, []);
  console.log("peoples", characters);
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <h2>{film.properties?.title}</h2>
        <p>{film.description}</p>
        <p>Release data: {film.properties?.release_date}</p>
        <p>Director: {film.properties?.director}</p>
        <p>Producer: {film.properties?.producer}</p>
        <h4>Characters:</h4>
        {characters?.map((people) => (
          <ul>
            <li>{people?.properties?.name}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
