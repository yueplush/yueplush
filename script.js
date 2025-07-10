document.addEventListener('DOMContentLoaded', function() {
    // Existing particles.js initialization
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // Cursor trail effect
    const trailCount = 35; // Increased number of trail elements for a smoother effect
    const trails = [];
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: -10,
            y: -10
        });
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
            
            // Spring-like motion
            const speed = 0.3;
            const distanceX = prevX - trail.x;
            const distanceY = prevY - trail.y;

            trail.x += distanceX * speed;
            trail.y += distanceY * speed;
            
            element.style.left = `${trail.x}px`;
            element.style.top = `${trail.y}px`;
            
            // Opacity and scale decay
            const decay = (trails.length - index) / trails.length;
            element.style.opacity = decay * 0.8; // Adjust opacity for a softer look
            element.style.transform = `translate(-50%, -50%) scale(${decay})`;

            prevX = trail.x;
            prevY = trail.y;
        });

        requestAnimationFrame(animateTrails);
    }

    animateTrails();


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
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Check if terms were already agreed upon in the session
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
            event.preventDefault(); // Prevent default link behavior
            alert('Please agree to the Terms of Service to access this content.');
        } else {
            window.open('https://yueplushart.carrd.co/', '_blank'); // Open Carrd link in new tab
        }
    });

    virtualNatureCareButton.addEventListener('click', function() {
        window.open('http://virtualnaturecare.carrd.co/', '_blank'); // Open Carrd link in new tab
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
            // Delay hiding to allow for transition
            setTimeout(() => {
                profileDetails.classList.add('hidden');
            }, 500); // Match transition duration
            toggleProfileButton.textContent = 'Show Profile';
        }
    });
});