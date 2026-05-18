console.log('WALNOR loaded');

function toggleProject(el) {

    const project = el.parentElement;

    const all = document.querySelectorAll(".project");

    all.forEach(p => {

        if (p !== project) {
            p.classList.remove("active");
        }

    });

    project.classList.toggle("active");
}
