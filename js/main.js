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
// window.addEventListener('scroll', () => {
//     const scrollY = window.scrollY;
//     slides.forEach(img => {
//         // Move image vertically at 20% of scroll speed for subtle parallax
//         img.style.transform = `translateY(${scrollY}px)`;
//     });
// });


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
