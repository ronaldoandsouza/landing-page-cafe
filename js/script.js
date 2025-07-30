// console.log("Script.js carregado com sucesso!"); // Pode manter este para depuração inicial

// --- Rolagem Suave (Smooth Scroll) ---
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView(); // A animação é feita pelo CSS (scroll-behavior: smooth)
        } else {
            console.warn(`Elemento com ID '${targetId}' não encontrado.`);
        }
    });
});

// --- Validação de Formulário ---
console.log("Tentando selecionar o formulário...");
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    console.log("Formulário encontrado!", contactForm);
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        console.log("Evento de submit interceptado!");

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const planSelect = document.getElementById('plan-select');

        console.log("Valores dos campos:", {
            name: nameInput ? nameInput.value : 'N/A',
            email: emailInput ? emailInput.value : 'N/A',
            plan: planSelect ? planSelect.value : 'N/A'
        });

        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        let isValid = true;

        if (!nameInput || nameInput.value.trim() === '') {
            console.log("Erro: Nome vazio.");
            displayErrorMessage(nameInput, 'Por favor, digite seu nome.');
            isValid = false;
        }

        if (!emailInput || emailInput.value.trim() === '') {
            console.log("Erro: Email vazio.");
            displayErrorMessage(emailInput, 'Por favor, digite seu email.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            console.log("Erro: Email inválido.");
            displayErrorMessage(emailInput, 'Por favor, digite um email válido.');
            isValid = false;
        }

        if (!planSelect || planSelect.value === '') {
            console.log("Erro: Plano não selecionado.");
            displayErrorMessage(planSelect, 'Por favor, selecione um plano.');
            isValid = false;
        }

        if (isValid) {
            console.log("Formulário válido. Exibindo alerta de sucesso.");
            alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        } else {
            console.log("Formulário inválido. Mensagens de erro exibidas.");
        }
    });

    function displayErrorMessage(inputElement, message) {
        if (!inputElement) return; // Garante que o elemento exista antes de manipular
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '0.9em';
        errorMessage.style.marginTop = '5px';
        errorMessage.textContent = message;
        inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
} else {
    console.warn("Elemento '.contact-form' não encontrado. Verifique o HTML ou o carregamento do script.");
}

// --- Carrossel de Depoimentos ---
const carouselContainer = document.querySelector('.carousel-container');
const carousel = document.querySelector('.testimonials-carousel');
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');
const testimonialCards = document.querySelectorAll('.testimonial-card');

let currentIndex = 0; // Índice do depoimento atual
const totalCards = testimonialCards.length; // Quantidade total de depoimentos

// Função para atualizar a posição do carrossel
function updateCarousel() {
    // Calcula o quanto o carrossel deve se mover para a esquerda
    // Ex: Se currentIndex for 1, ele move -100% para a esquerda
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Evento para o botão "Anterior"
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalCards - 1 : currentIndex - 1;
        updateCarousel();
    });
}

// Evento para o botão "Próximo"
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === totalCards - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });
}

// Opcional: Auto-play do carrossel
let autoPlayInterval;

function startAutoPlay() {
    // Limpa qualquer intervalo existente para evitar múltiplos
    clearInterval(autoPlayInterval); 
    autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex === totalCards - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }, 5000); // Muda a cada 5 segundos (5000 milissegundos)
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Inicia o auto-play quando a página carrega
// Verifica se o carrossel existe antes de tentar iniciar
if (carouselContainer) { 
    startAutoPlay();

    // Pausa o auto-play ao passar o mouse sobre o carrossel
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
} else {
    console.warn("Elemento '.carousel-container' não encontrado. Carrossel não inicializado.");
}