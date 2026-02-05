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
    // Mode Toggle (Light/Dark)
    sceneMarker.addEventListener('click', () => {
        carScene.classList.toggle('is-dark');
    });

    // Car Switch Logic with Moving Animation
    // --- Bootstrap Carousel Integration ---
    const carouselEl = document.getElementById('carCarousel');
    const carCarousel = new bootstrap.Carousel(carouselEl, {
        interval: false,
        wrap: true
    });

    // Update Progress Bar, Text and UI on slide
    carouselEl.addEventListener('slide.bs.carousel', (event) => {
        const nextIndex = event.to;
        
        // Update Text
        carTitle.textContent = carData[nextIndex].title;
        carSubtitle.textContent = carData[nextIndex].subtitle;

        // Update Progress Bar
        if (progressFill) {
            progressFill.style.width = '50%';
            progressFill.style.left = nextIndex === 0 ? '0%' : '50%';
        }
    });

    nextCarBtn.addEventListener('click', () => {
        carCarousel.next();
    });

    prevCarBtn.addEventListener('click', () => {
        // ALWAYS use next() to maintain one-way slide direction for the 2-car loop
        carCarousel.next();
    });
}
