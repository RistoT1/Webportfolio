export class NowPlaying {
    constructor(apiUrl, coverId, printId, popupID, refreshInterval = 5000) {
        this.API_URL = apiUrl;
        this.cover = document.getElementById(coverId);
        this.print = document.getElementById(printId);
        this.popup = document.getElementById(popupID);
        this.lastSong = null;
        this.refreshInterval = refreshInterval;

        // Bind click event on wrap to toggle popup
        const wrap = document.getElementById('wrap');
        if (wrap && this.popup) {
            wrap.addEventListener('click', () => {
                this.fetchCurrentSong();
                if (this.popup.classList.contains('show')) {
                    this.popup.classList.remove('show');
                    clearTimeout(this.hideTimeout);
                } else {
                    this.popup.classList.add('show');
                    clearTimeout(this.hideTimeout);
                    this.hideTimeout = setTimeout(() => this.popup.classList.remove('show'), 5000);
                }
                console.log('Popup toggled');
            });
        }

        // Start periodic updates
        this.init();
    }

    async fetchCurrentSong() {
        try {
            const res = await fetch(this.API_URL);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const song = await res.json();
            this.updateUI(song);
        } catch (err) {
            console.error("Failed to fetch song:", err);
            // Show placeholder if fetch fails
            this.updateUI(null);
        }
    }

    updateUI(song) {
        const placeholder = './img/placeholder.png';
        const thumbnail = song && song.thumbnail ? song.thumbnail : placeholder;
        const title = song && song.title ? song.title : "Nothing Playing";
        const artist = song && song.artist ? song.artist : "—";

        // Update cover
        if (this.cover) {
            this.cover.style.backgroundImage = `url('${thumbnail}')`;
        }

        // Update vinyl print
        if (this.print) {
            this.print.style.backgroundImage = `url('${thumbnail}')`;
            // Stop spinning if nothing is playing
            if (!song || !song.title) {
                this.print.style.animation = 'none';
            } else {
                this.print.style.animation = '5s linear spinThat infinite';
            }
        }

        // Update popup content
        if (!this.lastSong || this.lastSong.title !== title || this.lastSong.artist !== artist) {
            if (this.popup) {
                const titleEl = this.popup.querySelector("#popupTitle");
                const artistEl = this.popup.querySelector("#popupArtist");
                const coverEl = this.popup.querySelector("#popupCover");

                if (titleEl) titleEl.textContent = title;
                if (artistEl) artistEl.textContent = artist;
                if (coverEl) coverEl.src = thumbnail;
            }

            console.log("🎧 Now Playing:", title, "-", artist);
            this.lastSong = { title, artist };
        }
    }


    init() {
        // Initial fetch
        this.fetchCurrentSong();

        // Periodic updates
        this.intervalID = setInterval(() => this.fetchCurrentSong(), this.refreshInterval);
    }
}
