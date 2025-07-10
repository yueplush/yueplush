document.addEventListener('DOMContentLoaded', function() {
    // Existing particles.js initialization
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // Detect touch device
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    if (isTouchDevice) {
        document.body.classList.add('touch');
        createRippleEffect();
    } else {
        document.body.classList.add('no-touch');
        createCursorTrail();
    }

    function createCursorTrail() {
        const trailCount = 35;
        const trails = [];
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'trail';
            document.body.appendChild(trail);
            trails.push({ element: trail, x: -10, y: -10 });
        }

        let mouseX = -10;
        let mouseY = -10;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrails() {
            let prevX = mouseX;
            let prevY = mouseY;

            trails.forEach((trail, index) => {
                const { element } = trail;
                const speed = 0.3;
                const distanceX = prevX - trail.x;
                const distanceY = prevY - trail.y;

                trail.x += distanceX * speed;
                trail.y += distanceY * speed;
                element.style.left = `${trail.x}px`;
                element.style.top = `${trail.y}px`;

                const decay = (trails.length - index) / trails.length;
                element.style.opacity = decay * 0.8;
                element.style.transform = `translate(-50%, -50%) scale(${decay})`;

                prevX = trail.x;
                prevY = trail.y;
            });

            requestAnimationFrame(animateTrails);
        }
        animateTrails();
    }

    function createRippleEffect() {
        // Use 'touchstart' for more immediate feedback on touch devices
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                document.body.appendChild(ripple);

                ripple.style.left = `${touch.clientX}px`;
                ripple.style.top = `${touch.clientY}px`;

                ripple.addEventListener('animationend', () => {
                    ripple.remove();
                });
            }
        });
    }

    // Existing code
    const fadeInElements = document.querySelectorAll('.fade-in');
    const agreeCheckbox = document.getElementById('agree');
    const myArtPortfolioButton = document.querySelector('.alias-button[data-alias="suggestive-artist"]');
    const virtualNatureCareButton = document.querySelector('.alias-button[data-alias="virtual-nature-care"]');

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
        enableMyArtPortfolioButton();
    }

    agreeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            sessionStorage.setItem('termsAgreed', 'true');
            enableMyArtPortfolioButton();
        } else {
            sessionStorage.setItem('termsAgreed', 'false');
            disableMyArtPortfolioButton();
        }
    });

    myArtPortfolioButton.addEventListener('click', function(event) {
        if (!agreeCheckbox.checked) {
            event.preventDefault();
            alert('Please agree to the Terms of Service to access this content.');
        } else {
            window.open('https://yueplushart.carrd.co/', '_blank');
        }
    });

    virtualNatureCareButton.addEventListener('click', function() {
        window.open('http://virtualnaturecare.carrd.co/', '_blank');
    });

    function enableMyArtPortfolioButton() {
        myArtPortfolioButton.disabled = false;
    }

    function disableMyArtPortfolioButton() {
        myArtPortfolioButton.disabled = true;
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
});