// Carrusel de imágenes
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del carrusel
    const carouselContainer = document.getElementById('carouselContainer');
    const items = document.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Crear indicadores del carrusel
    items.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = index === 0 ? 'indicator active' : 'indicator';
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    // Variables para controlar el carrusel
    let currentSlide = 0;
    const maxSlides = items.length;
    
    // Función para actualizar el carrusel
    function goToSlide(slideIndex) {
        // Actualizar clases activas
        items[currentSlide].classList.remove('active');
        indicatorsContainer.children[currentSlide].classList.remove('active');
        
        currentSlide = slideIndex;
        
        items[currentSlide].classList.add('active');
        indicatorsContainer.children[currentSlide].classList.add('active');
    }
    
    // Evento para botón anterior
    prevBtn.addEventListener('click', () => {
        let prevSlide = (currentSlide - 1 + maxSlides) % maxSlides;
        goToSlide(prevSlide);
    });
    
    // Evento para botón siguiente
    nextBtn.addEventListener('click', () => {
        let nextSlide = (currentSlide + 1) % maxSlides;
        goToSlide(nextSlide);
    });
    
    // Auto reproducción
    let slideInterval = setInterval(() => {
        let nextSlide = (currentSlide + 1) % maxSlides;
        goToSlide(nextSlide);
    }, 5000);
    
    // Detener auto reproducción al interactuar con los controles
    const pauseAutoplay = () => {
        clearInterval(slideInterval);
        // Reiniciar después de un tiempo
        setTimeout(() => {
            slideInterval = setInterval(() => {
                let nextSlide = (currentSlide + 1) % maxSlides;
                goToSlide(nextSlide);
            }, 5000);
        }, 10000);
    };
    
    prevBtn.addEventListener('click', pauseAutoplay);
    nextBtn.addEventListener('click', pauseAutoplay);
    indicatorsContainer.addEventListener('click', pauseAutoplay);
    
    // Efectos al pasar por encima de los elementos del carrusel
    const carousel = document.querySelector('.comic-carousel');
    carousel.addEventListener('mouseover', () => {
        items[currentSlide].style.transform = 'scale(1.02) rotateY(0deg)';
    });
    
    carousel.addEventListener('mouseout', () => {
        items[currentSlide].style.transform = 'rotateY(0deg)';
    });
    
    // Efectos de comic al hacer clic en los botones
    const cardButtons = document.querySelectorAll('.card-btn');
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Crear efecto de sonido cómic
            const effects = ['POW!', 'BOOM!', 'WHAM!', 'ZAP!', 'BAM!'];
            const effect = document.createElement('div');
            effect.className = 'comic-effect';
            effect.innerText = effects[Math.floor(Math.random() * effects.length)];
            
            // Posicionar el efecto aleatoriamente cerca del botón
            const rect = this.getBoundingClientRect();
            const randomOffset = Math.random() * 100 - 50;
            effect.style.top = `${rect.top - 100 + randomOffset}px`;
            effect.style.left = `${rect.left + rect.width / 2 + randomOffset}px`;
            
            // Agregar al DOM
            document.body.appendChild(effect);
            
            // Agregar clase de animación al botón
            this.classList.add('shake-animation');
            
            // Eliminar después de la animación
            setTimeout(() => {
                effect.remove();
                this.classList.remove('shake-animation');
            }, 500);
            
            // Abrir el modal para detalles del cómic
            openComicModal(this);
        });
    });
    
    // Modal de detalles
    const modal = document.getElementById('comicModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.querySelector('.modal-close');
    const closeModalBtn = document.getElementById('closeModal');
    
    function openComicModal(button) {
        const card = button.closest('.comic-card');
        const title = card.querySelector('.card-title').innerText;
        const text = card.querySelector('.card-text').innerText;
        const imgSrc = card.querySelector('.card-img').src;

        const modalSection = card.querySelector('.details-list');
        const modalSectionHTML = modalSection ? modalSection.innerHTML : '';
        
        // Crear contenido del modal con una etiqueta style para todos los estilos
        modalContent.innerHTML = `
            <style>
                .modal-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                
                .modal-image-container {
                    padding-left: 25px;
                    flex: 1;
                    min-width: 300px;
                }
                
                .modal-image {
                    width: 90%;
                    border-radius: 5px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
                
                .modal-info-container {
                    flex: 2;
                    min-width: 300px;
                }
                
                .modal-comic-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 2rem;
                    margin-bottom: 15px;
                    color: var(--marvel-red);
                }
                
                .modal-description {
                    color: black;
                    margin-bottom: 20px;
                    line-height: 1.6;
                }
                
                .modal-section {
                    color: black;
                    list-style: none;
                    padding-bottom: 5px;
                }
                
                .modal-section-title {
                    color: black;
                    font-family: 'Oswald', sans-serif;
                    margin-bottom: 10px;
                }
            </style>
            
            <div class="modal-container">
                <div class="modal-image-container">
                    <img src="${imgSrc}" alt="${title}" class="modal-image">
                </div>
                <div class="modal-info-container">
                    <h3 class="modal-comic-title">${title}</h3>
                    <p class="modal-description">${text}</p>
                    
                    <div class="modal-section">
                        <h4 class="modal-section-title">DETALLES:</h4>
                        ${modalSectionHTML}
                    </div>
                </div>
            </div>
        `;
        
        // Mostrar el modal
        modal.classList.add('active');
        
        // Prevenir scroll
        document.body.style.overflow = 'hidden';
    }
    
    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Animaciones al hacer scroll
    const elements = document.querySelectorAll('.comic-card, .character-card, .section-title, .newsletter');
    
    // Función para comprobar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Función para añadir animaciones al hacer scroll
    function handleScrollAnimations() {
        elements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('fade-in-up', 'animated');
            }
        });
    }
    
    // Iniciar animaciones y escuchar eventos de scroll
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('resize', handleScrollAnimations);
    
    // Iniciar animaciones para elementos visibles al cargar
    handleScrollAnimations();
    
    // Efectos de hover en los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            // Crear estrella de impacto
            const star = document.createElement('div');
            star.className = 'impact-star';
            star.style.position = 'absolute';
            star.style.top = '-10px';
            star.style.left = '50%';
            star.style.transform = 'translateX(-50%)';
            star.style.zIndex = '-1';
            star.style.opacity = '0.3';
            
            this.style.position = 'relative';
            this.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 300);
        });
    });
    
    // Inicializar muestras de personajes
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        // Agregar efecto de hover personalizado
        card.addEventListener('mouseover', function() {
            const name = this.querySelector('.character-name').innerText;
            
            // Crear efecto de sonido según el personaje
            let sound;
            switch(name) {
                case 'SPIDER-MAN':
                    sound = 'THWIP!';
                    break;
                case 'GHOST RIDER':
                    sound = 'BURN!';
                    break;
                case 'BLADE':
                    sound = 'SLASH!';
                    break;
                case 'DAREDEVIL':
                    sound = 'RADAR!';
                    break;
                default:
                    sound = 'WHAM!';
            }
            
            // Mostrar el efecto
            const effect = document.createElement('div');
            effect.className = 'comic-effect';
            effect.innerText = sound;
            effect.style.fontSize = '2rem';
            effect.style.opacity = '0.7';
            
            const rect = this.getBoundingClientRect();
            effect.style.top = `${rect.top + 50}px`;
            effect.style.left = `${rect.left + rect.width / 2}px`;
            
            document.body.appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 500);
        });
    });

    // Formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input[type="email"]');
            const email = input.value.trim();
            
            if (email) {
                // Aquí iría la lógica para enviar el email al servidor
                console.log('Email suscrito:', email);
                
                // Mostrar mensaje de éxito
                const effect = document.createElement('div');
                effect.className = 'comic-effect';
                effect.innerText = '¡SUSCRITO!';
                effect.style.fontSize = '3rem';
                effect.style.color = 'var(--marvel-gold)';
                
                const rect = this.getBoundingClientRect();
                effect.style.top = `${rect.top - 50}px`;
                effect.style.left = `${rect.left + rect.width / 2}px`;
                
                document.body.appendChild(effect);
                
                // Limpiar el input
                input.value = '';
                
                setTimeout(() => {
                    effect.remove();
                }, 1500);
            }
        });
    }

    // Inicializar botones de navegación
    const navButtons = {
        'navHome': '#',
        'navComics': '#content-section',
        'navCharacters': '#character-section',
        'navMovies': '#',
        'navNews': '#newsletter',
        'navContact': '#footer'
    };
    
    for (const [id, href] of Object.entries(navButtons)) {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Efectos de clic
                const effect = document.createElement('div');
                effect.className = 'comic-effect';
                effect.innerText = '¡CLICK!';
                effect.style.fontSize = '2rem';
                
                const rect = this.getBoundingClientRect();
                effect.style.top = `${rect.top - 30}px`;
                effect.style.left = `${rect.left + rect.width / 2}px`;
                
                document.body.appendChild(effect);
                
                setTimeout(() => {
                    effect.remove();
                }, 500);
                
                // Navegar a la sección correspondiente
                if (href !== '#') {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Si es el home, ir al principio
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }

    // Funcionalidad para los enlaces del footer
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple alerta para demostrar la funcionalidad
            alert(`Has hecho clic en: ${this.textContent}`);
        });
    });

    // Funcionalidad para los iconos sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto al hacer clic
            this.classList.add('shake-animation');
            
            setTimeout(() => {
                this.classList.remove('shake-animation');
            }, 500);
            
            // Alerta para demostrar la funcionalidad
            alert(`Siguiendo en redes sociales: ${this.textContent}`);
        });
    });

    // Detectar teclas para navegar por el carrusel
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Habilitar eventos táctiles para el carrusel en dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Deslizar a la izquierda (siguiente)
            nextBtn.click();
        } else if (touchEndX > touchStartX + 50) {
            // Deslizar a la derecha (anterior)
            prevBtn.click();
        }
    }
});