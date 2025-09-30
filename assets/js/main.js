// DOM Elements
const scrollToTopBtn = document.getElementById('scrollToTop');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

// Auto-scroll to top component
class ScrollToTop {
    constructor() {
        this.init();
    }

    init() {
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', this.toggleScrollButton.bind(this));
        
        // Handle page changes (for future multi-page functionality)
        window.addEventListener('beforeunload', this.scrollToTopOnPageChange.bind(this));
        
        // Handle browser back/forward navigation
        window.addEventListener('popstate', this.scrollToTopOnPageChange.bind(this));
    }

    toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    scrollToTopOnPageChange() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink(targetId = null) {
    const sections = document.querySelectorAll('section[id]');
    
    if (targetId) {
        // Manual update when clicking nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });
        return;
    }
    
    // Auto-update based on scroll position
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.pageYOffset + headerHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    nav.classList.toggle('mobile-active');
    mobileMenuToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    nav.classList.remove('mobile-active');
    mobileMenuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Scroll to specific section
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        updateActiveNavLink(sectionId);
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Service details modal functionality
function showServiceDetails(serviceType) {
    const serviceDetails = {
        therapeutic: {
            title: 'Терапевтическая стоматология',
            description: 'Комплексное лечение заболеваний зубов и полости рта с использованием современных материалов и технологий.',
            services: [
                'Лечение кариеса всех стадий',
                'Эндодонтическое лечение (лечение каналов)',
                'Лечение пульпита и периодонтита',
                'Профессиональная гигиена полости рта',
                'Реминерализация эмали',
                'Лечение чувствительности зубов'
            ]
        },
        surgical: {
            title: 'Хирургическая стоматология',
            description: 'Современные хирургические методы лечения с минимальной травматичностью и быстрым заживлением.',
            services: [
                'Удаление зубов любой сложности',
                'Имплантация зубов',
                'Костная пластика и синус-лифтинг',
                'Лечение заболеваний пародонта',
                'Удаление кист и новообразований',
                'Пластика мягких тканей'
            ]
        },
        orthopedic: {
            title: 'Ортопедическая стоматология',
            description: 'Восстановление утраченных зубов с помощью современных протезных конструкций.',
            services: [
                'Коронки (металлокерамика, цирконий)',
                'Мостовидные протезы',
                'Съёмные и частично съёмные протезы',
                'Протезирование на имплантах',
                'Виниры и люминиры',
                'Реставрация зубов'
            ]
        },
        orthodontic: {
            title: 'Ортодонтия',
            description: 'Исправление прикуса и выравнивание зубов для красивой улыбки и здоровья полости рта.',
            services: [
                'Металлические брекеты',
                'Керамические брекеты',
                'Лингвальные брекеты',
                'Элайнеры (прозрачные капы)',
                'Детская ортодонтия',
                'Ретенционный период'
            ]
        },
        pediatric: {
            title: 'Детская стоматология',
            description: 'Специализированное лечение детей с учётом возрастных особенностей и психологического комфорта.',
            services: [
                'Лечение молочных зубов',
                'Профилактика кариеса у детей',
                'Герметизация фиссур',
                'Адаптация к стоматологическому лечению',
                'Ортодонтическое лечение детей',
                'Неотложная помощь при травмах'
            ]
        },
        aesthetic: {
            title: 'Эстетическая стоматология',
            description: 'Создание красивой улыбки с помощью современных эстетических процедур и материалов.',
            services: [
                'Профессиональное отбеливание зубов',
                'Художественная реставрация',
                'Установка виниров',
                'Эстетические пломбы',
                'Контурирование десен',
                'Комплексная эстетическая реабилитация'
            ]
        }
    };
    
    const service = serviceDetails[serviceType];
    if (service) {
        // Create modal window
        const modal = createServiceModal(service);
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal(modal);
            }
        });
    }
}

