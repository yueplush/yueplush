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
        const currentPage = document.querySelector('.page-section:not(.hidden)');
        const nextPage = document.getElementById(targetId);

        if (currentPage && nextPage && currentPage.id !== targetId) {
            currentPage.classList.add('fade-out');
            currentPage.addEventListener('animationend', () => {
                currentPage.classList.add('hidden');
                currentPage.classList.remove('fade-out');

                nextPage.classList.remove('hidden');
                nextPage.classList.add('fade-in');
            }, { once: true });
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

    // Hamburger menu functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    const body = document.body; // Get the body element

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open'); // Toggle body scroll
        });

        // Close menu when a nav link is clicked (for mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    body.classList.remove('menu-open'); // Re-enable body scroll
                }
            });
        });
    }
});