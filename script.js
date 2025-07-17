document.addEventListener('DOMContentLoaded', function() {
    // Existing particles.js initialization
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // Page navigation
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
        console.log('Attempting to switch to page:', targetId);
        const currentPage = document.querySelector('.page-section:not(.hidden)');
        const nextPage = document.getElementById(targetId);

        if (currentPage) {
            console.log('Current page:', currentPage.id);
        } else {
            console.log('No current page found (or all are hidden).');
        }

        if (nextPage) {
            console.log('Next page:', nextPage.id);
        } else {
            console.log('Next page not found for targetId:', targetId);
        }

        if (currentPage && nextPage && currentPage.id !== targetId) {
            console.log('Switching page from', currentPage.id, 'to', nextPage.id);
            currentPage.classList.add('fade-out');
            currentPage.addEventListener('animationend', () => {
                currentPage.classList.add('hidden');
                currentPage.classList.remove('fade-out');
                console.log('Current page', currentPage.id, 'is now hidden.');

                nextPage.classList.remove('hidden');
                nextPage.classList.add('fade-in');
                console.log('Next page', nextPage.id, 'is now visible.');
            }, { once: true });
        } else if (currentPage && nextPage && currentPage.id === targetId) {
            console.log('Already on target page:', targetId);
        } else {
            console.log('Page switch condition not met. currentPage:', currentPage, 'nextPage:', nextPage, 'targetId:', targetId);
        }
    }


    // Existing code
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

    if (toggleProfileButton && profileDetails) {
        toggleProfileButton.addEventListener('click', function() {
            const isHidden = profileDetails.classList.contains('hidden');
            if (isHidden) {
                profileDetails.classList.remove('hidden');
                profileDetails.style.maxHeight = profileDetails.scrollHeight + 'px';
                toggleProfileButton.textContent = 'Hide Profile';
            } else {
                profileDetails.style.maxHeight = null;
                setTimeout(() => {
                    profileDetails.classList.add('hidden');
                }, 500); // Match transition duration
                toggleProfileButton.textContent = 'Show Profile';
            }
        });
    }

    // Hamburger menu functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav'); // Define mainNav
    const mainNavigationContainer = document.getElementById('main-navigation-container'); // Get the main navigation container

    if (hamburgerMenu && mainNavigationContainer) {
        hamburgerMenu.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Add/remove class to body for scroll control
        });

        // Close menu when a nav link is clicked (for mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open'); // Re-enable body scroll
                }
            });
        });
    }
});