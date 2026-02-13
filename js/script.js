const hamburger = document.querySelector(".hamburger");
const video = document.querySelector(".hero__video video");
const volumeBtn = document.querySelector(".hero__volume");
const volumeOnIcon = document.querySelector(".hero__volume--on");
const volumeOffIcon = document.querySelector(".hero__volume--off");
const menuModal = document.getElementById("menuModal");
const stickyHeader = document.querySelector(".sticky-header");
const logoLight = document.querySelector(".nav__logo--light");
const logoDark = document.querySelector(".nav__logo--dark");
const carScene = document.getElementById("page2");

const updateNavbar = (activeSection) => {
  if (!stickyHeader || !activeSection) return;

  if (activeSection.classList.contains("photo__carousel")) {
    stickyHeader.classList.add("hide-navbar");
  } else {
    stickyHeader.classList.remove("hide-navbar");
  }

  const isCarScene = activeSection.classList.contains("car-scene");
  const isHero = activeSection.classList.contains("hero");
  const isCityCarousel = activeSection.classList.contains("city-carousel");
  const isHeritageTimeline =
    activeSection.classList.contains("heritage-timeline");
  const isDarkTheme = carScene && carScene.classList.contains("is-dark");

  if (isCarScene) {
    if (isDarkTheme) {
      logoLight.classList.remove("hide");
      logoDark.classList.add("hide");
      hamburger.classList.remove("hamburger--dark");
    } else {
      logoLight.classList.add("hide");
      logoDark.classList.remove("hide");
      hamburger.classList.add("hamburger--dark");
    }
  } else if (isHero) {
    logoLight.classList.remove("hide");
    logoDark.classList.add("hide");
    hamburger.classList.remove("hamburger--dark");
  } else if (isCityCarousel) {
    logoLight.classList.add("hide");
    logoDark.classList.remove("hide");
    hamburger.classList.add("hamburger--dark");
  } else if (isHeritageTimeline) {
    logoLight.classList.add("hide");
    logoDark.classList.remove("hide");
    hamburger.classList.add("hamburger--dark");
  }
};

const sections = [
  document.querySelector(".hero"),
  document.querySelector(".car-scene"),
  document.querySelector(".photo__carousel"),
  document.querySelector(".city-carousel"),
  document.querySelector(".heritage-timeline"),
  document.querySelector(".footer"),
];

let currentActiveSection = sections[0];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentActiveSection = entry.target;
        if (!menuModal.classList.contains("active")) {
          updateNavbar(entry.target);
        }
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((section) => {
  if (section) observer.observe(section);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menuModal.classList.toggle("active");

  if (stickyHeader) {
    stickyHeader.classList.toggle("menu-open");
  }

  if (menuModal.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    if (logoLight) logoLight.classList.add("hide");
    if (logoDark) logoDark.classList.remove("hide");
  } else {
    document.body.style.overflow = "";
    if (currentActiveSection) {
      updateNavbar(currentActiveSection);
    }
  }
});

const modalVehicleItems = document.querySelectorAll(
  ".menu-modal__vehicle-item",
);
const modalVehicleTitle = document.querySelector(".menu-modal__vehicle-title");
const modalVehicleSubtitle = document.querySelector(
  ".menu-modal__vehicle-subtitle",
);
const modalVehicleImage = document.getElementById("modalVehicleImage");

const modalVehicleData = {
  cyberster: {
    title: "CYBERSTER",
    subtitle: "Meet the boldest expressions of MG innovation.",
    image: "./assets/images/hamburger/cybie-header.webp",
  },
  m9: {
    title: "M9",
    subtitle: "Meet the boldest expressions of MG innovation.",
    image: "./assets/images/hamburger/m9-burger-menu.webp",
  },
};

modalVehicleItems.forEach((item) => {
  item.addEventListener("click", () => {
    const vehicle = item.getAttribute("data-vehicle");
    const data = modalVehicleData[vehicle];
    modalVehicleItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    if (modalVehicleTitle) modalVehicleTitle.textContent = data.title;
    if (modalVehicleSubtitle) modalVehicleSubtitle.textContent = data.subtitle;
    if (modalVehicleImage) modalVehicleImage.src = data.image;
  });
});

if (volumeBtn && video) {
  volumeOnIcon.classList.add("hide");
  volumeOffIcon.classList.remove("hide");
  volumeBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    if (video.muted) {
      volumeOnIcon.classList.add("hide");
      volumeOffIcon.classList.remove("hide");
    } else {
      volumeOnIcon.classList.remove("hide");
      volumeOffIcon.classList.add("hide");
    }
  });
}

const sceneMarker = document.getElementById("sceneMarker");
const prevCarBtn = document.getElementById("prevCar");
const nextCarBtn = document.getElementById("nextCar");
const carTitle = document.querySelector(".car-scene__title");
const carSubtitle = document.querySelector(".car-scene__subtitle");
const progressFill = document.querySelector(".car-scene__progress-fill");

const carData = [
  { title: "MG Cyberster", subtitle: "Driven by vision, not convention." },
  { title: "MG M9", subtitle: "Redefining excellence in every journey." },
];

if (carScene && sceneMarker && prevCarBtn && nextCarBtn) {
  const carouselEl = document.getElementById("carCarousel");
  const carouselItems = carouselEl.querySelectorAll(".carousel-item");
  let currentIndex = 0;
  let isAnimating = false;

  sceneMarker.addEventListener("click", () => {
    carScene.classList.toggle("is-dark");
    if (!menuModal.classList.contains("active")) {
      updateNavbar(carScene);
    }
  });

  const switchCar = () => {
    if (isAnimating) return;
    isAnimating = true;
    const currentItem = carouselItems[currentIndex];
    const nextIndex = (currentIndex + 1) % carouselItems.length;
    const nextItem = carouselItems[nextIndex];
    nextItem.classList.add("is-preparing");
    void nextItem.offsetWidth;
    currentItem.classList.remove("active");
    currentItem.classList.add("exiting");
    nextItem.classList.remove("is-preparing");
    nextItem.classList.add("entering");
    if (carTitle) carTitle.textContent = carData[nextIndex].title;
    if (carSubtitle) carSubtitle.textContent = carData[nextIndex].subtitle;
    if (progressFill) {
      progressFill.style.width = "50%";
      progressFill.style.left = nextIndex === 0 ? "0%" : "50%";
    }
    nextItem.addEventListener(
      "transitionend",
      function cleanup() {
        nextItem.removeEventListener("transitionend", cleanup);
        currentItem.classList.remove("exiting");
        nextItem.classList.remove("entering");
        nextItem.classList.add("active");
        currentIndex = nextIndex;
        isAnimating = false;
      },
      { once: true },
    );
  };

  nextCarBtn.addEventListener("click", switchCar);
  prevCarBtn.addEventListener("click", switchCar);
}

const initHeritageSwiper = () => {
  const rulerTrack = document.getElementById("rulerTrack");

  const swiper = new Swiper(".heritageSwiper", {
    slidesPerView: "auto",
    spaceBetween: 0, 
    centeredSlides: true,
    loop: true,
    speed: 1200,
    grabCursor: true,

    on: {
      init: function () {
      },
    },
  });
};

initHeritageSwiper();

window.addEventListener("scroll", function () {
  const pageIds = ["page1", "page2", "page3", "page4", "page5", "page6"];
  const dots = document.querySelectorAll(".pagination__page");
  const scrollPosition = window.scrollY + 200;
  pageIds.forEach(function (sectionId, index) {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        if (dots[index]) dots[index].classList.add("active");
      } else {
        if (dots[index]) dots[index].classList.remove("active");
      }
    }
  });
});

