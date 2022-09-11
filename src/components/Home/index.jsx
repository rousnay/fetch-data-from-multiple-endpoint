import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import styles from './Home.module.css';

const Home = () => {
  const [result, setResult] = useState([]);
  const [searchFilm, setSearchFilm] = useState("");
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  const fetchData = async () => {
    const res = await fetch("https://www.swapi.tech/api/films/");
    const json = await res.json();
    setResult(json.result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addFav = (id) => {
    setFavourites([...favourites, id]);
  };

  const removeFav = (id) => {
    setFavourites([...favourites.filter((found) => found !== id)]);
  };

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const filteredMovies = result.filter((film) =>
    film.properties.title.toLowerCase().includes(searchFilm)
  );

  const favouriteMovies = filteredMovies.filter((movie) =>
    favourites.includes(movie._id)
  );
  const unFavouriteMovies = filteredMovies.filter(
    (movie) => !favourites.includes(movie._id)
  );

  return (
    <>
      <h1>List of Films</h1>
      <div className={styles.inputStyle}>
        <input
          type="text"
          value={searchFilm}
          placeholder="Search films.."
          onChange={(e) => setSearchFilm(e.target.value)}
        />
      </div>
      {favouriteMovies.map((value, key) => {
        return (
          <table key={key} className={styles.containerTable}>
            <tbody className={styles.films}>
              <tr>
                <td>
                  <nav><NavLink to={`/film/${value.properties.episode_id}`} className={styles.linkStyle}
                  style={({ isActive }) => ({
                    color: isActive ? '#000' : '#0B0820',
                    textDecoration: isActive ? 'none' : 'none'
                  })}>{value.properties.title}{" "}</NavLink></nav>
                  <Outlet />
                  <b onClick={() => removeFav(value._id)}><FaHeart color="#7687BA" /></b>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
      {unFavouriteMovies.map((value, key) => {
        return (
          <table key={key} className={styles.containerTable}>
            <tbody className={styles.films}>
              <tr>
                <td>
                <nav>
                  <NavLink to={`/film/${value.properties.episode_id}`}
                    className={styles.linkStyle}
                    style={({ isActive }) => ({
                      color: isActive ? '#000' : '#0B0820',
                      textDecoration: isActive ? 'none' : 'none'
                    })}>{value.properties.title}{" "}</NavLink>
                    </nav>
                  <b onClick={() => addFav(value._id)}><FaRegHeart /></b>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
      {/* {result.map((value) => (
        <div>
          <h1>{value.properties.title}</h1>
          <h4>Description</h4>
          <p>{value.description}</p>
          <h4>Release date</h4>
          <p>{value.properties.release_date}</p>
          <h4>Director</h4>
          <p>{value.properties.director}</p>
          <h4>Producer</h4>
          <p>{value.properties.producer}</p>
          <h4>Main characters</h4>
          <p>{value.properties.characters}</p>
        </div>
      ))} */}
    </>
  );
};
export default Home;