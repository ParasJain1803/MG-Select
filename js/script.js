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
const carItems = document.querySelectorAll('.car-scene__car-item');
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

let currentCarIndex = 0;
let isAnimating = false;

if (carScene && sceneMarker && prevCarBtn && nextCarBtn) {
    // Mode Toggle (Light/Dark)
    sceneMarker.addEventListener('click', () => {
        carScene.classList.toggle('is-dark');
    });

    // Car Switch Logic with Moving Animation
    const updateCar = (newIndex) => {
        if (isAnimating) return;
        isAnimating = true;

        const currentItem = document.querySelector('.car-scene__car-item.is-active');
        const nextItem = carItems[newIndex];

        // 1. Exit current car - Always move to the left
        if (currentItem) {
            currentItem.classList.remove('is-active');
            currentItem.classList.add('move-left');
            
            // Cleanup current item after animation
            setTimeout(() => {
                currentItem.classList.remove('move-left', 'move-right');
            }, 1000);
        }

        // 2. Prepare and Enter next car after a short delay
        setTimeout(() => {
            nextItem.classList.remove('is-active', 'move-left', 'move-right');
            // Set starting position for entry - Always from the right to maintain leftward flow
            nextItem.classList.add('move-right');
            
            // Trigger reflow to apply starting position before transition
            void nextItem.offsetWidth;

            // Start move to center (Moves Right -> Center, which is Leftward motion)
            nextItem.classList.add('is-active');
            nextItem.classList.remove('move-left', 'move-right');
        }, 200); // 200ms stagger

        // 3. Update Text and UI
        carTitle.textContent = carData[newIndex].title;
        carSubtitle.textContent = carData[newIndex].subtitle;

        if (progressFill) {
            // Snapped states: 50% width at 0% left or 50% left
            progressFill.style.width = '50%';
            progressFill.style.left = newIndex === 0 ? '0%' : '50%';
        }

        // Reset animation flag after full sequence (200ms delay + 400ms transition)
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    };

    nextCarBtn.addEventListener('click', () => {
        const newIndex = (currentCarIndex + 1) % carData.length;
        updateCar(newIndex);
        currentCarIndex = newIndex;
    });

    prevCarBtn.addEventListener('click', () => {
        const newIndex = (currentCarIndex - 1 + carData.length) % carData.length;
        updateCar(newIndex);
        currentCarIndex = newIndex;
    });
}
