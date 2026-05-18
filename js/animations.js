console.log('WALNOR Animation System Ready');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Výběr prvků, které chceme plynule odhalovat
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .section-title, .service-card, .project, .project-card, .process-step, .form-group, footer'
    );

    // Záchranná brzda: Pokud prohlížeč nepodporuje IntersectionObserver, web hned normálně zobrazíme
    if (!('IntersectionObserver' in window)) {
        elementsToAnimate.forEach(el => el.classList.remove('reveal-prep'));
        return;
    }

    // 2. Nastavení parametrů pro IntersectionObserver
    const observerOptions = {
        root: null,      // Sleduje se vůči výřezu obrazovky (viewportu)
        rootMargin: '0px 0px -60px 0px', // Spustí se o 60px dříve, než prvek dorazí na spodní okraj
        threshold: 0.05   // Stačí, aby bylo vidět 5 % prvku, a okamžitě se spustí animace
    };

    // 3. Definice chování, když prvek vstoupí na obrazovku
    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Přidáme třídu, která v CSS spustí animaci
                entry.target.classList.add('reveal-visible');
                
                // OPRAVENO: Čisté a bezpečné odhlášení prvku ze sledování
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Příprava prvků a spuštění sledování
    elementsToAnimate.forEach((element, index) => {
        // Pokud prvek ještě nemá třídu reveal-prep z HTML, bezpečně ji přidáme
        if (!element.classList.contains('reveal-prep')) {
            element.classList.add('reveal-prep');
        }
        
        // Stagger efekt (postupné nabíhání karet vedle sebe)
        if (element.classList.contains('service-card') || element.classList.contains('project-card') || element.classList.contains('process-step')) {
            const delay = (index % 4) * 0.12; // Jemné rozestupy 0s, 0.12s, 0.24s...
            element.style.transitionDelay = `${delay}s`;
        }

        // Začneme prvek sledovat
        appearanceObserver.observe(element);
    });
});
