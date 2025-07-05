document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    const agreeCheckbox = document.getElementById('agree');
    const aliasButtons = document.querySelectorAll('.alias-button');
    const myArtPortfolioButton = document.querySelector('.alias-button[data-alias="suggestive-artist"]');
    const virtualNatureCareButton = document.querySelector('.alias-button[data-alias="virtual-nature-care"]');
    const myArtPortfolioContent = document.getElementById('suggestive-artist-content');
    const virtualNatureCareContent = document.getElementById('virtual-nature-care-content');

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
            myArtPortfolioContent.classList.remove('hidden');
            myArtPortfolioContent.scrollIntoView({ behavior: 'smooth' });
        }
    });

    virtualNatureCareButton.addEventListener('click', function() {
        virtualNatureCareContent.classList.remove('hidden');
        virtualNatureCareContent.scrollIntoView({ behavior: 'smooth' });
    });

    function enableMyArtPortfolioButton() {
        myArtPortfolioButton.disabled = false;
    }

    function disableMyArtPortfolioButton() {
        myArtPortfolioButton.disabled = true;
        myArtPortfolioContent.classList.add('hidden'); // Hide content if terms are unchecked
    }
});