function createServiceModal(service) {
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${service.title}</h3>
                <button class="modal-close" onclick="closeModal(this.closest('.service-modal'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p class="service-modal-description">${service.description}</p>
                <h4>Наши услуги:</h4>
                <ul class="service-modal-list">
                    ${service.services.map(item => `<li><i class="fas fa-check"></i>${item}</li>`).join('')}
                </ul>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="scrollToSection('contacts'); closeModal(this.closest('.service-modal'));">
                        <i class="fas fa-calendar-alt"></i>
                        Записаться на консультацию
                    </button>
                    <button class="btn-secondary" onclick="scrollToSection('prices'); closeModal(this.closest('.service-modal'));">
                        <i class="fas fa-ruble-sign"></i>
                        Посмотреть цены
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function closeModal(modal) {
    modal.classList.add('closing');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// Form submission handling
function initFormHandling() {
    const appointmentForm = document.querySelector('.form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmission);
    }
}

function handleAppointmentSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate required fields
    if (!data.name || !data.phone) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    // Validate phone number format
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Пожалуйста, введите корректный номер телефона', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправляем заявку...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual backend integration)
    setTimeout(() => {
        // Reset form
        e.target.reset();
        
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success notification
        showNotification('Заявка успешно отправлена! Мы свяжемся с вами в течение часа.', 'success');
        
        // Log form data for development (remove in production)
        console.log('Appointment request:', data);
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 'info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .stat-item, .doctor-feature, .price-category');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Phone number formatting
function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('375')) {
                value = value.replace(/^375/, '+375 ');
                if (value.length > 8) {
                    value = value.replace(/(\+375\s)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1($2) $3-$4-$5');
                }
            }
            
            e.target.value = value;
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll to top functionality
    new ScrollToTop();
    
    // Initialize navigation
    initSmoothScrolling();
    initMobileMenu();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize phone formatting
    initPhoneFormatting();
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Add loading animation classes
    document.body.classList.add('loaded');
});

// Add CSS for modals and notifications dynamically
const additionalCSS = `
<style>
/* Service Modal Styles */
.service-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.service-modal.active {
    opacity: 1;
    visibility: visible;
}

.service-modal.closing {
    opacity: 0;
    visibility: hidden;
}

.modal-content {
    background: white;
    border-radius: 20px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    transform: translateY(50px);
    transition: transform 0.3s ease;
}

.service-modal.active .modal-content {
    transform: translateY(0);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #64748b;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: #f1f5f9;
    color: #1e293b;
}

.modal-body {
    padding: 2rem;
}

.service-modal-description {
    color: #64748b;
    margin-bottom: 2rem;
    line-height: 1.6;
    font-size: 1.1rem;
}

.modal-body h4 {
    color: #1e293b;
    font-weight: 600;
    margin-bottom: 1rem;
}

.service-modal-list {
    list-style: none;
    margin-bottom: 2rem;
}

.service-modal-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #475569;
    margin-bottom: 12px;
    font-weight: 500;
}

.service-modal-list i {
    color: #10b981;
    font-size: 1.1rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

/* Notification Styles */
.notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    z-index: 10001;
    max-width: 400px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    transform: translateX(100%);
    transition: all 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification.hide {
    transform: translateX(100%);
}

.notification.success {
    border-left: 4px solid #10b981;
}

.notification.error {
    border-left: 4px solid #ef4444;
}

.notification.info {
    border-left: 4px solid #2563eb;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1rem 1.5rem;
}

.notification-content i:first-child {
    font-size: 1.2rem;
}

.notification.success .notification-content i:first-child {
    color: #10b981;
}

.notification.error .notification-content i:first-child {
    color: #ef4444;
}

.notification.info .notification-content i:first-child {
    color: #2563eb;
}

.notification-content span {
    flex: 1;
    color: #374151;
    font-weight: 500;
}

.notification-close {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.notification-close:hover {
    background: #f3f4f6;
    color: #374151;
}

/* Animation Classes */
.animate-in {
    animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Mobile Menu Styles */
@media (max-width: 768px) {
    .nav {
        position: fixed;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .nav.mobile-active {
        top: 70px;
    }
    
    .nav-list {
        flex-direction: column;
        padding: 2rem;
        gap: 0;
    }
    
    .nav-list li {
        border-bottom: 1px solid #e2e8f0;
    }
    
    .nav-list li:last-child {
        border-bottom: none;
    }
    
    .nav-link {
        display: block;
        padding: 1rem 0;
        font-size: 1.1rem;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    body.menu-open {
        overflow: hidden;
    }
}

/* Loading Animation */
body.loaded .service-card,
body.loaded .stat-item,
body.loaded .doctor-feature,
body.loaded .price-category {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

body.loaded .service-card.animate-in,
body.loaded .stat-item.animate-in,
body.loaded .doctor-feature.animate-in,
body.loaded .price-category.animate-in {
    opacity: 1;
    transform: translateY(0);
}
</style>
`;

// Add the CSS to the document head
document.head.insertAdjacentHTML('beforeend', additionalCSS);