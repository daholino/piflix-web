import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import PiflixAPI from '../../services/PiflixAPI.js';
import styles from './ActiveTransfers.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '../../components/Dialog.js';
import { toast } from 'react-toastify';

export default function ActiveTransfers() {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [renderingTorrents, setRenderingTorrents] = useState([]);
    const [downloadingTorrents, setDownloadingTorrents] = useState([]);

    const fetchStatus = () => {
        let api = new PiflixAPI();
        api.getActiveTorrents()
            .then(data => {
                setRenderingTorrents(data.rendering_torrents);
                setDownloadingTorrents(data.downloading_torrents);

                setDataLoaded(true);
            });
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(() => {
            fetchStatus();
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!dataLoaded) {
        return null;
    }

    return (
        <div className="content">
            <h1>Active transfers</h1>
            <ActiveTransfersContent downloadingTorrents={downloadingTorrents} renderingTorrents={renderingTorrents} />
        </div>
    );
}

function ActiveTransfersContent(props) {
    if (props.downloadingTorrents.length === 0 && props.renderingTorrents.length === 0) {
        return (
            <p className={styles.noDataMessage}>There are no downloading or processing torrents currently.</p>
        )
    }

    return (
        <div>
            <RenderingTorrents data={props.renderingTorrents} />
            <DownloadingTorrents data={props.downloadingTorrents} />
        </div>
    )
}

function DownloadingTorrents(props) {
    if (props.data.length === 0) {
        return null;
    }

    return (
        <div className={styles['at-section']}>
            <h3>Downloading torrents</h3>
            <p className={styles.infoMessage}>After the download completes the torrent will go to processing status.</p>
            <div className={styles['at-data']}>
                {props.data.map((torrent, index) => (
                    <DownloadingTorrent key={index} index={index+1} torrent={torrent} />
                ))}
            </div>
        </div>
    )
}

function DownloadingTorrent(props) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const stopOkToast = () => toast.success("Torrent download stopped successfully.");

    return (
        <div className={styles.activeTorrent}>
            <div className={styles.index}>{props.index}.</div>
            <div className={styles.name}>{props.torrent.name}</div>
            <div className={styles.progress}><span className={styles.percentageBold}>{props.torrent.progress}% completed</span> &#11825; {formatBytes(props.torrent.bytes_read)}/{formatBytes(props.torrent.total_size)}</div>
            <div className={styles.delete} onClick={() => setShowDeleteDialog(true)}><FontAwesomeIcon icon={faTrash} size="md" /></div>
            <Dialog
                shouldDisplay={showDeleteDialog}
                title="Stop and Delete torrent"
                message={`Are you sure you want to stop download for ${props.torrent.name}?`}
                confirmActionTitle="Stop and Delete"
                torrent={props.torrent}
                confirmButtonBgColor={"#db2525"}
                onConfirm={() => {
                    let api = new PiflixAPI();
                    api.deleteTorrentWithID(props.torrent.id)
                        .then(() => {
                            stopOkToast();
                        });
                }}
                onClose={() => setShowDeleteDialog(false)}
            />
        </div>
    )
}

function RenderingTorrents(props) {
    if (props.data.length === 0) {
        return null;
    }

    return (
        <div className={styles['at-section']}>
            <h3>Processing torrents</h3>
            <p className={styles.infoMessage}>This process depends on the video length and number of files and it could take from 5 to 15 minutes.</p>
            <div className={styles['at-data']}>
                {props.data.map((torrent, index) => (
                    <RenderingTorrent key={index} index={index + 1} torrent={torrent} />
                ))}
            </div>
        </div>
    )
}

function RenderingTorrent(props) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const stopOkToast = () => toast.success("Torrent processing stopped successfully.");

    return (
        <div className={styles.activeTorrent}>
            <div className={styles.index}>{props.index}.</div>
            <div className={styles.name}>{props.torrent.name}</div>
            <div className={styles.rendering}>Processing</div>
            <div className={styles.delete} onClick={() => setShowDeleteDialog(true)}><FontAwesomeIcon icon={faTrash} size="md" /></div>
            <Dialog
                shouldDisplay={showDeleteDialog}
                title="Stop processing and Delete torrent"
                message={`Are you sure you want to stop processing for ${props.torrent.name}?`}
                confirmActionTitle="Stop and Delete"
                torrent={props.torrent}
                confirmButtonBgColor={"#db2525"}
                onConfirm={() => {
                    let api = new PiflixAPI();
                    api.deleteTorrentWithID(props.torrent.id)
                        .then(() => {
                            stopOkToast();
                        });
                }}
                onClose={() => setShowDeleteDialog(false)}
            />
        </div>
    )
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}