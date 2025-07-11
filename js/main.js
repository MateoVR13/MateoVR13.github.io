document.addEventListener('DOMContentLoaded', function () {
    
    // --- 1. LANGUAGE TOGGLE FUNCTIONALITY ---
    const langButtons = document.querySelectorAll('.lang-btn');
    
    function setLanguage(lang) {
        // Update button active state
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Update all elements with data-lang attributes
        const elementsToTranslate = document.querySelectorAll('[data-lang-en], [data-lang-es]');
        elementsToTranslate.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                // Use innerHTML to correctly render tags like <br>
                el.innerHTML = text;
            }
        });
        
        // Save preference to local storage
        localStorage.setItem('preferredLanguage', lang);
    }

    // Set initial language on page load
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(preferredLanguage);

    // Add click listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // --- 2. SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) { // Ensure it's not just "#"
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for fixed nav
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 3. NAVBAR STYLE ON SCROLL ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 4. PROJECT FILTERING ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    card.style.display = 'none'; // Hide all cards first
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                       // Use a fade-in effect
                       card.style.display = 'block';
                       card.classList.add('fade-in');
                    }
                });
            });
        });
    }

    // --- 5. INTERSECTION OBSERVER FOR ANIMATIONS (SKILLS & PROJECTS) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                if (entry.target.classList.contains('skills-section')) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
                // Animate project cards on view
                if (entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe skills section
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        // Prepare skill bars for animation
        skillsSection.querySelectorAll('.skill-progress').forEach(bar => {
            bar.setAttribute('data-width', bar.style.width);
            bar.style.width = '0';
        });
        observer.observe(skillsSection);
    }
    
    // Observe individual project cards for staggered animation
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // --- 6. MOBILE MENU (HAMBURGER) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navRight = document.querySelector('.nav-right');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navRight.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});