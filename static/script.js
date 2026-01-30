// Main JavaScript for Lion King Birthday Landing Page

// Check for guest list first (before any other initialization)
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const guestsParam = urlParams.get('guests');
    const adminParam = urlParams.get('admin');
    const inviteParam = urlParams.get('invite');
    
    // Admin screen
    if (adminParam === 'true') {
        showAdminScreen();
        return;
    }
    
    // Individual guest invitation
    if (inviteParam) {
        showPersonalInvitation(inviteParam);
        return;
    }
    
    // Group guest list
    if (guestsParam) {
        showGuestList(guestsParam);
        return;
    }

    // Normal initialization continues here
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

    // Particle/confetti effect with colorful confetti
    function createEdgarParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);

        // Confetti colors matching the theme
        const colors = ['#FFD700', '#8B4513', '#FFA500', '#CD853F', '#DAA520', '#B8860B'];

        // Confetti shapes
        const shapes = ['rectangle', 'circle', 'triangle'];

        function createParticle() {
            const particle = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Different styles for different shapes
            if (shape === 'rectangle') {
                particle.style.cssText = `
                    position: absolute;
                    width: ${8 + Math.random() * 12}px;
                    height: ${4 + Math.random() * 8}px;
                    background: ${color};
                    opacity: 0.8;
                    animation: fall linear forwards;
                    border-radius: 2px;
                `;
            } else if (shape === 'circle') {
                particle.style.cssText = `
                    position: absolute;
                    width: ${6 + Math.random() * 10}px;
                    height: ${6 + Math.random() * 10}px;
                    background: ${color};
                    opacity: 0.8;
                    animation: fall linear forwards;
                    border-radius: 50%;
                `;
            } else { // triangle
                particle.style.cssText = `
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-left: ${5 + Math.random() * 5}px solid transparent;
                    border-right: ${5 + Math.random() * 5}px solid transparent;
                    border-bottom: ${10 + Math.random() * 10}px solid ${color};
                    opacity: 0.8;
                    animation: fall linear forwards;
                `;
            }

            // Random horizontal position
            const startX = Math.random() * 100;
            particle.style.left = `${startX}%`;
            particle.style.top = '-20px';

            // Random animation duration and delay
            const duration = 3 + Math.random() * 4; // 3-7 seconds
            const delay = Math.random() * 2; // 0-2 seconds delay

            particle.style.animation = `fall ${duration}s linear ${delay}s forwards`;

            particleContainer.appendChild(particle);

            // Remove particle after animation completes
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (duration + delay) * 1000);
        }

        // Create 25-35 particles per burst (more since they're smaller)
        const particleCount = 25 + Math.floor(Math.random() * 11);
        for (let i = 0; i < particleCount; i++) {
            setTimeout(createParticle, i * 80); // Faster stagger for more density
        }
    }

    // Add CSS for particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Start particle effect every 5 seconds
    setInterval(createEdgarParticles, 5000);
    
    // Also trigger particles on special events
    window.createSpecialParticles = function() {
        createEdgarParticles();
    };
    
    // Secret guest list functionality
    function checkForGuestList() {
        const urlParams = new URLSearchParams(window.location.search);
        const guestsParam = urlParams.get('guests');
        
        if (guestsParam) {
            showGuestList(guestsParam);
            return true;
        }
        return false;
    }
    
    // Admin Screen Function
    function showAdminScreen() {
        // Hide main content
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        
        // Hide preloader if visible
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
        
        // Create admin screen
        const adminScreen = document.createElement('div');
        adminScreen.id = 'admin-screen';
        adminScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
        `;
        
        // Header
        const header = document.createElement('div');
        header.innerHTML = `
            <h1 style="color: #FFD700; font-family: 'Dancing Script', cursive; font-size: 2.5rem; margin-bottom: 10px; text-align: center; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                <i class="fas fa-crown"></i> Painel Administrativo <i class="fas fa-crown"></i>
            </h1>
            <p style="color: #FFF8DC; font-size: 1.1rem; margin-bottom: 30px; text-align: center;">
                Cadastro de Convidados - Aniversário do Edgar
            </p>
        `;
        
        // Admin panel container
        const panelContainer = document.createElement('div');
        panelContainer.style.cssText = `
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            max-width: 800px;
            width: 95%;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        `;
        
        // Guest input section
        const inputSection = document.createElement('div');
        inputSection.innerHTML = `
            <h2 style="color: #8B4513; margin-bottom: 20px; text-align: center;">Cadastro de Convidados</h2>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: #8B4513; font-weight: 600;">Nome do Convidado:</label>
                <input type="text" id="guestName" placeholder="Digite o nome completo" 
                       style="width: 100%; padding: 12px; border: 2px solid #DDD; border-radius: 10px; font-size: 1rem; box-sizing: border-box;">
            </div>
            <button id="addGuestBtn" style="
                background: linear-gradient(45deg, #FFD700, #FFA500);
                color: #8B4513;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                margin-right: 15px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            ">Adicionar Convidado</button>
            <button id="generateLinksBtn" style="
                background: linear-gradient(45deg, #8B4513, #A0522D);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            ">Gerar Links</button>
        `;
        
        // Guest list display
        const listContainer = document.createElement('div');
        listContainer.id = 'guestListContainer';
        listContainer.style.cssText = `
            margin-top: 30px;
            max-height: 300px;
            overflow-y: auto;
            border: 2px solid #FFD700;
            border-radius: 15px;
            padding: 15px;
        `;
        
        listContainer.innerHTML = `
            <h3 style="color: #8B4513; margin-bottom: 15px; text-align: center;">Convidados Cadastrados (0)</h3>
            <div id="guestList" style="min-height: 50px;"></div>
        `;
        
        // Generated links section
        const linksContainer = document.createElement('div');
        linksContainer.id = 'linksContainer';
        linksContainer.style.cssText = `
            margin-top: 30px;
            display: none;
        `;
        
        linksContainer.innerHTML = `
            <h3 style="color: #8B4513; margin-bottom: 15px; text-align: center;">Links Gerados</h3>
            <div id="generatedLinks" style="background: #f8f9fa; padding: 20px; border-radius: 10px;"></div>
            <button id="copyAllLinks" style="
                background: #28a745;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                margin-top: 15px;
                display: none;
            ">Copiar Todos os Links</button>
        `;
        
        // Back button
        const backButton = document.createElement('button');
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Voltar para o Site';
        backButton.onclick = function() {
            window.location.href = window.location.origin + window.location.pathname;
        };
        backButton.style.cssText = `
            margin-top: 25px;
            padding: 12px 25px;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: #8B4513;
            border: none;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        
        // Assemble the screen
        panelContainer.appendChild(inputSection);
        panelContainer.appendChild(listContainer);
        panelContainer.appendChild(linksContainer);
        panelContainer.appendChild(backButton);
        
        adminScreen.appendChild(header);
        adminScreen.appendChild(panelContainer);
        
        document.body.appendChild(adminScreen);
        
        // Initialize admin functionality
        initializeAdminFunctionality();
    }
    
    // Initialize admin functionality
    function initializeAdminFunctionality() {
        const guestNameInput = document.getElementById('guestName');
        const addGuestBtn = document.getElementById('addGuestBtn');
        const generateLinksBtn = document.getElementById('generateLinksBtn');
        const guestList = document.getElementById('guestList');
        const generatedLinks = document.getElementById('generatedLinks');
        const linksContainer = document.getElementById('linksContainer');
        const copyAllLinksBtn = document.getElementById('copyAllLinks');
        
        let guests = [];
        
        // Add guest function
        addGuestBtn.addEventListener('click', function() {
            const name = guestNameInput.value.trim();
            if (name) {
                guests.push(name);
                guestNameInput.value = '';
                updateGuestList();
            }
        });
        
        // Generate links function
        generateLinksBtn.addEventListener('click', function() {
            if (guests.length > 0) {
                generateIndividualLinks(guests);
            } else {
                alert('Por favor, adicione pelo menos um convidado!');
            }
        });
        
        // Copy all links function
        copyAllLinksBtn.addEventListener('click', function() {
            const linksText = Array.from(document.querySelectorAll('.individual-link')).map(el => el.textContent).join('\n\n');
            navigator.clipboard.writeText(linksText).then(() => {
                alert('Todos os links foram copiados para a área de transferência!');
            });
        });
        
        // Update guest list display
        function updateGuestList() {
            const title = document.querySelector('#guestListContainer h3');
            title.textContent = `Convidados Cadastrados (${guests.length})`;
            
            if (guests.length === 0) {
                guestList.innerHTML = '<p style="text-align: center; color: #666;">Nenhum convidado cadastrado ainda.</p>';
                return;
            }
            
            guestList.innerHTML = '';
            guests.forEach((guest, index) => {
                const guestItem = document.createElement('div');
                guestItem.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    margin: 8px 0;
                    background: #FFF8DC;
                    border-radius: 8px;
                    border-left: 4px solid #FFD700;
                `;
                
                guestItem.innerHTML = `
                    <span style="font-weight: 500; color: #8B4513;">${index + 1}. ${guest}</span>
                    <button onclick="removeGuest(${index})" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        padding: 5px 10px;
                        border-radius: 15px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">Remover</button>
                `;
                
                guestList.appendChild(guestItem);
            });
        }
        
        // Generate individual links
        function generateIndividualLinks(guestList) {
            generatedLinks.innerHTML = '';
            
            guestList.forEach((guest, index) => {
                const encodedName = encodeURIComponent(guest);
                const link = `${window.location.origin}${window.location.pathname}?invite=${encodedName}`;
                
                const linkDiv = document.createElement('div');
                linkDiv.style.cssText = `
                    background: white;
                    padding: 15px;
                    margin: 15px 0;
                    border-radius: 10px;
                    border: 1px solid #DDD;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                `;
                
                linkDiv.innerHTML = `
                    <div style="font-weight: 600; color: #8B4513; margin-bottom: 8px;">${index + 1}. ${guest}</div>
                    <div class="individual-link" style="
                        background: #f8f9fa;
                        padding: 10px;
                        border-radius: 5px;
                        font-family: monospace;
                        font-size: 0.9rem;
                        word-break: break-all;
                        margin-bottom: 10px;
                    ">${link}</div>
                    <button onclick="copyLink('${link}')" style="
                        background: #17a2b8;
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">Copiar Link</button>
                `;
                
                generatedLinks.appendChild(linkDiv);
            });
            
            linksContainer.style.display = 'block';
            copyAllLinksBtn.style.display = 'block';
        }
        
        // Make functions globally available
        window.removeGuest = function(index) {
            guests.splice(index, 1);
            updateGuestList();
        };
        
        window.copyLink = function(link) {
            navigator.clipboard.writeText(link).then(() => {
                alert('Link copiado para a área de transferência!');
            });
        };
        
        // Initialize with empty list
        updateGuestList();
    }
    
    // Personal Invitation Function
    function showPersonalInvitation(guestName) {
        // Hide main content
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        
        // Hide preloader if visible
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
        
        // Decode guest name
        const decodedName = decodeURIComponent(guestName);
        
        // Create personal invitation screen
        const invitationScreen = document.createElement('div');
        invitationScreen.id = 'personal-invitation';
        invitationScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
            box-sizing: border-box;
            text-align: center;
        `;
        
        invitationScreen.innerHTML = `
            <div style="
                background: rgba(255, 255, 255, 0.95);
                border-radius: 25px;
                padding: 40px;
                max-width: 600px;
                width: 90%;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            ">
                <h1 style="color: #8B4513; font-family: 'Dancing Script', cursive; font-size: 2.8rem; margin-bottom: 20px;">
                    🎉 Convite Especial 🎉
                </h1>
                
                <div style="margin: 30px 0;">
                    <i class="fas fa-crown" style="font-size: 3rem; color: #FFD700; margin-bottom: 20px;"></i>
                    <h2 style="color: #8B4513; font-size: 2rem; margin: 20px 0;">Olá, ${decodedName}!</h2>
                    <p style="font-size: 1.3rem; color: #666; margin: 20px 0; line-height: 1.6;">
                        Você está convidado para a festa temática do <strong>Rei Leão</strong> em homenagem ao aniversário do nosso querido <strong>Edgar</strong>!
                    </p>
                </div>
                
                <div style="background: linear-gradient(45deg, #FFF8DC, #FFEBCD); padding: 20px; border-radius: 15px; margin: 25px 0; border: 2px solid #FFD700;">
                    <h3 style="color: #8B4513; margin-bottom: 15px;">Hotéis o evento:</h3>
                    <p style="font-size: 1.1rem; color: #666; margin: 10px 0;"><i class="fas fa-calendar-alt"></i> Data: 05/05/2026</p>
                    <p style="font-size: 1.1rem; color: #666; margin: 10px 0;"><i class="fas fa-clock"></i> Horário: 18:30</p>
                    <p style="font-size: 1.1rem; color: #666; margin: 10px 0;"><i class="fas fa-map-marker-alt"></i> Local: Buffet Kids World</p>
                </div>
                
                <button onclick="window.location.href='${window.location.origin}${window.location.pathname}'" style="
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                    color: #8B4513;
                    border: none;
                    padding: 15px 35px;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 25px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                ">
                    <i class="fas fa-paw"></i> Entrar na Savana
                </button>
            </div>
        `;
        
        document.body.appendChild(invitationScreen);
        
        // Add confetti effect
        setInterval(createPersonalInvitationConfetti, 2000);
    }
    
    // Confetti for personal invitation
    function createPersonalInvitationConfetti() {
        const container = document.getElementById('personal-invitation');
        if (!container) return;
        
        const colors = ['#FFD700', '#8B4513', '#FFA500'];
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${8 + Math.random() * 12}px;
                    height: ${4 + Math.random() * 8}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    opacity: 0.8;
                    border-radius: 2px;
                    animation: personalConfettiFall 5s linear forwards;
                    left: ${Math.random() * 100}%;
                    top: -20px;
                `;
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 5000);
            }, i * 200);
        }
    }
    
    // Add CSS for personal invitation confetti
    const personalConfettiStyle = document.createElement('style');
    personalConfettiStyle.textContent = `
        @keyframes personalConfettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(personalConfettiStyle);
    
    function showGuestList(guestsString) {
        // Hide main content
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        
        // Hide preloader if visible
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
        
        // Parse guest names
        const guests = guestsString.split(',').map(name => name.trim()).filter(name => name);
        
        // Create guest list screen
        const guestScreen = document.createElement('div');
        guestScreen.id = 'guest-screen';
        guestScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
            box-sizing: border-box;
        `;
        
        // Header
        const header = document.createElement('div');
        header.innerHTML = `
            <h1 style="color: #FFD700; font-family: 'Dancing Script', cursive; font-size: 3rem; margin-bottom: 20px; text-align: center; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                <i class="fas fa-crown"></i> Lista de Convidados <i class="fas fa-crown"></i>
            </h1>
            <p style="color: #FFF8DC; font-size: 1.2rem; margin-bottom: 30px; text-align: center;">
                Festa do Rei Leão - Aniversário do Edgar
            </p>
        `;
        
        // Guest list container
        const listContainer = document.createElement('div');
        listContainer.style.cssText = `
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            max-width: 600px;
            width: 90%;
            max-height: 70vh;
            overflow-y: auto;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        `;
        
        // Guest list
        const listTitle = document.createElement('h2');
        listTitle.textContent = `Convidados (${guests.length})`;
        listTitle.style.cssText = `color: #8B4513; text-align: center; margin-bottom: 20px; font-size: 1.8rem;`;
        
        const guestList = document.createElement('ul');
        guestList.style.cssText = `list-style: none; padding: 0; margin: 0;`;
        
        guests.forEach((guest, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    margin: 10px 0;
                    background: linear-gradient(45deg, #FFF8DC, #FFEBCD);
                    border-radius: 12px;
                    border-left: 5px solid #FFD700;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    transition: transform 0.2s ease;
                " onmouseover="this.style.transform='translateX(10px)'" onmouseout="this.style.transform='translateX(0)'">
                    <span style="
                        background: #8B4513;
                        color: white;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                        font-weight: bold;
                    ">${index + 1}</span>
                    <span style="font-size: 1.2rem; color: #8B4513; font-weight: 500;">${guest}</span>
                </div>
            `;
            guestList.appendChild(listItem);
        });
        
        // Back button
        const backButton = document.createElement('button');
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Voltar para o Site';
        backButton.onclick = function() {
            window.location.href = window.location.origin + window.location.pathname;
        };
        backButton.style.cssText = `
            margin-top: 25px;
            padding: 12px 25px;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: #8B4513;
            border: none;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        backButton.onmouseover = function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
        };
        backButton.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        };
        
        // Assemble the screen
        listContainer.appendChild(listTitle);
        listContainer.appendChild(guestList);
        listContainer.appendChild(backButton);
        
        guestScreen.appendChild(header);
        guestScreen.appendChild(listContainer);
        
        document.body.appendChild(guestScreen);
        
        // Add confetti effect to guest screen
        setInterval(() => {
            createGuestScreenConfetti();
        }, 3000);
    }
    
    // Special confetti for guest screen
    function createGuestScreenConfetti() {
        const container = document.getElementById('guest-screen');
        if (!container) return;
        
        const colors = ['#FFD700', '#8B4513', '#FFA500', '#CD853F'];
        const shapes = ['rectangle', 'circle'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                if (shape === 'rectangle') {
                    particle.style.cssText = `
                        position: absolute;
                        width: ${6 + Math.random() * 8}px;
                        height: ${3 + Math.random() * 5}px;
                        background: ${color};
                        opacity: 0.7;
                        border-radius: 2px;
                        animation: guestConfettiFall 4s linear forwards;
                    `;
                } else {
                    particle.style.cssText = `
                        position: absolute;
                        width: ${5 + Math.random() * 7}px;
                        height: ${5 + Math.random() * 7}px;
                        background: ${color};
                        opacity: 0.7;
                        border-radius: 50%;
                        animation: guestConfettiFall 4s linear forwards;
                    `;
                }
                
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = '-10px';
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 4000);
            }, i * 150);
        }
    }
    
    // Add CSS for guest screen confetti
    const guestConfettiStyle = document.createElement('style');
    guestConfettiStyle.textContent = `
        @keyframes guestConfettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(guestConfettiStyle);
    
    // Check for guest list on page load
    window.addEventListener('DOMContentLoaded', function() {
        const hasGuestList = checkForGuestList();
        
        // Only initialize normal components if no guest list is shown
        if (!hasGuestList) {
            // Existing initialization code here
        }
    });

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

    // Trigger confetti on special interactions (removed conflicting event listener)

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

// End of file

