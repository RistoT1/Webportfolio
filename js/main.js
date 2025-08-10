export class MainUI {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            for(const link of document.querySelectorAll('.nav-link')) {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            }
        }

        for (const skill of document.querySelectorAll('.skill')) {
            skill.addEventListener('click', () => {
                console.log(`Skill clicked: ${skill.textContent}`);
            });
        }

    }
}