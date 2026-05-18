console.log('WALNOR Language System Ready');

// 1. FUNKCE PRO RUČNÍ VÝBĚR JAZYKA (Spustí se po kliknutí na tlačítko)
function setLanguage(lang) {
    // Uložíme vybraný jazyk do paměti prohlížeče
    localStorage.setItem('walnor_lang', lang);
    
    // Přesměrujeme uživatele do příslušné složky
    if (lang === 'cs') {
        window.location.href = './cs/index.html';
    } else {
        window.location.href = './en/index.html';
    }
}

// 2. AUTOMATICKÁ DETEKCE (Spustí se hned při načtení stránky rozcestníku)
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('walnor_lang');
    
    // Pokud už uživatel na webu byl a vybral si jazyk, přesměrujeme ho rovnou
    if (savedLang === 'cs') {
        window.location.href = './cs/index.html';
    } else if (savedLang === 'en') {
        window.location.href = './en/index.html';
    }
    // Pokud jazyk vybraný nemá, skript neudělá nic a uživatel uvidí tvůj krásný rozcestník
});
