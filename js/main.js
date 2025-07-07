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
    loop: true,
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

// Swiper for Minerals
var mineralsSwiper = new Swiper(".mineralsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});


// Enhanced Products Navigation
const productNavLinks = document.querySelectorAll('.products-nav ul li a');
const productSections = document.querySelectorAll('.product-category');

function updateActiveNavLink() {
    let currentSection = '';

    productSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 180; // Adjusted for sticky nav

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = `#${section.id}`;
        }
    });

    productNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for product nav links
productNavLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all links
        productNavLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const navHeight = document.querySelector('.products-nav').offsetHeight;
            const offset = headerHeight + navHeight - 10;

            window.scrollTo({
                top: targetSection.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize and update on scroll
window.addEventListener('load', updateActiveNavLink);
window.addEventListener('scroll', updateActiveNavLink);

// Initialize active product nav link based on current scroll position
window.addEventListener('load', () => {
    const productSections = document.querySelectorAll('.product-category');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        productSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 180 && window.scrollY < sectionTop + sectionHeight - 180) {
                currentSection = `#${section.id}`;
            }
        });

        productNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.value-card, .contact-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.value-card, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Run animation check on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// 
// Contact Page
// 

