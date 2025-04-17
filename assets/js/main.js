document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a link
  const navLinksItems = document.querySelectorAll(".nav-links li a");
  navLinksItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // FAQ Toggles
  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const faqItem = this.parentNode;
        const isActive = faqItem.classList.contains("active");

        // Close all FAQ items
        document.querySelectorAll(".faq-item").forEach((item) => {
          item.classList.remove("active");
        });

        // If the clicked item wasn't active, open it
        if (!isActive) {
          faqItem.classList.add("active");
        }
      });
    });
  }

  // FAQ Category Tabs
  const categoryButtons = document.querySelectorAll(".category-btn");
  if (categoryButtons.length > 0) {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.dataset.category;

        // Remove active class from all buttons and containers
        document.querySelectorAll(".category-btn").forEach((btn) => {
          btn.classList.remove("active");
        });

        document.querySelectorAll(".faq-container").forEach((container) => {
          container.classList.remove("active");
        });

        // Add active class to selected button and container
        this.classList.add("active");
        document
          .querySelector(`.faq-container.${category}`)
          .classList.add("active");
      });
    });
  }

  // Testimonial Slider
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelector(".slider-dots");
  const prev = document.querySelector(".slider-prev");
  const next = document.querySelector(".slider-next");

  if (slides.length > 0) {
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
      dots.appendChild(dot);
    });

    // Initialize slider
    function showSlide(n) {
      slides.forEach((slide) => {
        slide.style.display = "none";
      });

      document.querySelectorAll(".dot").forEach((dot) => {
        dot.classList.remove("active");
      });

      slides[n].style.display = "block";
      document.querySelectorAll(".dot")[n].classList.add("active");
    }

    function goToSlide(n) {
      currentSlide = n;
      showSlide(currentSlide);
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    // Show first slide
    showSlide(currentSlide);

    // Event listeners for controls
    if (prev) prev.addEventListener("click", prevSlide);
    if (next) next.addEventListener("click", nextSlide);

    // Auto slide
    setInterval(nextSlide, 5000);
  }
});
