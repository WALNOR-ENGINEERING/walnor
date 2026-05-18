// Načtení dat z JSON souboru
fetch('../data/projects-en.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('projects-container');
        if (!container) return;

        // Projdeme každý projekt v JSONu
        data.forEach(project => {
            const projectWrapper = document.createElement('div');
            projectWrapper.classList.add('project'); // Naše hlavní třída z design systému

            // Vygenerujeme vnitřní strukturu pro harmoniku
            projectWrapper.innerHTML = `
                <div class="project-header">
                    <img src="${project.image}" alt="${project.title}">
                    <div>
                        <h3>${project.title}</h3>
                        <p class="muted" style="font-size: 14px; margin-top: 4px;">Click to expand project details</p>
                    </div>
                </div>
                <div class="project-body">
                    <p>${project.description}</p>
                    
                    <div style="margin-top: 24px;">
                        <a href="${project.github}" target="_blank" class="primary-button">
                            View Repository
                        </a>
                    </div>
                </div>
            `;

            // Navážeme klikání přímo při zrodu elementu (řeší asynchronní načítání)
            const header = projectWrapper.querySelector('.project-header');
            header.addEventListener('click', () => {
                // Zavřeme všechny ostatní projekty před otevřením tohoto
                const allProjects = document.querySelectorAll('.project');
                allProjects.forEach(p => {
                    if (p !== projectWrapper) {
                        p.classList.remove('active');
                        const body = p.querySelector('.project-body');
                        if (body) body.style.maxHeight = null;
                    }
                });

                // Přepneme aktivní stav u kliknutého projektu
                const isActive = projectWrapper.classList.toggle('active');
                const currentBody = projectWrapper.querySelector('.project-body');

                // Dynamický výpočet výšky pro dokonale hladkou animaci
                if (isActive && currentBody) {
                    currentBody.style.maxHeight = currentBody.scrollHeight + "px";
                } else if (currentBody) {
                    currentBody.style.maxHeight = null;
                }
            });

            // Vhodíme hotový projekt do kontejneru na stránce
            container.appendChild(projectWrapper);
        });
    })
    .catch(error => {
        console.error('Error loading projects:', error);
    });
