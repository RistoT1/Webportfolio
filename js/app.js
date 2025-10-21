// Imports
import { MainUI } from './main.js';
import { Animations } from './animations.js';
import { Theme } from './theme.js';
import { initContactForm } from './contact.js';
import { NowPlaying } from './currentSong.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main UI first
    new MainUI(() => {
        // Initialize optional UI modules
        new Animations();
        new Theme();
        initContactForm();

        // 🎵 Initialize current song feature
        new NowPlaying(
            'https://currentlylistening-ssmm.onrender.com/nowplaying',
            'cover',
            'print',
            'song-popup',
            5000
        );
    });
});
