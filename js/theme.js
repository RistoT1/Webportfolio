export class Theme {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    if (!this.themeToggle) return;
    this.init();
  }

  init() {
    const savedTheme = this.getSavedTheme();
    const initialTheme = savedTheme || this.getSystemTheme();
    this.setTheme(initialTheme);

    this.themeToggle.addEventListener('click', () => this.toggleTheme());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      if (!this.getSavedTheme()) {
        this.setTheme(systemTheme);
      }
    });
  }

  getSavedTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
      this.setIcon(theme === 'light' ? 'sun' : 'moon');
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || this.getSystemTheme();
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
