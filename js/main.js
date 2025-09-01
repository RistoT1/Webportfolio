export class MainUI {
    constructor() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.setupMobileMenu();
        this.setupSkillInteractions();
    }

    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!mobileToggle || !navMenu) return;

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    setupSkillInteractions() {
        const skills = document.querySelectorAll('.skill');
        if (skills.length === 0) return;

        skills.forEach(skill => {
            skill.addEventListener('click', () => {
                console.log(`Skill clicked: ${skill.textContent}`);
            });
        });
    }
}