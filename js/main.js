console.log('WALNOR loaded'); // Opraveno velké "C"

function toggleProject(el) {
    // Najdeme hlavní kontejner karty projektu nebo harmoniky
    const currentProject = el.closest(".project") || el.parentElement;
    const currentBody = currentProject.querySelector(".project-body");
    
    // Najdeme všechny projekty/harmoniky na stránce
    const allProjects = document.querySelectorAll(".project");

    allProjects.forEach(project => {
        // Zavřeme všechny OSTATNÍ otevřené panely
        if (project !== currentProject) {
            project.classList.remove("active");
            const body = project.querySelector(".project-body");
            if (body) {
                body.style.maxHeight = null; // Resetujeme výšku
            }
        }
    });

    // Přepneme aktivní stav u aktuálního projektu
    const isActive = currentProject.classList.toggle("active");

    // Dynamický výpočet výšky pro hladký CSS přechod
    if (isActive && currentBody) {
        currentBody.style.maxHeight = currentBody.scrollHeight + "px";
    } else if (currentBody) {
        currentBody.style.maxHeight = null;
    }
}

// AUTOMATIZACE: Pokud na stránce existují statické projekty/FAQ,
// navážeme na jejich hlavičky klikání automaticky bez nutnosti psát onclick="" do HTML
document.addEventListener("DOMContentLoaded", () => {
    const projectHeaders = document.querySelectorAll(".project-header");
    
    projectHeaders.forEach(header => {
        // Spustíme toggle pouze pokud nebyl listener navázán asynchronně v projects.js
        header.addEventListener("click", (e) => {
            // Pokud karta vznikla staticky v HTML, obsloužíme ji odsud
            if (!header.dataset.dynamic) {
                toggleProject(header);
            }
        });
    });
});
