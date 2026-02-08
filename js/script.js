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
    let isCarSceneVisible = false;

    const updateLogo = () => {
        const isDarkTheme = carScene.classList.contains('is-dark');
        
        if (isCarSceneVisible) {
            // On Page 2: Dark logo by default, switch to Light if theme is dark
            if (isDarkTheme) {
                logoLight.classList.remove('hide');
                logoDark.classList.add('hide');
                hamburger.classList.remove('hamburger--dark');
            } else {
                logoLight.classList.add('hide');
                logoDark.classList.remove('hide');
                hamburger.classList.add('hamburger--dark');
            }
        } else {
            // On Page 1: Light logo
            logoLight.classList.remove('hide');
            logoDark.classList.add('hide');
            hamburger.classList.remove('hamburger--dark');
        }
    };

    // Observer to detect which page we are on
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isCarSceneVisible = entry.isIntersecting;
            updateLogo();
        });
    }, { threshold: 0.5 });

    observer.observe(carScene);

    const carouselEl = document.getElementById('carCarousel');
    const carouselItems = carouselEl.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let isAnimating = false;

    // Mode Toggle (Light/Dark)
    sceneMarker.addEventListener('click', () => {
        carScene.classList.toggle('is-dark');
        updateLogo();
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

