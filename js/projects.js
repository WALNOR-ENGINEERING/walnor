fetch('../data/projects-en.json')
    .then(response => response.json())
    .then(data => {

        const container = document.getElementById('projects-container');

        data.forEach(project => {

            const card = document.createElement('div');
            card.classList.add('project-card');

            card.innerHTML = `
                <img src="${project.image}">

                <div style="padding:20px;">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>

                    <br>

                    <a href="${project.github}" target="_blank" class="primary-button">
                        View Repository
                    </a>
                </div>
            `;

            container.appendChild(card);
        });

    });
