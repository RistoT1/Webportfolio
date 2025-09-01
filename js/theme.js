export class Theme {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    if (!this.themeToggle) return;
    this.init();
  }

  init() {
    // Load saved theme or default to dark
    const savedTheme = this.getSavedTheme();
    this.setTheme(savedTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  getSavedTheme() {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch (e) {
      return 'dark'; // Fallback if localStorage unavailable
    }
  }

  setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      this.setIcon('sun');
    } else {
      document.documentElement.removeAttribute('data-theme');
      this.setIcon('moon');
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    this.setTheme(newTheme);
    this.saveTheme(newTheme);
  }

  saveTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.log('Theme preference cannot be saved - localStorage unavailable');
    }
  }

  setIcon(icon) {
    this.themeToggle.innerHTML = `<i class="fas fa-${icon}"></i>`;
  }
}
