document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const contactButtons = document.querySelectorAll(
    '.btn-primary[href="contact.html"], #contactButton'
  );
  const contactOverlay = document.getElementById("contactOverlay");
  const closeBtn = document.querySelector(".close-btn");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  const navLinksItems = document.querySelectorAll(".nav-links li a");
  navLinksItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const faqItem = this.parentNode;
        const isActive = faqItem.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach((item) => {
          item.classList.remove("active");
        });

        if (!isActive) {
          faqItem.classList.add("active");
        }
      });
    });
  }

  const categoryButtons = document.querySelectorAll(".category-btn");
  if (categoryButtons.length > 0) {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.dataset.category;

        document.querySelectorAll(".category-btn").forEach((btn) => {
          btn.classList.remove("active");
        });

        document.querySelectorAll(".faq-container").forEach((container) => {
          container.classList.remove("active");
        });

        this.classList.add("active");
        document
          .querySelector(`.faq-container.${category}`)
          .classList.add("active");
      });
    });
  }

  const slidesContainer = document.querySelector(".testimonials-container");
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelector(".slider-dots");
  const prev = document.querySelector(".slider-prev");
  const next = document.querySelector(".slider-next");

  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0) {
    while (dots.firstChild) {
      dots.removeChild(dots.firstChild);
    }

    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        goToSlide(index);
        resetInterval();
      });
      dots.appendChild(dot);
    });

    function initSlider() {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active", "prev");
          if (index < currentSlide) {
            slide.classList.add("prev");
          }
        }
      });

      updateDots();
    }

    function updateDots() {
      document.querySelectorAll(".dot").forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    function goToSlide(n) {
      slides[currentSlide].classList.remove("active");

      if (n > currentSlide) {
        slides[currentSlide].classList.add("prev");
      } else {
        slides.forEach((slide, idx) => {
          if (idx !== n) {
            slide.classList.remove("prev");
          }
        });
      }

      currentSlide = n;
      slides[currentSlide].classList.add("active");
      slides[currentSlide].classList.remove("prev");

      updateDots();
    }

    function nextSlide() {
      let next = (currentSlide + 1) % slides.length;
      goToSlide(next);
    }

    function prevSlide() {
      let prev = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(prev);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    initSlider();

    if (prev)
      prev.addEventListener("click", () => {
        prevSlide();
        resetInterval();
      });

    if (next)
      next.addEventListener("click", () => {
        nextSlide();
        resetInterval();
      });

    slideInterval = setInterval(nextSlide, 5000);
    slidesContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    slidesContainer.addEventListener("mouseleave", () => {
      resetInterval();
    });
  }

  contactButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      contactOverlay.style.display = "flex";
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      contactOverlay.style.display = "none";
    });
  }

  if (contactOverlay) {
    contactOverlay.addEventListener("click", function (e) {
      if (e.target === contactOverlay) {
        contactOverlay.style.display = "none";
      }
    });
  }
});
