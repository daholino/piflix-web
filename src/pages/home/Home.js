import { useEffect, useState } from 'react';
import PiflixAPI from '../../services/PiflixAPI.js';
import Movie from './components/Movie.js';
import styles from './Home.module.css';


export default function Home() {
    const [movies, setMovies] = useState([]);

    document.title = "Piflix - Your mini streaming helper";

    useEffect(() => {
        let api = new PiflixAPI();
        api.getDownloadedMovies()
            .then(function(data) {
                setMovies(data.torrents);
            })
            .catch(error => {
                console.error('There has been a problem with fetch operation:', error);
            });
    }, []);

    return(
        <>
        <div className="content">
                <h1>Recent downloads</h1>
                <div className={styles.movies}>
                    {movies.map((movie, index) => (
                        <Movie movie={movie} key={index}></Movie>
                    ))}
                </div>
        </div>
        </>
    );
}