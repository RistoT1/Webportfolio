import { Animations } from './animations.js';
import { Theme } from './theme.js';
import { MainUI } from './main.js';
import { initContactForm } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  new Animations();
  new Theme();
  new MainUI();
  initContactForm();
});