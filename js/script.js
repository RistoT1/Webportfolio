// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (target.id === "home") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';

            // Stagger animations for skills
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
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-text h2, .about-text p, .about-stats, .projects h2, .project-item, .contact h2, .contact-info, .contact-form, .skill').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-60px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission TEee ajax
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'sending...';
    submitButton.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitButton.textContent = 'message sent';
        setTimeout(() => {
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }, 1500);
});

// Theme toggle functionality (optional)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    // Add light/dark theme toggle functionality here if needed
    console.log('Theme toggle clicked');
});
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (target.id === "home") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            typeWriter(subtitle, subtitle.textContent, 150);
        }
    }, 1000);
});

// Add smooth hover effects for project items
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
        item.style.paddingLeft = '2rem';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
        item.style.paddingLeft = '0';
    });
});

// Add counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
    }, 20);
}

// Trigger counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}