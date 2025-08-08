
        // Theme Toggle
        const themeToggleBtns = document.querySelectorAll('.theme-toggle, .theme-toggle-btn');
        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.classList.toggle('dark');
                
                // Save preference to localStorage
                const isDark = document.body.classList.contains('dark');
                localStorage.setItem('darkMode', isDark);
            });
        });
        
        // Check for saved theme preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark');
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        }
        
        // Mobile Menu
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenuButton.querySelector('i').classList.remove('fa-times');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
            });
        });
        
        // Navigation Active State
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function updateActiveNav() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav();
        
        // Scroll Animation
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Parallax Effect
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            
            sections.forEach(section => {
                const bg = section.querySelector('.section-bg');
                if (bg) {
                    const speed = 0.3;
                    const yPos = -(scrollPosition * speed);
                    bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
        });
        
        // Download button functionality
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const wallpaperCard = btn.closest('.wallpaper-card');
                const img = wallpaperCard.querySelector('.wallpaper-img');
                const imgUrl = img.src;
                
                // Create a temporary link to trigger download
                const link = document.createElement('a');
                link.href = imgUrl;
                link.download = 'wallpaper.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show download confirmation
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-download"></i>';
                }, 2000);
            });
        });