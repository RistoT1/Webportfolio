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
        const SkillGroups = [
            {
                category: "Frontend",
                skills: [
                    { name: "JavaScript", desc: "Web programming", img: "img/JavaScriptLogo.png" },
                    { name: "TypeScript", desc: "Typed JavaScript", img: "img/ts.jpg" },
                    { name: "React / React Native", desc: "Framework", img: "img/ReactLogo.png" },
                    { name: "Vue", desc: "Framework", img: "img/Vue-logo.png" },
                    { name: "Tailwind", desc: "CSS framework", img: "img/TailwindLogo.webp" },
                ],
            },
            {
                category: "Backend",
                skills: [
                    { name: ".NET", desc: "C# framework", img: "img/DotnetLogo.png" },
                    { name: "Express.js", desc: "Web framework for Node.js", img: "img/ExpressJS.png" },
                    { name: "PHP / Laravel", desc: "Server side rendering", img: "img/Laravel.png" },
                ],
            },
            {
                category: "Database",
                skills: [
                    { name: "SQL", desc: "Relational databases", img: "img/postgresql-icon.webp" },
                    { name: "MS SQL", desc: "Microsoft SQL Server", img: "img/MSSQLLogo.webp" },
                    { name: "NoSQL", desc: "Document databases", img: "img/mongodb.png" },
                ],
            },
            {
                category: "IoT",
                skills: [
                    { name: "Basics of electronics", desc: "Fundamental electronics and circuit knowledge", img: "" },
                    { name: "C++", desc: "Programming language for microcontrollers", img: "img/cpp.png" },
                    { name: "Arduino & ESP32", desc: "Microcontrollers", img: "img/espressif-systems-logo.png" },
                    { name: "PlatformIO", desc: "IoT development environment", img: "img/platformio.png" },
                ],
            },
            {
                category: "DevOps & CI",
                skills: [
                    { name: "Docker", desc: "Container Platform", img: "img/Docker.png" },
                    { name: "Github-actions", desc: "Automated CI/CD workflows", img: "img/github-logo.png" },
                    { name: "BitBucket", desc: "Automated CI/CD workflows", img: "img/atlassian-bitbucket-icon.webp" },
                    { name: "Jira", desc: "Project management tool", img: "img/atlassian-jira-icon.webp" },
                    { name: "Bruno", desc: "API testing tool", img: "img/bruno.png" }
                ],
            },
            {
                category: "CMS & design",
                skills: [
                    { name: "Wordpress", desc: "Content management system", img: "img/wordPress.png" },
                    { name: "Figma", desc: "UI/UX design tool", img: "img/figma-icon.webp" },
                    { name: "Canva", desc: "Graphic design tool", img: "img/canva-logo.png" },

                ],
            },
             {
                category: "Ai & LLMs",
                skills: [
                    { name: "Codex", desc: "AI code generation tool", img: "img/codex-logo.svg" },
                    { name: "Claude Code", desc: "AI code generation tool", img: "img/claude-ai-icon.webp" },
                    { name: "Obsidian", desc: "Knowledge management tool", img: "img/2023_Obsidian_logo.webp" },
                ],
            },
        ];

        const SkillContainer = document.getElementById('skills');
        if (!SkillContainer) return;

        const fragment = document.createDocumentFragment();
        SkillGroups.forEach(group => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('skill-category');

            const heading = document.createElement('h4');
            heading.classList.add('skill-category-title');
            heading.textContent = group.category;
            categoryDiv.appendChild(heading);

            const groupGrid = document.createElement('div');
            groupGrid.classList.add('skill-group');
            group.skills.forEach(skill => {
                groupGrid.appendChild(this.ConstructSkill(skill));
            });
            categoryDiv.appendChild(groupGrid);

            fragment.appendChild(categoryDiv);
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