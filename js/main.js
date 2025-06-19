// 
// Index Page
// 

// Mobile menu toggle
// Sidebar Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const sidebar = document.querySelector('.sidebar-nav');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
sidebar.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        sidebar.classList.remove('active');
    }
});
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// Fade Slider Logic
let fadeIndex = 0;
const slides = document.querySelectorAll('.slider-fade img');
const dots = document.getElementById('dots');

function initFadeSlider() {
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => showSlide(i));
        dots.appendChild(dot);
    });
    showSlide(fadeIndex);
    setInterval(() => showSlide((fadeIndex + 1) % slides.length), 3000);
}

function showSlide(n) {
    fadeIndex = n;
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === n);
        dots.children[i].classList.toggle('active', i === n);
    });
}

document.addEventListener('DOMContentLoaded', initFadeSlider);


// Scroll JSs
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    slides.forEach(img => {
        // Move image vertically at 20% of scroll speed for subtle parallax
        img.style.transform = `translateY(${0.9 * scrollY}px)`;
    });
});


// 
// About Us Page
// 
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 2
        }
    }
});

const certSwiper = new Swiper('.certificates-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 1
        },
        1024: {
            slidesPerView: 1
        }
    }
});

// 
// Products Page
// 

const labChemSwiper = new Swiper('.labChemSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// Products Sub-Header Navigation with Smooth Scroll + Active Highlight

// Select all sub-header links and section targets
const productNavLinks = document.querySelectorAll('.products-nav a');
const productSections = document.querySelectorAll('.product-category');

// Smooth scroll on click
productNavLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove existing active classes
        productNavLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Scroll to target section with offset for fixed header/sub-nav
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const subnavHeight = document.querySelector('.products-nav')?.offsetHeight || 0;
            const offset = headerHeight + subnavHeight + 20;

            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Update active class on scroll
function updateProductNavHighlight() {
    const scrollY = window.scrollY;

    productSections.forEach(section => {
        const sectionTop = section.offsetTop - 180; // adjust if needed
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            const currentId = `#${section.id}`;

            productNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Call on load and scroll
window.addEventListener('load', updateProductNavHighlight);
window.addEventListener('scroll', updateProductNavHighlight);
