document.addEventListener('DOMContentLoaded', function() {
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const mainContent = document.getElementById('main-content');

    const bootLines = [
        'System Booting Process....Initialized',
        'Checking System BIOS...',
        'RAMs: OK',
        'Network Adapters: Detected',
        'Establishing Secure Connection...',
        'Loading Core Modules...',
        'Verifying System Integrity...',
        'Starting Essential Services...',
        'Optimizing Performance...',
        'Accessing User Profile...',
        'Boot Sequence Complete.',
        'Welcome to yueplush.com!'
    ];

    let lineIndex = 0;

    function displayLine() {
        if (lineIndex < bootLines.length) {
            bootText.innerHTML += bootLines[lineIndex] + '\n';
            bootText.setAttribute('data-text', bootText.textContent); // Update data-text for chromatic aberration
            lineIndex++;
            setTimeout(displayLine, 200); // Adjust delay between lines (e.g., 200ms)
        } else {
            // All lines displayed, proceed to fade out
            setTimeout(() => {
                bootScreen.classList.add('boot-fade-out');
                bootScreen.addEventListener('transitionend', () => {
                    bootScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.classList.add('main-fade-in'); // Add fade-in class
                    mainContent.classList.add('main-glitch-effect'); // Add glitch effect
                    setTimeout(() => {
                        mainContent.classList.remove('main-glitch-effect');
                    }, 500); // Remove glitch effect after 0.5 seconds
                    initializePage();
                }, { once: true });
            }, 1000); // Delay before fade-out starts (1000ms)
        }
    }

    // Initial call to start displaying lines
    displayLine();

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