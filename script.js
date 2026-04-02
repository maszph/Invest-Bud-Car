// ==================== SCRIPT.JS ====================

// Smooth scroll dla linków
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Zamknij menu mobilne na telefonie
    if (window.innerWidth < 768) closeMobileMenu();
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('nav-scroll');
  } else {
    navbar.classList.remove('nav-scroll');
  }
});

// Reveal sections on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
sections.forEach(section => observer.observe(section));

// ==================== MOBILE MENU ====================
const menuBtn     = document.getElementById('menuBtn');
const closeBtn    = document.getElementById('closeBtn');
const mobileMenu  = document.getElementById('mobileMenu');
const overlay     = document.getElementById('overlay');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  overlay.classList.add('active');
  menuBtn.textContent = '✕';
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
  menuBtn.textContent = '☰';
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

closeBtn.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

// Zamknij menu po kliknięciu w link mobilny
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ==================== HERO SLIDER ====================
const heroImages = [
  '0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg',
  '8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg',
  '15.jpg','16.jpg','17.jpg'
];
let heroCurrent = 0;
const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

if (bg1) {
  bg1.style.backgroundImage = `url('${heroImages[0]}')`;

  setInterval(() => {
    heroCurrent = (heroCurrent + 1) % heroImages.length;
    bg2.style.backgroundImage = `url('${heroImages[heroCurrent]}')`;
    bg2.style.opacity = 1;
    bg2.classList.add('zoom');

    setTimeout(() => {
      bg1.style.backgroundImage = bg2.style.backgroundImage;
      bg2.style.opacity = 0;
      bg2.classList.remove('zoom');
    }, 1000);
  }, 5000);
}

// ==================== GALLERY SLIDER ====================
const slides = document.querySelectorAll('#gallery-slider .slide');
const dotsContainer = document.getElementById('dots');
let currentSlide = 0;
const slideIntervalTime = 5000;

if (slides.length > 0 && dotsContainer) {
  // Tworzenie kropek
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `dot w-3 h-3 rounded-full bg-white/50 hover:bg-white transition`;
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('#dots .dot');

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }
  function prevSlide()  { goToSlide((currentSlide - 1 + slides.length) % slides.length); }

  let autoSlider = setInterval(nextSlide, slideIntervalTime);

  document.getElementById('nextBtn').addEventListener('click', () => {
    clearInterval(autoSlider);
    nextSlide();
    autoSlider = setInterval(nextSlide, slideIntervalTime);
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    clearInterval(autoSlider);
    prevSlide();
    autoSlider = setInterval(nextSlide, slideIntervalTime);
  });

  const sliderContainer = document.getElementById('gallery-slider');
  sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlider));
  sliderContainer.addEventListener('mouseleave', () => {
    autoSlider = setInterval(nextSlide, slideIntervalTime);
  });
}