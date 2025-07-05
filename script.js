document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    const agreeCheckbox = document.getElementById('agree');
    const aliasButtons = document.querySelectorAll('.alias-button');
    const suggestiveArtistButton = document.querySelector('.alias-button[data-alias="suggestive-artist"]');
    const virtualNatureCareButton = document.querySelector('.alias-button[data-alias="virtual-nature-care"]');
    const suggestiveArtistContent = document.getElementById('suggestive-artist-content');
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
        enableSuggestiveArtistButton();
    }

    agreeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            sessionStorage.setItem('termsAgreed', 'true');
            enableSuggestiveArtistButton();
        } else {
            sessionStorage.setItem('termsAgreed', 'false');
            disableSuggestiveArtistButton();
        }
    });

    suggestiveArtistButton.addEventListener('click', function(event) {
        if (!agreeCheckbox.checked) {
            event.preventDefault(); // Prevent default link behavior
            alert('Please agree to the Terms of Service to access this content.');
        } else {
            suggestiveArtistContent.classList.remove('hidden');
            suggestiveArtistContent.scrollIntoView({ behavior: 'smooth' });
        }
    });

    virtualNatureCareButton.addEventListener('click', function() {
        virtualNatureCareContent.classList.remove('hidden');
        virtualNatureCareContent.scrollIntoView({ behavior: 'smooth' });
    });

    function enableSuggestiveArtistButton() {
        suggestiveArtistButton.disabled = false;
    }

    function disableSuggestiveArtistButton() {
        suggestiveArtistButton.disabled = true;
        suggestiveArtistContent.classList.add('hidden'); // Hide content if terms are unchecked
    }
});
