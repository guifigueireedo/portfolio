document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Menu Mobile Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 2. Scroll Reveal Animation (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => scrollObserver.observe(el));

    // --- 3. Navbar Active State no Scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // -150 offset para considerar o header fixo
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    console.log("Portfólio carregado com sucesso. Bem-vindo!");

    // --- ALTERAÇÃO 5: Movimento Suave do Mouse (Lerp) ---
    const hero = document.querySelector('.hero-section');
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Rastreia a posição real do mouse na janela inteira para consistência
    window.addEventListener('mousemove', (e) => {
        // Ajusta a posição relativa à hero section se necessário, 
        // mas para o efeito spotlight global, clientX/Y funciona bem.
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Função de animação com suavização (Linear Interpolation - Lerp)
    function animateSpotlight() {
        const ease = 0.1; // Quanto menor, mais suave (e lento) o atraso. Tente 0.05 a 0.2.
        
        // Calcula a nova posição aproximando-se do destino
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;

        // Aplica as variáveis CSS com a posição suavizada
        hero.style.setProperty('--mouse-x', `${currentX}px`);
        hero.style.setProperty('--mouse-y', `${currentY}px`);

        // Continua o loop de animação
        requestAnimationFrame(animateSpotlight);
    }
    
    // Inicia a animação
    animateSpotlight();


    // --- ALTERAÇÃO 2: Efeito de Digitação Alternada ---
    const typingElement = document.getElementById('typing-greeting');
    const phrases = ["Olá, mundo! Me chamo:", "É um prazer ter você aqui!"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Velocidade normal de digitação

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Apagando
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Apaga mais rápido
        } else {
            // Digitando
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Velocidade normal
        }

        // Se terminou de digitar a frase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pausa longa antes de começar a apagar
        } 
        // Se terminou de apagar a frase
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Alterna para a próxima frase
            typingSpeed = 500; // Pausa curta antes de começar a digitar a próxima
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Inicia o efeito de digitação se o elemento existir
    if(typingElement) {
        typeEffect();
    }

    document.addEventListener('click', (e) => {
        // Lista de elementos que NÃO devem disparar a inversão ao serem clicados
        const clickableElements = e.target.closest('a, button, input, textarea, .menu-toggle, .nav-social-icons');
        
        // Se o clique NÃO foi em um elemento interativo
        if (!clickableElements) {
            document.body.classList.toggle('colors-inverted');
            
            // Opcional: Adicionar um efeito sonoro ou visual extra aqui
            console.log('Cores invertidas!'); 
        }
    });
});