import { Link } from "react-router-dom";
import styles from './Movie.module.css';
import NameProcessor from '../../../utilities/NameProcessor.js';

export default function Movie(props) {
    let nameProcessor = new NameProcessor();
    return (
        <>
        <Link to={"/movie/" + props.movie.id}>
            <div className={styles.movie}>
                    <img alt={props.movie.name} src={props.movie.poster == null || props.movie.poster.length === 0 ? "images/poster-placeholder.jpg" : props.movie.poster} />
                <h3>{nameProcessor.processMovieName(props.movie.name)}</h3>
                <p>{props.movie.files.length} file(s)</p>
            </div>
            </Link>
        </>
    );
}