console.log('WALNOR Animation System Ready');

document.addEventListener('DOMContentLoaded', () => {
    // Okamžitě oznámíme CSS, že JS funguje a může se začít schovávat pro animace
    document.body.classList.add('js-enabled');

    // Výběr prvků, které chceme plynule odhalovat
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .section-title, .service-card, .project, .project-card, .process-step, .form-group, footer'
    );

    // Záchranná brzda: Pokud prohlížeč nepodporuje IntersectionObserver, končíme a necháváme vše viditelné
    if (!('IntersectionObserver' in window)) {
        return;
    }

    // Nastavení parametrů pro IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px', // Spustí se kousek před nahlédnutím do viewportu
        threshold: 0.05
    };

    // Definice chování při vstupu na obrazovku
    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Přidáme třídu, která prvek zviditelní
                entry.target.classList.add('reveal-visible');
                // Přestaneme prvek sledovat, máme hotovo
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Příprava prvků a spuštění sledování
    elementsToAnimate.forEach((element, index) => {
        if (!element.classList.contains('reveal-prep')) {
            element.classList.add('reveal-prep');
        }
        
        // Stagger efekt (postupné načítání karet vedle sebe)
        if (element.classList.contains('service-card') || element.classList.contains('project-card') || element.classList.contains('process-step')) {
            const delay = (index % 4) * 0.12;
            element.style.transitionDelay = `${delay}s`;
        }

        // Začneme prvek sledovat
        appearanceObserver.observe(element);
    });
});
