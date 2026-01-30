// Main JavaScript for Lion King Birthday Landing Page

document.addEventListener('DOMContentLoaded', function () {

    // Preloader functionality
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    const enterButton = document.getElementById('enterButton');

    // Enter button click event
    enterButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        preloader.classList.add('fade-out');

        setTimeout(() => {
            preloader.style.display = 'none';
            mainContent.classList.add('show');

            // Initialize all components after entrance
            initializeComponents();

            // Ensure we're at the top of the page
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        }, 1000);
    });

    // Auto-enter after 15 seconds (optional)
    setTimeout(() => {
        if (preloader.style.display !== 'none') {
            enterButton.click();
        }
    }, 15000);

    function initializeComponents() {
        initializeCountdown();
        initializeCarousel();
        initializeSmoothScroll();
        initializeMap();
        initializeAnimations();
    }

    // Countdown Timer
    function initializeCountdown() {
        // Set the birthday date (you can modify this)
        const birthdayDate = new Date('2026-05-05T18:30:00'); // May 5, 2026 at 18:30

        function updateCountdown() {
            const now = new Date();
            const diff = birthdayDate - now;

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            } else {
                // Birthday has arrived!
                document.querySelector('.countdown').innerHTML = '<div class="birthday-message">🎉 HOJE É O GRANDE DIA! 🎉</div>';
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Image Carousel
    function initializeCarousel() {
        const carousel = document.getElementById('carousel');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = document.getElementById('indicators');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        let currentIndex = 0;
        const slideCount = slides.length;

        // Create indicators
        for (let i = 0; i < slideCount; i++) {
            const indicator = document.createElement('span');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.dataset.slide = i;
            indicator.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(indicator);
        }

        function goToSlide(index) {
            // Remove active class from current slide and indicator
            slides[currentIndex].classList.remove('active');
            indicators.children[currentIndex].classList.remove('active');

            // Update index
            currentIndex = index;

            // Add active class to new slide and indicator
            slides[currentIndex].classList.add('active');
            indicators.children[currentIndex].classList.add('active');
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slideCount;
            goToSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentIndex - 1 + slideCount) % slideCount;
            goToSlide(prevIndex);
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-play
        setInterval(nextSlide, 5000);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
    }

    // Smooth Scrolling
    function initializeSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const scrollDown = document.querySelector('.scroll-down');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        if (scrollDown) {
            scrollDown.addEventListener('click', () => {
                document.querySelector('#gallery').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }

        // Header scroll effect
        const header = document.querySelector('.header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(139, 69, 19, 0.98)';
            } else {
                header.style.background = 'rgba(139, 69, 19, 0.95)';
            }
        });
    }

    // Map Integration
    function initializeMap() {
        const mapPlaceholder = document.getElementById('map');

        // Simulate map loading (in a real scenario, you'd use Google Maps API)
        mapPlaceholder.innerHTML = `
            <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg, #8B4513, #D2691E); color:white; text-align:center; padding:20px;">
                <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3 style="margin-bottom: 15px;">Buffet Kids World</h3>
                <p style="margin-bottom: 20px;">R. Júlio Gaspar, 109 - Maraponga, Fortaleza - CE</p>
                <p style="font-size: 0.9rem; opacity: 0.9;">Clique para ver no Google Maps</p>
                <button onclick="openGoogleMaps()" style="background:#FFD700; color:#8B4513; border:none; padding:10px 20px; border-radius:25px; margin-top:15px; cursor:pointer; font-weight:bold;">
                    Abrir no Maps
                </button>
            </div>
        `;
    }

    // Open Google Maps Street View
    window.openGoogleMaps = function () {
        // Google Maps for R. Júlio Gaspar, 109 - Maraponga, Fortaleza - CE
        window.open(`https://www.google.com/maps/search/?api=1&query=R.+Júlio+Gaspar,+109+-+Maraponga,+Fortaleza+-+CE,+60710-095`, '_blank');
    };

    // Open Uber app with destination
    window.openUber = function () {
        const destination_latitude = -3.7917;
        const destination_longitude = -38.5883;
        const destination_nickname = 'Buffet Infantil Kids World';
        const destination_address = 'R. Júlio Gaspar, 109 - Maraponga, Fortaleza - CE, 60710-095';

        const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${destination_latitude}&dropoff[longitude]=${destination_longitude}&dropoff[nickname]=${encodeURIComponent(destination_nickname)}&dropoff[formatted_address]=${encodeURIComponent(destination_address)}`;
        window.open(uberUrl, '_blank');
    };



    // Scroll Animations
    function initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add small delay to prevent immediate animation on page load
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, 100);
                }
            });
        }, observerOptions);

        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Observe menu categories
        document.querySelectorAll('.menu-category').forEach(category => {
            observer.observe(category);
        });
    }

    // Add animation classes to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.6s ease;
        }
        
        .timeline-item.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .menu-category {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .menu-category.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Form validation for any future contact forms
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        return isValid;
    }

    // Add to calendar functionality
    window.addToCalendar = function () {
        const startDate = new Date('2026-05-05T18:30:00');
        const endDate = new Date('2026-05-05T21:30:00');

        const title = 'Aniversário do Edgar - Rei Leão';
        const location = 'Buffet Kids World - R. Júlio Gaspar, 109';
        const description = 'Festa temática do Rei Leão para o aniversário de Edgar!';

        // Google Calendar link
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}Z/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}Z&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

        window.open(googleCalendarUrl, '_blank');
    };

    // Share functionality
    window.shareEvent = function () {
        if (navigator.share) {
            navigator.share({
                title: 'Festa do Rei Leão - Aniversário do Edgar',
                text: 'Você está convidado para a festa temática do Rei Leão do Edgar!',
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copiado para a área de transferência!');
            });
        }
    };

    // Trigger confetti on special interactions
    document.querySelector('.enter-button').addEventListener('click', window.createConfetti);

    // Play celebration sound (if you have one)
    window.playCelebrationSound = function () {
        // You can add a sound file here
        console.log('🎉 Celebration sound would play here!');
    };

    // Initialize everything
    console.log('🦁 Lion King Birthday Page Loaded Successfully!');
});

// Confetti function (global scope)
function createConfetti() {
    // Create confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(confettiContainer);

    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: ${['#FFD700', '#8B4513', '#FF6B6B', '#4ECDC4', '#45B7D1'][Math.floor(Math.random() * 5)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: -10px;
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
            `;

            confettiContainer.appendChild(confetti);
        }, i * 50);
    }

    // Add CSS for confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Remove confetti container after animation
    setTimeout(() => {
        if (document.body.contains(confettiContainer)) {
            document.body.removeChild(confettiContainer);
        }
        if (document.head.contains(confettiStyle)) {
            document.head.removeChild(confettiStyle);
        }
    }, 5000);
}

