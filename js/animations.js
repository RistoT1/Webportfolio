export class Animations {
    constructor() {
        this.init();
    }

    init() {
        // Smooth scroll for links
        for (const anchor of document.querySelectorAll('a[href^="#"]')) {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                const target = document.querySelector(href);
                if (!target) return;

                if (target.id === "home") {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        };

        // fade-in animations
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';

                if (element.classList.contains('skill')) {
                    const skills = element.parentElement.querySelectorAll('.skill');
                    skills.forEach((skill, index) => {
                        setTimeout(() => {
                            skill.style.opacity = '1';
                            skill.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }
            }
        }, observerOptions);

        // Initial hidden state
        const elementsToAnimate = document.querySelectorAll(
            '.about-text h2, .about-text p, .about-stats, .projects h2, .project-item, .contact h2, .contact-info, .contact-form, .skill'
        );

        for (const el of elementsToAnimate) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(-60px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }

        // Typing effect 
        const typeWriter = (element, text, speed = 100) => {
            let i = 0;
            element.textContent = '';
            element.style.opacity = '1';

            const step = (timestamp) => {
                if (i < text.length) {
                    element.textContent += text.charAt(i++);
                    setTimeout(() => requestAnimationFrame(step), speed);
                }
            };

            requestAnimationFrame(step);
        };

        window.addEventListener('load', () => {
            setTimeout(() => {
                const subtitle = document.querySelector('.hero-subtitle');
                if (subtitle) typeWriter(subtitle, subtitle.textContent, 150);
            }, 1000);
        });

        // Hover effects 
        for (const item of document.querySelectorAll('.project-item')) {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px)';
                item.style.paddingLeft = '2rem';
            });
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
                item.style.paddingLeft = '0';
            });
        }

        // Counter animation
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 100;
            const step = () => {
                current += increment;
                if (current >= target) {
                    current = target;
                } else {
                    requestAnimationFrame(step);
                }
                element.textContent = `${Math.floor(current)}${target === 100 ? '%' : '+'}`;
            };
            requestAnimationFrame(step);
        };

        const statsObserver = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                for (const stat of entry.target.querySelectorAll('.stat-number')) {
                    const number = parseInt(stat.textContent, 10);
                    if (!isNaN(number)) animateCounter(stat, number);
                }

                statsObserver.unobserve(entry.target);
            }
        });


        const aboutStats = document.querySelector('.about-stats');
        if (aboutStats) statsObserver.observe(aboutStats);
    }
}
