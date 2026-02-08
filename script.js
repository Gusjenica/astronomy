// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2500);
});

// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// Smooth scroll navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            updateActiveNav(link);
        }
    });
});

// Update active navigation link
function updateActiveNav(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Update active section on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// Sample Astronomy News Data
const newsData = [
    {
        date: 'February 1, 2026',
        title: 'New Exoplanet Discovered in Habitable Zone',
        description: 'Scientists have discovered a potentially habitable exoplanet orbiting a star 47 light-years away. The planet shows signs of water and suitable temperature conditions.'
    },
    {
        date: 'January 28, 2026',
        title: 'Spectacular Aurora Borealis Expected This Week',
        description: 'Solar activity is expected to create one of the most spectacular aurora displays of the year. Best viewing locations are the northern latitudes.'
    },
    {
        date: 'January 25, 2026',
        title: 'International Space Station Completes Milestone',
        description: 'The ISS reaches 25 years of continuous human presence in space. Astronauts celebrate the achievement while conducting groundbreaking research.'
    },
    {
        date: 'January 20, 2026',
        title: 'Mars Rover Discovers Ancient Riverbed',
        description: 'New evidence suggests liquid water flowed on Mars billions of years ago. This discovery supports the theory of past habitable conditions.'
    },
    {
        date: 'January 20, 2026',
        title: 'Mars Rover Discovers Ancient Riverbed',
        description: 'New evidence suggests liquid water flowed on Mars billions of years ago. This discovery supports the theory of past habitable conditions.'
    },
    {
        date: 'January 20, 2026',
        title: 'Mars Rover Discovers Ancient Riverbed',
        description: 'New evidence suggests liquid water flowed on Mars billions of years ago. This discovery supports the theory of past habitable conditions.'
    }
];

// Sample Events Data
const eventsData = [
    {
        date: 15,
        month: 'FEB',
        title: 'Lunar Eclipse Viewing Party',
        location: 'Observatory Dome, Space City',
        description: 'Join us for a spectacular lunar eclipse viewing event. Telescopes will be provided for the best experience!'
    },
    {
        date: 22,
        month: 'FEB',
        title: 'Introduction to Astronomy Workshop',
        location: 'Education Center',
        description: 'Learn the basics of astronomy and stargazing. Perfect for beginners interested in exploring the night sky.'
    },
    {
        date: 10,
        month: 'MAR',
        title: 'Meteor Shower Night',
        location: 'Dark Sky Reserve',
        description: 'Experience one of the year\'s best meteor showers. Bring a blanket and prepare for an unforgettable night of cosmic fireworks.'
    },
    {
        date: 10,
        month: 'MAR',
        title: 'Meteor Shower Night',
        location: 'Dark Sky Reserve',
        description: 'Experience one of the year\'s best meteor showers. Bring a blanket and prepare for an unforgettable night of cosmic fireworks.'
    },
    {
        date: 10,
        month: 'MAR',
        title: 'Meteor Shower Night',
        location: 'Dark Sky Reserve',
        description: 'Experience one of the year\'s best meteor showers. Bring a blanket and prepare for an unforgettable night of cosmic fireworks.'
    },
    {
        date: 10,
        month: 'MAR',
        title: 'Meteor Shower Night',
        location: 'Dark Sky Reserve',
        description: 'Experience one of the year\'s best meteor showers. Bring a blanket and prepare for an unforgettable night of cosmic fireworks.'
    }
];

// Populate News Section
function populateNews() {
    const newsGrid = document.getElementById('newsGrid');
    newsGrid.innerHTML = '';
    
    newsData.forEach((news, index) => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <div class="news-date">${news.date}</div>
            <h3>${news.title}</h3>
            <p>${news.description}</p>
            <a href="#" class="read-more">Read More →</a>
        `;
        newsCard.addEventListener('mouseenter', () => {
            newsCard.style.animation = 'none';
            setTimeout(() => {
                newsCard.style.animation = '';
            }, 10);
        });
        newsGrid.appendChild(newsCard);
    });
}

// Populate Events Section
function populateEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    eventsGrid.innerHTML = '';
    
    eventsData.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-header">
                <div class="event-date">${event.date}</div>
                <div class="event-month">${event.month}</div>
            </div>
            <div class="event-body">
                <h3>${event.title}</h3>
                <div class="event-location">📍 ${event.location}</div>
                <p>${event.description}</p>
            </div>
        `;
        eventsGrid.appendChild(eventCard);
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        showMessage('Please fill out all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
    if (!phoneRegex.test(formData.phone)) {
        showMessage('Please enter a valid phone number', 'error');
        return;
    }
    
    // Simulate sending form (in a real app, this would send to a backend)
    console.log('Form Data:', formData);
    showMessage('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Show notification messages
function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `${type}-message`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        animation: slideInUp 0.5s ease-out;
        z-index: 2000;
        font-weight: 500;
    `;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => messageElement.remove(), 500);
    }, 3000);
}

// Add interactive star animation
function createInteractiveStars() {
    const starsContainer = document.querySelector('.stars-background');
    if (!starsContainer) return;
    
    document.addEventListener('mousemove', (e) => {
        const stars = starsContainer.querySelectorAll('.star');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        stars.forEach(star => {
            const starX = star.offsetLeft;
            const starY = star.offsetTop;
            const distance = Math.sqrt(Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2));
            
            if (distance < 100) {
                star.style.opacity = '1';
                star.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.8)';
            } else {
                star.style.opacity = '0.3';
                star.style.boxShadow = 'none';
            }
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateNews();
    populateEvents();
    createInteractiveStars();
    
    // Set initial active nav link
    const homeLink = document.querySelector('[data-section="home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// Add parallax effect to sections
window.addEventListener('scroll', () => {
    const homeSection = document.querySelector('.home-section');
    const scrollPosition = window.scrollY;
    homeSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
});

// Smooth page transition animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.news-card, .event-card').forEach(card => {
    observer.observe(card);
});
