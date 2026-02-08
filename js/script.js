const hamburger = document.querySelector('.hamburger');
const video = document.querySelector('.hero__video video');
const volumeBtn = document.querySelector('.hero__volume');
const volumeOnIcon = document.querySelector('.hero__volume--on');
const volumeOffIcon = document.querySelector('.hero__volume--off');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
});

// Mute/Unmute logic
if (volumeBtn && video) {
    volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        
        if (video.muted) {
            volumeOnIcon.classList.add('hide');
            volumeOffIcon.classList.remove('hide');
        } else {
            volumeOnIcon.classList.remove('hide');
            volumeOffIcon.classList.add('hide');
        }
    });
}

// --- Page 2: Interactive Car Scene Logic ---
const carScene = document.getElementById('carScene');
const sceneMarker = document.getElementById('sceneMarker');
const prevCarBtn = document.getElementById('prevCar');
const nextCarBtn = document.getElementById('nextCar');
const carTitle = document.querySelector('.car-scene__title');
const carSubtitle = document.querySelector('.car-scene__subtitle');
const progressFill = document.querySelector('.car-scene__progress-fill');

const carData = [
    {
        title: "MG Cyberster",
        subtitle: "Driven by vision, not convention."
    },
    {
        title: "MG M9",
        subtitle: "Redefining excellence in every journey."
    }
];

if (carScene && sceneMarker && prevCarBtn && nextCarBtn) {
    // --- Navbar Logo Toggle Logic ---
    const logoLight = document.querySelector('.nav__logo--light');
    const logoDark = document.querySelector('.nav__logo--dark');
    const stickyHeader = document.querySelector('.sticky-header');
    const sections = [
        document.querySelector('.hero'),
        document.querySelector('.car-scene'),
        document.querySelector('.photo__carousel'),
        document.querySelector('.city-carousel')
    ];

    const updateNavbar = (activeSection) => {
        if (!stickyHeader || !activeSection) return;

        // --- Visibility Control ---
        if (activeSection.classList.contains('photo__carousel')) {
            stickyHeader.classList.add('hide-navbar');
        } else {
            stickyHeader.classList.remove('hide-navbar');
        }

        // --- Logo & Theme Control ---
        const isCarScene = activeSection.classList.contains('car-scene');
        const isHero = activeSection.classList.contains('hero');
        const isCityCarousel = activeSection.classList.contains('city-carousel');
        const isDarkTheme = carScene.classList.contains('is-dark');

        if (isCarScene) {
            // Page 2: Dynamic theme
            if (isDarkTheme) {
                logoLight.classList.remove('hide');
                logoDark.classList.add('hide');
                hamburger.classList.remove('hamburger--dark');
            } else {
                logoLight.classList.add('hide');
                logoDark.classList.remove('hide');
                hamburger.classList.add('hamburger--dark');
            }
        } else if (isHero) {
            // Page 1: Light logo
            logoLight.classList.remove('hide');
            logoDark.classList.add('hide');
            hamburger.classList.remove('hamburger--dark');
        } else if (isCityCarousel) {
            // Page 4: Dark logo
            logoLight.classList.add('hide');
            logoDark.classList.remove('hide');
            hamburger.classList.add('hamburger--dark');
        }
    };

    // Observer to detect which section we are in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateNavbar(entry.target);
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => {
        if (section) observer.observe(section);
    });

    const carouselEl = document.getElementById('carCarousel');
    const carouselItems = carouselEl.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let isAnimating = false;

    // Mode Toggle (Light/Dark)
    sceneMarker.addEventListener('click', () => {
        carScene.classList.toggle('is-dark');
        updateNavbar(carScene);
    });

    // Car Switch Logic with Moving Animation
    const switchCar = () => {
        if (isAnimating) return;
        isAnimating = true;

        const currentItem = carouselItems[currentIndex];
        const nextIndex = (currentIndex + 1) % carouselItems.length;
        const nextItem = carouselItems[nextIndex];

        // 1. Prepare Next Item (Make visible at 100% off-screen)
        nextItem.classList.add('is-preparing');
        
        // Forced Reflow
        void nextItem.offsetWidth;

        // 2. Start Animation Segment
        currentItem.classList.remove('active');
        currentItem.classList.add('exiting');
        
        // Remove preparation class and add entering
        nextItem.classList.remove('is-preparing');
        nextItem.classList.add('entering');

        // Update Text & UI
        if (carTitle) carTitle.textContent = carData[nextIndex].title;
        if (carSubtitle) carSubtitle.textContent = carData[nextIndex].subtitle;
        if (progressFill) {
            progressFill.style.width = '50%';
            progressFill.style.left = nextIndex === 0 ? '0%' : '50%';
        }

        // 3. Cleanup on transition end
        nextItem.addEventListener('transitionend', function cleanup() {
            nextItem.removeEventListener('transitionend', cleanup);
            
            currentItem.classList.remove('exiting');
            nextItem.classList.remove('entering');
            nextItem.classList.add('active');
            
            currentIndex = nextIndex;
            isAnimating = false;
        }, { once: true });
    };

    nextCarBtn.addEventListener('click', switchCar);
    prevCarBtn.addEventListener('click', switchCar);
}

