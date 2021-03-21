class PiflixAPI {
    constructor() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // Change this to the port that you will use with piflix server. Default is 4000.
            this.baseURL = "http://localhost:4000";
        } else {
            this.baseURL = window.location.origin;
        }
    }

    getDownloadedMovies() {
        return fetch(this.baseURL + "/downloaded-torrents")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(response => response.json());
    }

    getMovieWithID(id) {
        return fetch(this.baseURL + "/torrent/" + id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(response => response.json());
    }

    addTorrentWithMagnet(magnet) {
        return fetch(this.baseURL + "/add-torrent", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({magnet: magnet})
            })
            .then(response => {
                let statusCode = response.status;
                if (statusCode >= 200 && statusCode < 300) {
                    return response.json();
                }

                throw new Error(statusCode);
            });
    }

    deleteTorrentWithID(id) {
        return fetch(this.baseURL + "/torrent/" + id, {
                method: 'delete'
            })
            .then(response => {
                let statusCode = response.status;
                if (!response.ok || statusCode < 200 || statusCode >= 300) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(response => response.json());
    }

    getActiveTorrents() {
        return fetch(this.baseURL + "/status")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(response => response.json());
    }

    uploadSubtitle(data, torrent, fileID) {
        const formData = new FormData();
        formData.append('subtitle', data);

        return fetch(this.baseURL + "/torrent/" + torrent.id + '/subtitle/' + fileID, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then((response) => response.json());
    }

    deleteSubtitle(torrent, fileID) {
        return fetch(this.baseURL + "/torrent/" + torrent.id + '/subtitle/' + fileID, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then((response) => response.json());
    }
}

export default PiflixAPI