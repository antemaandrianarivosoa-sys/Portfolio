// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== LOADING SCREEN ====================
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
        }, 1500);
    });

    // ==================== PARTICULES ANIMÉES ====================
    const particlesContainer = document.getElementById('particles');
    
    function createParticles() {
        // Créer 50 particules
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Position aléatoire
            particle.style.left = Math.random() * 100 + '%';
            
            // Délai d'animation aléatoire
            particle.style.animationDelay = Math.random() * 15 + 's';
            
            // Durée d'animation variable
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            
            // Taille variable
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Couleur aléatoire (cyan, rose, ou violet)
            const colors = ['#00f3ff', '#ff00ff', '#b300ff'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // ==================== NAVIGATION DOUCE ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== EFFET PARALLAX ====================
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.bg-grid');
                if (parallax) {
                    parallax.style.transform = `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ==================== EFFET GLITCH ALÉATOIRE ====================
    const logo = document.querySelector('.logo');
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            // Appliquer un effet glitch aléatoire
            const x1 = Math.random() * 10 - 5;
            const y1 = Math.random() * 10 - 5;
            const x2 = Math.random() * 10 - 5;
            const y2 = Math.random() * 10 - 5;
            
            logo.style.textShadow = `
                ${x1}px ${y1}px 0px #ff00ff,
                ${x2}px ${y2}px 0px #00f3ff
            `;
            
            setTimeout(() => {
                logo.style.textShadow = '0 0 20px var(--neon-cyan)';
            }, 100);
        }
    }, 2000);

    // ==================== ANIMATION AU SCROLL ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Sélectionner les éléments à animer
    const animatedElements = document.querySelectorAll(
        '.info-card, .skill-card, .timeline-item, .passion-card, .contact-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // ==================== EFFET TYPING POUR LE SOUS-TITRE ====================
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Démarrer l'effet typing après le loading
        setTimeout(typeWriter, 2000);
    }

    // ==================== COMPTEUR ANIMÉ POUR LES COMPÉTENCES ====================
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                    skillsObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => skillsObserver.observe(bar));
    }
    
    animateSkillBars();

    // ==================== EFFET SONORE AU SURVOL (Optionnel) ====================
    // Décommentez si vous voulez ajouter des sons
    
    /*
    const hoverSound = new Audio('assets/hover.mp3');
    hoverSound.volume = 0.1;
    
    document.querySelectorAll('.btn, .nav-links a').forEach(el => {
        el.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => console.log('Audio play failed'));
        });
    });
    */

    console.log('🎮 Portfolio Gaming chargé avec succès!');
    console.log('👤 Antema Fiderana - L1 DA2I EMIT');
});
