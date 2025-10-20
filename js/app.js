import { MainUI } from './main.js';
import { Animations } from './animations.js';
import { Theme } from './theme.js';
import { initContactForm } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
    new MainUI(() => {
        new Animations();
        new Theme();
        initContactForm();
    });
});
