document.addEventListener('DOMContentLoaded', function() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150; // Increased threshold for earlier triggering
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            // Only add active class if element isn't already active
            if (elementTop < windowHeight - elementVisible && !element.classList.contains('active')) {
                // Get animation direction from data attribute or default to fade-up
                const animation = element.dataset.animation || 'fade-up';
                
                // Small delay before adding active class to ensure CSS is ready
                requestAnimationFrame(() => {
                    element.classList.add('active', animation);
                });
            }
        });
    };
    
    // Add event listeners
    window.addEventListener('scroll', throttle(revealOnScroll, 100)); // Throttle scroll events
    window.addEventListener('resize', throttle(revealOnScroll, 100));
    
    // Utility function to throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Initial check after a small delay to ensure proper rendering
    setTimeout(revealOnScroll, 100);
}); 