import { useState } from 'react';
import Spinner from '../../components/Spinner';
import PiflixAPI from '../../services/PiflixAPI';
import styles from './AddTorrent.module.css';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

export default function AddTorrent() {
    const [magnet, setMagnet] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const history = useHistory();

    document.title = "Add torrent | Piflix";

    const alreadyExistsToast = () => toast.error("This torrent already exists in the database. Check active transfers or recent downloads.");

    const mySubmitHandler = (event) => {
        event.preventDefault();
        setShowSpinner(true);

        let piflixAPI = new PiflixAPI();
        piflixAPI.addTorrentWithMagnet(magnet)
        .then(function() {
            history.push("/transfers");
        })
        .catch(err => {
            setShowSpinner(false);

            if (err.message === "409") {
                alreadyExistsToast();
            }
        });
    }

    const magnetChangeHandler = (event) => {
        setMagnet(event.target.value);
    }

    return (
        <div className="content">
            <h1>Add new torrent</h1>
            <p style={{paddingTop: "6px"}}>You can paste the magnet link below and add the torrent to download queue.</p>
            <form className={styles.addTorrentForm} onSubmit={mySubmitHandler}>
                <div><input type="text" name="magnet" placeholder="Paste your magnet link here" value={magnet} onChange={magnetChangeHandler} autoComplete="off" required/></div>
                <div><input type="submit" value="Start download" /></div>
            </form>
            <Spinner active={showSpinner} />
        </div>
    );
}