export class Theme {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    if (!this.themeToggle) return;
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      this.setIcon('sun');
    } else {
      document.documentElement.removeAttribute('data-theme');
      this.setIcon('moon');
    }
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      this.setIcon('moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      this.setIcon('sun');
    }
  }

  setIcon(icon) {
    if (icon === 'sun') {
      this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
}
