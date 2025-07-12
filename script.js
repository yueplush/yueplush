document.addEventListener('DOMContentLoaded', function() {
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const mainContent = document.getElementById('main-content');

    const bootLines = [
        'System_booting_process....',
        'Initializing kernel...',
        'Loading drivers...',
        'Checking file systems...',
        'Mounting local file systems...',
        'Starting services...',
        'Network interface detected.',
        'IP address assigned: 192.168.1.101',
        'System boot successful.',
        'Welcome to yueplush.com!',
        'Loading user profile...',
        'Finalizing setup...',
        'Boot sequence complete.',
    ];

    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < bootLines.length) {
            bootText.innerHTML += bootLines[lineIndex] + '\n';
            lineIndex++;
            setTimeout(typeLine, Math.random() * 200 + 50);
        } else {
            setTimeout(() => {
                bootScreen.style.display = 'none';
                mainContent.style.display = 'block';
                mainContent.classList.add('main-fade-in'); // Add fade-in class
                // Initialize other functionalities after the boot screen
                initializePage();
            }, 1000);
        }
    }

    typeLine();

    function initializePage() {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('particles.js loaded - callback');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        const pageSections = document.querySelectorAll('.page-section');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                switchPage(targetId);

                navLinks.forEach(navLink => navLink.classList.remove('active-link'));
                this.classList.add('active-link');
            });
        });

        function switchPage(targetId) {
            const currentPage = document.querySelector('.page-section:not(.hidden)');
            const nextPage = document.getElementById(targetId);

            if (currentPage && nextPage && currentPage.id !== targetId) {
                currentPage.classList.add('hidden');
                nextPage.classList.remove('hidden');
            }
        }

        const fadeInElements = document.querySelectorAll('.fade-in');
        const agreeCheckbox = document.getElementById('agree');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeInElements.forEach(element => {
            observer.observe(element);
        });

        if (sessionStorage.getItem('termsAgreed') === 'true') {
            agreeCheckbox.checked = true;
            enableArtPortfolioContent();
        }

        agreeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                sessionStorage.setItem('termsAgreed', 'true');
                enableArtPortfolioContent();
            } else {
                sessionStorage.setItem('termsAgreed', 'false');
                disableArtPortfolioContent();
            }
        });

        function enableArtPortfolioContent() {
            const suggestiveContent = document.getElementById('suggestive-artist-content');
            if(suggestiveContent) suggestiveContent.classList.remove('hidden');
        }

        function disableArtPortfolioContent() {
            const suggestiveContent = document.getElementById('suggestive-artist-content');
            if(suggestiveContent) suggestiveContent.classList.add('hidden');
        }

        const toggleProfileButton = document.getElementById('toggle-profile');
        const profileDetails = document.getElementById('profile-details');

        toggleProfileButton.addEventListener('click', function() {
            const isHidden = profileDetails.classList.contains('hidden');
            if (isHidden) {
                profileDetails.classList.remove('hidden');
                profileDetails.classList.add('show');
                toggleProfileButton.textContent = 'Hide Profile';
            } else {
                profileDetails.classList.remove('show');
                setTimeout(() => {
                    profileDetails.classList.add('hidden');
                }, 500);
                toggleProfileButton.textContent = 'Show Profile';
            }
        });

        const hamburgerMenu = document.getElementById('hamburger-menu');
        const mainNav = document.getElementById('main-nav');
        const mainNavigationContainer = document.getElementById('main-navigation-container');

        if (hamburgerMenu && mainNavigationContainer) {
            hamburgerMenu.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                });
            });
        }
    }
});