document.addEventListener('DOMContentLoaded', function () {
    
    // --- EFECTO INTERACTIVO DE BRILLO EN TARJETAS ---
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', `-250px`);
            card.style.setProperty('--mouse-y', `-250px`);
        });
    });

    // --- FUNCIONALIDAD DE CAMBIO DE IDIOMA ---
    const langButtons = document.querySelectorAll('.lang-btn');
    function setLanguage(lang) {
        langButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-lang') === lang));
        const elementsToTranslate = document.querySelectorAll('[data-lang-en], [data-lang-es]');
        elementsToTranslate.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) el.innerHTML = text;
        });
        localStorage.setItem('preferredLanguage', lang);
    }
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(preferredLanguage);
    langButtons.forEach(button => {
        button.addEventListener('click', function () { setLanguage(this.getAttribute('data-lang')); });
    });

    // --- SCROLL SUAVE PARA ANCLAS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
                }
            }
        });
    });

    // --- ESTILO DE NAVBAR AL HACER SCROLL ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 30);
    });

    // --- FILTRADO DE PROYECTOS CON ANIMACIÓN ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const matchesFilter = filterValue === 'all' || card.classList.contains(filterValue);
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    if (!matchesFilter) {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => card.style.display = 'none', 400);
                    } else {
                        card.style.display = 'block';
                        setTimeout(() => {
                           card.style.opacity = '1';
                           card.style.transform = 'scale(1)';
                        }, 50);
                    }
                });
            });
        });
    }

    // --- INTERSECTION OBSERVER PARA ANIMACIONES DE SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animar barras de habilidad específicamente
                if (entry.target.classList.contains('skills-column')) {
                    const skillLevels = entry.target.querySelectorAll('.skill-level');
                    skillLevels.forEach(level => {
                        const progressBar = level.querySelector('.skill-progress');
                        progressBar.style.width = level.getAttribute('data-progress');
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    // Preparar barras de habilidad para la animación
    document.querySelectorAll('.skill-level').forEach(level => {
        const progressBar = level.querySelector('.skill-progress');
        progressBar.style.width = '0%'; // Inicia en 0 para la animación
    });

    // --- MENÚ MÓVIL (HAMBURGUESA) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navRight = document.querySelector('.nav-right');
    if (menuToggle && navRight) {
        menuToggle.addEventListener('click', () => {
            navRight.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        // Cerrar menú al hacer clic en un enlace (para SPAs o anclas)
        navRight.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navRight.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});