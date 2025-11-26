// Countdown Timer for Discount
function initCountdown() {
    // Set the target date to November 30, 2025, 23:59:59
    const targetDate = new Date('November 30, 2025 23:59:59').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
        }
    }

    // Update countdown immediately
    updateCountdown();

    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Initialize countdown when page loads
initCountdown();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.service-card, .benefit-item, .pricing-card, .portfolio-item, .contact-item'
);

animateElements.forEach(el => {
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    const serviceNames = {
        'basic': 'Paket Basic',
        'professional': 'Paket Professional',
        'enterprise': 'Paket Enterprise',
        'custom': 'Custom Request'
    };

    const whatsappMessage = `Halo, saya ingin konsultasi tentang jasa pembuatan website.%0A%0A` +
        `Nama: ${name}%0A` +
        `Email: ${email}%0A` +
        `No. WhatsApp: ${phone}%0A` +
        `Layanan: ${serviceNames[service] || service}%0A` +
        `Pesan: ${message}`;

    // WhatsApp number (replace with actual number)
    const whatsappNumber = '6285722403823'; // Replace with actual number

    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    // Show success message
    showNotification('Terima kasih! Anda akan diarahkan ke WhatsApp...');

    // Reset form
    contactForm.reset();
});

// Notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Pricing card click to scroll to contact
const pricingButtons = document.querySelectorAll('.pricing-card .btn');
pricingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('kontak');
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // Pre-select the service in the form
        const cardTitle = btn.closest('.pricing-card').querySelector('h3').textContent;
        const serviceSelect = document.getElementById('service');

        if (cardTitle.includes('Basic')) {
            serviceSelect.value = 'basic';
        } else if (cardTitle.includes('Professional')) {
            serviceSelect.value = 'professional';
        } else if (cardTitle.includes('Enterprise')) {
            serviceSelect.value = 'enterprise';
        }
    });
});

// Add hover effect to portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for pricing
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('id-ID');
    }, 20);
}

// Observe pricing cards for counter animation
const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const amountElement = entry.target.querySelector('.amount');
            if (amountElement && !amountElement.dataset.animated) {
                const targetAmount = parseInt(amountElement.textContent.replace(/\./g, ''));
                amountElement.textContent = '0';
                animateCounter(amountElement, targetAmount);
                amountElement.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.pricing-card').forEach(card => {
    pricingObserver.observe(card);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Highlight active section in navbar
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = '#667eea';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('Website Jasa Pembuatan Website loaded successfully!');