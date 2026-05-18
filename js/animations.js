console.log('WALNOR Animation System Ready');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Nastavení parametrů pro IntersectionObserver
    const observerOptions = {
        root: null,      // Sleduje se vůči výřezu obrazovky (viewportu)
        rootMargin: '0px 0px -80px 0px', // Spustí se o 80px dříve, než prvek dorazí na spodní okraj (působí to přirozeněji)
        threshold: 0.1   // Stačí, aby bylo vidět 10 % prvku, a animace se spustí
    };

    // 2. Definice chování, když prvek vstoupí na obrazovku
    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Pokud prvek vstoupil do zorného pole
            if (entry.isIntersecting) {
                // Přidáme třídu, která v CSS spustí animaci
                entry.target.classList.add('reveal-visible');
                
                // Jakmile se prvek jednou vykreslí, přestaneme ho sledovat (efektivita + výkon)
                observer.unobserve(entry.target.value ?? entry.target);
            }
        });
    }, observerOptions);

    // 3. Výběr prvků, které chceme plynule odhalovat
    // Vybereme nadpisy sekcí, hrdinské texty, karty služeb a projektů
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content > *, .section-title, .service-card, .project, .project-card, footer'
    );

    // Každému prvku dáme základní startovní třídu a zaregistrujeme ho do observeru
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('reveal-prep');
        
        // Drobný inženýrský detail: Pokud je na stránce grid karet vedle sebe, 
        // přidáme jim mírné zpoždění (stagger efekt), aby nenabíhaly mechanicky naráz
        if (element.classList.contains('service-card') || element.classList.contains('project-card')) {
            const delay = (index % 3) * 0.15; // První karta 0s, druhá 0.15s, třetí 0.3s...
            element.style.transitionDelay = `${delay}s`;
        }

        appearanceObserver.observe(element);
    });
});
