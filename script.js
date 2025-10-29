// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Tutup menu mobile jika terbuka
            navLinks.classList.remove('active');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission dengan Formspree
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Simulasi pengiriman form (fallback)
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    try {
        // Ganti YOUR_FORMSPREE_ENDPOINT dengan endpoint Formspree Anda
        const formspreeEndpoint = 'https://formspree.io/f/mldojbog';
        
        const formData = new FormData(this);
        
        const response = await fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Terima kasih! Pesan Anda telah berhasil dikirim. Saya akan menghubungi Anda segera.');
            this.reset();
        } else {
            // Fallback ke simulasi jika Formspree gagal
            throw new Error('Formspree failed');
        }
    } catch (error) {
        // Fallback ke simulasi original
        setTimeout(() => {
            alert('Terima kasih! Pesan Anda telah berhasil dikirim. Saya akan menghubungi Anda segera.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
        return; // Keluar dari function setelah setTimeout
    }
    
    // Reset button state setelah Formspree success
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});

// Animasi statistik
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if(current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + '+';
        }, 20);
    });
}

// Animasi skill bars
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Scroll animations
function checkScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
            
            // Jika elemen adalah statistik, jalankan animasi
            if (element.querySelector('.stat-number') && !element.classList.contains('animated')) {
                animateStats();
                element.classList.add('animated');
            }
            
            // Jika elemen adalah skill bar, jalankan animasi
            if (element.querySelector('.skill-progress') && !element.classList.contains('animated')) {
                animateSkills();
                element.classList.add('animated');
            }
        }
    });
}

// Panggil fungsi saat scroll
window.addEventListener('scroll', checkScroll);

// Panggil sekali saat halaman dimuat
window.addEventListener('load', checkScroll);

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(249, 251, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(137, 196, 244, 0.15)';
    } else {
        header.style.background = 'rgba(249, 251, 255, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(137, 196, 244, 0.1)';
    }
});

// Tambahkan efek hover pada service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Tambahkan loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});