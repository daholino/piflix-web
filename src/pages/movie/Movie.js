import { useEffect, useState, useRef } from 'react';
import PiflixAPI from '../../services/PiflixAPI.js';
import { useParams } from "react-router-dom";
import NameProcessor from '../../utilities/NameProcessor.js';
import styles from './Movie.module.css';
import Dialog from '../../components/Dialog.js';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import PiPlayer from './PiPlayer.js';

export default function Movie() {
    let { id } = useParams();

    const hiddenFileInput = useRef(null);

    const history = useHistory();

    const deleteOkToast = () => toast.success("Torrent deleted successfully.");

    const [movie, setMovie] = useState(null);
    const [fileIndex, setFileIndex] = useState(0);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [subtitleFileID, setSubtitleFileID] = useState(0);

    const handleSubtitleClick = (fileID) => {
        setSubtitleFileID(fileID);

        let file = movie.files.find(file => file.id === fileID);

        if (file.subtitle == null || file.subtitle.length === 0) {
            hiddenFileInput.current.click();
            return;
        }

        let api = new PiflixAPI();
        api.deleteSubtitle(movie, fileID)
        .then(() => {
            api.getMovieWithID(id)
            .then(function (data) {
                setMovie(data.torrent);
            })
            .catch(error => {
                console.error('getMovieWithID fetch:', error);
            });
        })
        .catch (error => {
            console.error('getMovieWithID fetch:', error);
        });
    };

    const handleChange = event => {
        const file = event.target.files[0];

        if (!file) return;

        let api = new PiflixAPI();
        api.uploadSubtitle(file, movie, subtitleFileID)
        .then(() => {
            api.getMovieWithID(id)
                .then(function (data) {
                    setMovie(data.torrent);
                })
                .catch(error => {
                    console.error('getMovieWithID fetch:', error);
                });
        })
        .catch (error => {
            console.error('getMovieWithID fetch:', error);
        });
    };

    useEffect(() => {
        let api = new PiflixAPI();
        api.getMovieWithID(id)
            .then(function (data) {
                setMovie(data.torrent);
                let nameProcessor = new NameProcessor();
                document.title = nameProcessor.processMovieName(data.torrent.name) + " | Piflix";
            })
            .catch(error => {
                console.error('getMovieWithID fetch:', error);
            });
    }, [id]);

    if (movie == null) {
        return (
            <div></div>
        );
    }

    let api = new PiflixAPI();
    return (
        <div className="content">
            <h1>{(new NameProcessor()).processMovieName(movie.name)}</h1>
            <p>Added on {dateToDMY(new Date(movie.added_time))}</p>
            <PiPlayer key={movie.id} movie={movie} fileIndex={fileIndex} />
            <div className={styles.files}>
                <h3>Available files</h3>
                <hr />
                {movie.files.map((file, index) => (
                    <div className={styles.fileContainer} key={index}>
                        <div>
                            <button className={styles.file} style={{ color: fileIndex === index ? "#05C74D" : "#fff" }} onClick={() => setFileIndex(index)}>{file.path}</button>
                        </div>
                        <div>
                            <button className={styles.subtitle} onClick={() => handleSubtitleClick(file.id)} style={{ color: file.subtitle ? "#ff2121" : "#ccc" }}>{file.subtitle ? "Remove subtitle" : "Add subtitle"}</button>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                                accept=".srt"
                            />

                            <button className={styles.copy} onClick={() => navigator.clipboard.writeText(api.baseURL + "/media/" + movie.id + "/" + index + "/playlist.m3u8")}>Copy playlist URL</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.actions}>
                <h3>Actions</h3>
                <hr />
                <button className={styles.deleteBtn} onClick={() => setShowDeleteDialog(true)}>Delete torrent</button>
            </div>
            <Dialog
                shouldDisplay={showDeleteDialog}
                title="Delete torrent"
                message={`Are you sure you want to delete ${movie.name}?`}
                confirmActionTitle="Delete"
                torrent={movie}
                confirmButtonBgColor={"#db2525"}
                onConfirm={() => {
                    let api = new PiflixAPI();
                    api.deleteTorrentWithID(movie.id)
                    .then(() => {
                        deleteOkToast();
                        history.push("/");
                    });
                }}
                onClose={() => setShowDeleteDialog(false)}
            />
        </div>
    );
}

// Helpers

function dateToDMY(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '. ' + (m <= 9 ? '0' + m : m) + '. ' + y + '.';
}