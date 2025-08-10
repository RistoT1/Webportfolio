export class MainUI {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when link clicked
            for(const link of document.querySelectorAll('.nav-link')) {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            }
        }

        // Skill click logging
        for (const skill of document.querySelectorAll('.skill')) {
            skill.addEventListener('click', () => {
                console.log(`Skill clicked: ${skill.textContent}`);
            });
        }

        // Form submission via simulated AJAX
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', e => {
                e.preventDefault();

                const submitButton = contactForm.querySelector('.submit-button');
                if (!submitButton) return;

                const originalText = submitButton.textContent;

                submitButton.textContent = 'sending...';
                submitButton.disabled = true;

                setTimeout(() => {
                    submitButton.textContent = 'message sent';
                    setTimeout(() => {
                        contactForm.reset();
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }
    }
}