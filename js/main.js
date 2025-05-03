// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Animación de scroll suave para los enlaces de navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Efecto de scroll para la barra de navegación
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '8px 20px';
        } else {
            nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '10px 20px';
        }
    });

    // Funcionalidad de filtro para los proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Añadir clase active al botón pulsado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filtrar los proyectos
            projectCards.forEach(card => {
                // Primero escondemos todos los cards con animación
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                        // Reactivamos la animación
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    function animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    const projectsSection = document.querySelector('.projects-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectCards();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (projectsSection) {
        observer.observe(projectsSection);
    }

    const contactBtn = document.querySelector('.contact-btn');

    if (contactBtn) {
        contactBtn.addEventListener('mouseenter', function () {
            this.style.letterSpacing = '1px';
        });

        contactBtn.addEventListener('mouseleave', function () {
            this.style.letterSpacing = 'normal';
        });
    }
});

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded, initializing language toggle...");

    // Get all language selector buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log("Found language buttons:", langButtons.length);

    // Function to set active language
    function setActiveLanguage(lang) {
        console.log("Setting active language to:", lang);

        // Update buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update content blocks
        document.querySelectorAll('.lang-content').forEach(content => {
            if (content.getAttribute('data-lang') === lang) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Update individual text elements
        document.querySelectorAll('.lang-text').forEach(text => {
            if (text.getAttribute('data-lang') === lang) {
                text.classList.add('active');
            } else {
                text.classList.remove('active');
            }
        });
    }

    // Set click handlers for language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            setActiveLanguage(lang);
        });
    });

    // Set default language to English on page load
    setActiveLanguage('en');

    // Animación para las barras de progreso de habilidades
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';

            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }

    // Iniciar animación de habilidades cuando se vea la sección
    const skillsSection = document.querySelector('.skills-section');

    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(skillsSection);
    }
    // Animación de scroll suave para los enlaces de navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Efecto de scroll para la barra de navegación
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '8px 20px';
        } else {
            nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '10px 20px';
        }
    });

    // Funcionalidad de filtro para los proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Añadir clase active al botón pulsado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filtrar los proyectos
            projectCards.forEach(card => {
                // Primero escondemos todos los cards con animación
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                        // Reactivamos la animación
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Animación de entrada para los project cards al cargar la página
    function animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // Detectar cuando la sección de proyectos está en el viewport
    const projectsSection = document.querySelector('.projects-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectCards();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (projectsSection) {
        observer.observe(projectsSection);
    }

    // Efecto hover adicional para el botón de contacto
    const contactBtn = document.querySelector('.contact-btn');

    if (contactBtn) {
        contactBtn.addEventListener('mouseenter', function () {
            this.style.letterSpacing = '1px';
        });

        contactBtn.addEventListener('mouseleave', function () {
            this.style.letterSpacing = 'normal';
        });
    }
});