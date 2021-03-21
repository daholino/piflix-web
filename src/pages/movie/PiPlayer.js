import PiflixAPI from '../../services/PiflixAPI.js';
import ReactPlayer from 'react-player';
import styles from './PiPlayer.module.css';

export default function PiPlayer(props) {
    const displayNativePlayer = ['iPhone', 'iPhone Simulator', 'iOS', 'iPad'].includes(navigator.platform);
    let api = new PiflixAPI();
    const mediaURL = api.baseURL + "/media/" + props.movie.id + "/" + props.fileIndex + "/playlist.m3u8";

    const getTracklistForCurrentFile = () => {
        let file = props.movie.files[props.fileIndex];

        if (!file.subtitle) return [];

        return [
            { kind: 'subtitles', src: api.baseURL + '/' + file.subtitle, srcLang: 'en', default: true },
        ]
    }

    if (displayNativePlayer) {
        return (
            <video
                width="100%"
                className={styles.player}
                controls>
                <source
                    src={mediaURL}
                    type="application/vnd.apple.mpegurl"
                />
                {props.movie.files[props.fileIndex].subtitle &&
                    <track label="English" kind="subtitles" srclang="en" src={api.baseURL + '/' + props.movie.files[props.fileIndex].subtitle} default></track>
                }
            </video>
        );
    }

    return (
        <ReactPlayer
            url={mediaURL}
            config={{
                file: {
                    forceHLS: true,
                    attributes: {
                        crossOrigin: 'true'
                    },
                    tracks: getTracklistForCurrentFile()
                }
            }}
            width="100%"
            height="100%"
            className={styles.player}
            controls
        />
    );
}