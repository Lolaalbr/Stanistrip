// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-wrapper')) {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Dropdown functionality for mobile
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    dropbtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.querySelector('.dropdown-content').style.display = 'none';
                }
            });
            
            // Toggle current dropdown
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'block';
            }
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toast.style.background = '#2ecc71';
    } else {
        toast.style.background = '#e74c3c';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Simulate API call
    setTimeout(() => {
        showToast('Merci pour votre inscription ! Vérifiez votre email.', 'success');
        newsletterForm.reset();
    }, 500);
});

// Explore Button Smooth Scroll
const exploreBtn = document.getElementById('exploreBtn');

exploreBtn.addEventListener('click', () => {
    const highlightsSection = document.querySelector('.highlights');
    highlightsSection.scrollIntoView({ behavior: 'smooth' });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 992) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Reset all dropdown displays
            dropdowns.forEach(dropdown => {
                dropdown.querySelector('.dropdown-content').style.display = '';
            });
        }
    }, 250);
});

// Add active class to current page link (if you have multiple pages)
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.dropdown-content a');
menuItems.forEach(item => {
    if (item.href === currentLocation) {
        item.style.color = 'var(--secondary-color)';
        item.style.fontWeight = '600';
    }
});
