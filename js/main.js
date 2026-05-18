console.log('WALNOR loaded');

function toggleProject(el) {
    // Najdeme hlavní kontejner karty projektu
    const currentProject = el.closest(".project") || el.parentElement;
    const currentBody = currentProject.querySelector(".project-body");
    
    // Najdeme všechny projekty na stránce
    const allProjects = document.querySelectorAll(".project");

    allProjects.forEach(project => {
        // Zavřeme všechny OSTATNÍ projekty
        if (project !== currentProject) {
            project.classList.remove("active");
            const body = project.querySelector(".project-body");
            if (body) {
                body.style.maxHeight = null; // Resetujeme výšku na 0
            }
        }
    });

    // Přepneme aktivní stav u kliknutého projektu
    const isActive = currentProject.classList.toggle("active");

    // Dynamický výpočet výšky pro dokonale plynulou CSS animaci
    if (isActive && currentBody) {
        // scrollHeight vrátí přesnou výšku obsahu v pixelech včetně vnitřních okrajů
        currentBody.style.maxHeight = currentBody.scrollHeight + "px";
    } else if (currentBody) {
        currentBody.style.maxHeight = null;
    }
}