// Make confetti function globally available
window.createConfetti = createConfetti;

// Utility functions
window.utils = {
    formatDate: function (date) {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    scrollToTop: function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// PIX Functions
window.copyPixKey = function () {
    const pixKey = document.getElementById('pixKey').textContent;
    navigator.clipboard.writeText(pixKey).then(() => {
        showCopyFeedback('Chave PIX copiada!', 'pixKey');
    });
};



function showCopyFeedback(message, elementId) {
    const element = document.getElementById(elementId);
    const originalText = element.textContent || element.value;

    // Change appearance temporarily
    if (element.tagName === 'SPAN') {
        element.textContent = message;
        element.style.color = '#4CAF50';
    } else {
        element.value = message;
        element.style.borderColor = '#4CAF50';
        element.style.backgroundColor = '#e8f5e8';
    }

    // Reset after 2 seconds
    setTimeout(() => {
        if (element.tagName === 'SPAN') {
            element.textContent = originalText;
            element.style.color = '#333';
        } else {
            element.value = originalText;
            element.style.borderColor = '#ddd';
            element.style.backgroundColor = '#f8f9fa';
        }
    }, 2000);
}

// QR Code Generator (real)
document.getElementById('qrCode').addEventListener('click', function () {
    const qrArea = this;
    const pixKey = document.getElementById('pixKey').textContent;

    // Show loading state
    qrArea.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="color: #8B4513; font-size: 1.2rem; margin-bottom: 15px;">
                <i class="fas fa-spinner fa-spin"></i> Gerando QR Code...
            </div>
        </div>
    `;

    // Small delay to show loading state
    setTimeout(() => {
        try {
            // Clear the area first
            qrArea.innerHTML = '';

            // Create QR Code using QRCode.js library
            new QRCode(qrArea, {
                text: pixKey,
                width: 150,
                height: 150,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            // Add the success message below the QR code
            const successMessage = document.createElement('div');
            successMessage.innerHTML = `
                <div style="margin-top: 15px; text-align: center;">
                    <p style="color: #8B4513; font-weight: 600; margin-bottom: 5px;">QR CODE PIX GERADO!</p>
                    <p style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Chave: ${pixKey}</p>
                    <p style="font-size: 0.85rem; color: #888;">Aponte a câmera do seu celular</p>
                </div>
            `;
            qrArea.appendChild(successMessage);

            // Add confetti effect
            createConfetti();

        } catch (err) {
            console.error('Error generating QR Code:', err);
            qrArea.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #ff4444;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p>Erro ao gerar QR Code</p>
                    <p style="font-size: 0.9rem;">${err.message || 'Tente novamente'}</p>
                </div>
            `;
        }
    }, 800);
});



// Eye following mouse effect
function initEyeFollowing() {
    const lionAnimated = document.querySelector('.lion-animated');
    if (!lionAnimated) return;

    let isFollowing = true;

    // Make lion follow scroll to top-right corner but stay visible
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        if (scrollY > 100 && isFollowing) {
            lionAnimated.style.position = 'fixed';
            lionAnimated.style.top = '20px';
            lionAnimated.style.right = '20px';
            lionAnimated.style.left = 'auto';
            lionAnimated.style.zIndex = '1000';
            lionAnimated.style.opacity = '0.9';
            isFollowing = false;
        } else if (scrollY <= 100 && !isFollowing) {
            lionAnimated.style.position = 'relative';
            lionAnimated.style.top = '';
            lionAnimated.style.right = '';
            lionAnimated.style.zIndex = '';
            lionAnimated.style.opacity = '';
            isFollowing = true;
        }
    });

    // Eye following mouse (if we have eye elements)
    document.addEventListener('mousemove', function (e) {
        const eyes = document.querySelectorAll('.eye-front');
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;

            const deltaX = e.clientX - eyeX;
            const deltaY = e.clientY - eyeY;
            const angle = Math.atan2(deltaY, deltaX);

            const distance = Math.min(5, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 20);
            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;

            eye.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
    });
}

// Initialize eye following
initEyeFollowing();

// Make some functions globally available for inline handlers
window.onload = function () {
    // Any additional initialization
};

