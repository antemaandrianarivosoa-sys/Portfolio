// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== LOADING SCREEN ====================
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
        }, 1500);
    });

    // ==================== GESTION DE LA PHOTO DE PROFIL ====================
    const profileImage = document.getElementById('profileImage');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    
    // Vérifier si l'image charge correctement
    if (profileImage) {
        profileImage.addEventListener('load', function() {
            console.log('✅ Photo de profil chargée avec succès');
            this.style.display = 'block';
            if (profilePlaceholder) profilePlaceholder.style.display = 'none';
        });
        
        profileImage.addEventListener('error', function() {
            console.log('❌ Erreur de chargement de la photo');
            this.style.display = 'none';
            if (profilePlaceholder) profilePlaceholder.style.display = 'flex';
        });
    }

    // ==================== PARTICULES ANIMÉES ====================
    const particlesContainer = document.getElementById('particles');
    
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
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

    const animatedElements = document.querySelectorAll(
        '.info-card, .skill-card, .timeline-item, .passion-card, .contact-card, .cv-card, .cv-preview'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // ==================== EFFET TYPING ====================
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
        
        setTimeout(typeWriter, 2000);
    }

    // ==================== ANIMATION BARRES DE COMPÉTENCES ====================
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

    // ==================== GESTION DU FORMULAIRE DE CONTACT ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Le formulaire utilise mailto:, donc il ouvrira le client mail
            // Mais on peut ajouter une confirmation visuelle
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Ouverture de votre client mail... 📧';
            btn.style.background = 'var(--neon-green)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

// ==================== SECTION CV ====================

document.addEventListener('DOMContentLoaded', function() {
    
    // Animation bouton GitHub
    const githubBtn = document.querySelector('.github-btn');
    
    if (githubBtn) {
        githubBtn.addEventListener('mouseenter', () => {
            githubBtn.style.transform = 'scale(1.05)';
        });
        
        githubBtn.addEventListener('mouseleave', () => {
            githubBtn.style.transform = 'scale(1)';
        });
        
        githubBtn.addEventListener('click', () => {
            console.log('🚀 CV GitHub ouvert');
        });
    }

    // Animation stats au scroll
    const stats = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    stats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.5s ease';
        observer.observe(stat);
    });

    // Gestion iframe CV
    const iframe = document.querySelector('.iframe-container iframe');
    const container = document.querySelector('.iframe-container');
    
    if (iframe && container) {
        iframe.addEventListener('error', () => {
            // Si l'iframe ne charge pas, afficher un message
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #00f3ff; text-align: center;">
                    <span style="font-size: 3rem; margin-bottom: 20px;">🚀</span>
                    <p>CV non disponible en aperçu direct</p>
                    <a href="https://antemaandrianarivosoa-sys.github.io/AntemaCV/" target="_blank" class="btn" style="margin-top: 20px; background: #2ea043; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Voir sur GitHub
                    </a>
                </div>
            `;
        });
    }
});



    // ==================== EFFET HOVER SUR LA PHOTO ====================
    const profileFrame = document.querySelector('.profile-frame');
    if (profileFrame) {
        profileFrame.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        profileFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    console.log('🎮 Portfolio Gaming chargé avec succès!');
    console.log('👤 Antema Fiderana - L1 DA2I EMIT');
    console.log('📧 Contact: antemaandrianarivosoa@gmail.com');
});
