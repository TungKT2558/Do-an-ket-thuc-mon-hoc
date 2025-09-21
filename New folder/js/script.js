// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjusted offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        this.reset();
    });
}

// Optional: Add a simple gallery lightbox functionality
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const altText = this.querySelector('img').alt;
        
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-btn">&times;</span>
                <img src="${imgSrc}" alt="${altText}">
            </div>
        `;
        document.body.appendChild(lightbox);

        // Add basic styling for lightbox (can be moved to CSS for better practice)
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        setTimeout(() => lightbox.style.opacity = '1', 10); // Fade in

        lightbox.querySelector('.lightbox-content').style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        setTimeout(() => lightbox.querySelector('.lightbox-content').style.transform = 'scale(1)', 10); // Scale in

        lightbox.querySelector('img').style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            display: block;
            margin: 0 auto;
        `;
        lightbox.querySelector('.close-btn').style.cssText = `
            position: absolute;
            top: 10px;
            right: 20px;
            color: #fff;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1001;
            text-shadow: 0 0 5px rgba(0,0,0,0.5);
        `;

        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            lightbox.querySelector('.lightbox-content').style.transform = 'scale(0.9)';
            setTimeout(() => document.body.removeChild(lightbox), 300); // Remove after fade out
        };

        lightbox.querySelector('.close-btn').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    });
});