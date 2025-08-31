document.addEventListener("DOMContentLoaded", function() {
    // --- Testimonial Slideshow Logic ---
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    let autoSlideTimeout;

    // This is a single function to handle showing the slides.
    function showSlides() {
        // First, check if there are any slides on the page. If not, stop.
        if (slides.length === 0) return;

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slideIndex++;
        // If we've passed the last slide, loop back to the first one.
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        // Deactivate all dots by removing the "active" class
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Display the correct slide and set its corresponding dot to "active"
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";

        // Set a timer to automatically call this function again after 5 seconds
        clearTimeout(autoSlideTimeout); // Clear previous timer to prevent issues
        autoSlideTimeout = setTimeout(showSlides, 5000);
    }

    // Make the `currentSlide` function available globally so HTML `onclick` can find it.
    window.currentSlide = function(n) {
        // We set the slideIndex to n-1 because the showSlides function will immediately increment it.
        slideIndex = n - 1; 
        showSlides();
    }
    
    // Initial call to start the slideshow.
    showSlides();


    // --- Animate on Scroll Logic (for index.html) ---
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    if (scrollElements.length > 0) {
        const elementInView = (el) => {
            const elementTop = el.getBoundingClientRect().top;
            // Check if the top of the element is visible in the viewport
            return elementTop <= (window.innerHeight || document.documentElement.clientHeight);
        };

        const displayScrollElement = (element) => {
            element.classList.add("scrolled");
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el)) {
                    displayScrollElement(el);
                }
            });
        };

        const style = document.createElement('style');
        style.innerHTML = `
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }
          .animate-on-scroll.scrolled {
            opacity: 1;
            transform: translateY(0);
          }
        `;
        document.head.appendChild(style);

        handleScrollAnimation(); // Check on page load
        window.addEventListener("scroll", handleScrollAnimation);
    }
});