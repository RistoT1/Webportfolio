export class MainUI {
    constructor(onReady) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init(onReady));
        } else {
            this.init(onReady);
        }
    }

    init(onReady) {
        this.setupMobileMenu();
        this.setupSkill();
        this.setupSmoothScroll();
        this.handleScrollParam();
        if (onReady) onReady();
    }

    handleScrollParam() {
        const params = new URLSearchParams(window.location.search);
        const section = params.get('s');
        if (!section) return;

        // Wipe the ?s= param from URL immediately
        history.replaceState(null, '', '/');

        const target = document.querySelector('#' + section);
        if (!target) return;

        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            link.addEventListener('click', (e) => {
                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!mobileToggle || !navMenu) return;

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    setupSkill() {
        const SkillList = [
            // Frontend
            { name: "JavaScript / TypeScript", desc: "Web programming", img: "img/ts.jpg" },
            { name: "React / REACT NATIVE", desc: "Framework", img: "img/ReactLogo.png" },
            { name: "Vue", desc: "Framework", img: "img/Vue-logo.png" },
            { name: "CSS / TAILWIND", desc: "Web styling", img: "img/CssLogo.svg" },
            // Backend
            { name: "Express.js", desc: "Web framework for Node.js", img: "img/ExpressJS.png" },
            { name: "PHP / Laravel", desc: "Server scripting", img: "img/Laravel.png" },
            { name: "C#", desc: "App & game dev", img: "img/CsharpLogo.svg" },
            // Data
            { name: "SQL / NoSQL", desc: "Database queries", img: "img/mongodb.png" },
            { name: "JSON", desc: "Great at processing large JSON data", img: "img/json.png" },
            // DevOps & CMS
            { name: "Docker", desc: "Container Platform", img: "img/Docker.png" },
            { name: "Github-actions", desc: "Automated CI/CD workflows", img: "img/github-logo.png" },
            { name: "Wordpress", desc: "Content management system", img: "img/wordPress.png" },
        ];

        const SkillContainer = document.getElementById('skills');
        if (!SkillContainer) return;

        const fragment = document.createDocumentFragment();
        SkillList.forEach(skill => {
            fragment.appendChild(this.ConstructSkill(skill));
        });
        SkillContainer.appendChild(fragment);
    }

    ConstructSkill(skill) {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill');

        if (skill.img) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('skill-img-container');

            const img = document.createElement('img');
            img.src = skill.img;
            img.alt = skill.name;

            imgContainer.appendChild(img);
            skillDiv.appendChild(imgContainer);
        }

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('skill-title');

        const h5 = document.createElement('h5');
        h5.textContent = skill.name;
        titleDiv.appendChild(h5);

        if (skill.desc) {
            const p = document.createElement('p');
            p.textContent = skill.desc;
            titleDiv.appendChild(p);
        }

        skillDiv.appendChild(titleDiv);
        return skillDiv;
    }
}