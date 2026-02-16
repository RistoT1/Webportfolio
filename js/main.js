export class MainUI {
    // Accept a callback function that runs when skills are ready
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

        // Call the callback after skills are added
        if (onReady) onReady();
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

    setupSkill() {
        const SkillList = [
            { name: "JavaScript / TypeScript", desc: "Web programming", img: "img/ts.jpg" },
            { name: "React / REACT NATIVE", desc: "UI library.", img: "img/ReactLogo.png" },
            { name: "CSS / TAILWIND", desc: "Web styling", img: "img/CssLogo.svg" },
            { name: "C#", desc: "App & game dev", img: "img/CsharpLogo.svg" },
            { name: "SQL / NoSQL", desc: "Database queries", img: "img/mongodb.png" },
            { name: "PHP / Laravel", desc: "Server scripting", img: "img/PhpLogo.png" },
            { name: "Docker", desc: "Container Platform", img: "img/Docker.png" },
            { name: "Express.js", desc: "Web framework for Node.js", img: "img/ExpressJS.png" },
            { name: "Json", desc: "Great at processing large JSON data", img: "img/Json.png" },
            { name: "Github-actions", desc: "Automated CI/CD workflows", img: "img/github-logo.png" },
            { name: "Wordpress", desc: "Content management system", img: "img/Wordpress.png" }
        ];


        const SkillContainer = document.getElementById('skills');
        if (!SkillContainer) return; // safety check

        const fragment = document.createDocumentFragment();
        SkillList.forEach(skill => {
            fragment.appendChild(this.ConstructSkill(skill));
        });
        SkillContainer.appendChild(fragment);
    }

    ConstructSkill(skill) {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill');

        // Add image if it exists
        if (skill.img) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('skill-img-container');

            const img = document.createElement('img');
            img.src = skill.img;
            img.alt = skill.name;

            imgContainer.appendChild(img);
            skillDiv.appendChild(imgContainer);
        }

        // Title container
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

        return skillDiv; // Return the constructed element
    }
}
