console.log('WALNOR Form System Ready');

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        // 1. Zastavíme klasické odeslání a reload stránky
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
        
        // Vytvoříme elementy pro stavové hlášky, pokud ještě neexistují
        let statusMessage = contactForm.querySelector('.form-status');
        if (!statusMessage) {
            statusMessage = document.createElement('div');
            statusMessage.classList.add('form-status');
            statusMessage.style.marginTop = '20px';
            statusMessage.style.padding = '12px 20px';
            statusMessage.style.borderRadius = '8px';
            statusMessage.style.fontSize = '14px';
            statusMessage.style.transition = 'all 0.3s ease';
            contactForm.appendChild(statusMessage);
        }

        // 2. Základní klientská validace
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (emailInput && !validateEmail(emailInput.value)) {
            showStatus(statusMessage, 'Please enter a valid email address.', 'error');
            return;
        }

        // 3. Příprava dat a vizuální zámek tlačítka (Loading stav)
        const formData = new FormData(contactForm);
        const formAction = contactForm.getAttribute('action');

        if (!formAction || formAction === '#' || formAction === '') {
            console.warn('Walnor Form Warning: Missing "action" attribute in HTML form. Simulating success.');
            // Pokud ještě nemáš nasazený backend, nasimulujeme úspěch pro testování designu
            setLoadingState(submitBtn, true, originalBtnText);
            setTimeout(() => {
                setLoadingState(submitBtn, false, originalBtnText);
                showStatus(statusMessage, 'Message simulated successfully! (Add form action url to send for real)', 'success');
                contactForm.reset();
            }, 1200);
            return;
        }

        try {
            setLoadingState(submitBtn, true, originalBtnText);
            showStatus(statusMessage, 'Sending message...', 'info');

            // 4. Samotné asynchronní odeslání dat
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // 5. Zpracování výsledku
            if (response.ok) {
                showStatus(statusMessage, 'Thank you! Your message has been successfully sent.', 'success');
                contactForm.reset(); // Promaže formulář
            } else {
                throw new Error('Form submission failed');
            }

        } catch (error) {
            console.error('Form error:', error);
            showStatus(statusMessage, 'Oops! Something went wrong. Please try again later.', 'error');
        } finally {
            // Uvolníme tlačítko zpět do původního stavu
            setLoadingState(submitBtn, false, originalBtnText);
        }
    });
});

/* --- POMOCNÉ INŽENÝRSKÉ FUNKCE --- */

// Validace formátu e-mailu pomocí regulárního výrazu
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Přepínání stavu tlačítka (loading animace / disabled)
function setLoadingState(button, isLoading, originalText) {
    if (!button) return;
    if (isLoading) {
        button.disabled = true;
        button.style.opacity = '0.7';
        button.innerHTML = `<span class="spinner"></span> Sending...`;
    } else {
        button.disabled = false;
        button.style.opacity = '1';
        button.innerHTML = originalText;
    }
}

// Stylování stavových hlášek na základě výsledku
function showStatus(element, text, type) {
    element.innerHTML = text;
    element.style.display = 'block';
    
    if (type === 'success') {
        element.style.background = 'rgba(79, 209, 197, 0.1)'; // Jemná teal barva (tvůj akcent)
        element.style.border = '1px solid var(--accent, #4fd1c5)';
        element.style.color = 'var(--accent, #4fd1c5)';
    } else if (type === 'error') {
        element.style.background = 'rgba(239, 68, 68, 0.1)'; // Jemná červená
        element.style.border = '1px solid #ef4444';
        element.style.color = '#ef4444';
    } else {
        element.style.background = 'rgba(255, 255, 255, 0.05)';
        element.style.border = '1px solid var(--border, rgba(255,255,255,0.1))';
        element.style.color = 'var(--text-soft)';
    }
}
