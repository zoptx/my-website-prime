document.addEventListener('DOMContentLoaded', function() {
    // Date Picker: Only current year
    const datePicker = document.querySelector('#date-picker');
    const now = new Date();
    const currentYear = now.getFullYear();
    const minDate = new Date(currentYear, 0, 1); // Jan 1st
    const maxDate = new Date(currentYear, 11, 31); // Dec 31st
    const fpDate = flatpickr(datePicker, {
        dateFormat: "Y-m-d",
        minDate: minDate,
        maxDate: maxDate,
        disableMobile: false,
        position: "auto center",
        appendTo: document.body,
    });

    // Time Picker: 7am-7pm, 30-min intervals
    const timePicker = document.querySelector('#time-picker');
    const fpTime = flatpickr(timePicker, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minTime: "07:00",
        maxTime: "19:00",
        minuteIncrement: 30,
        disableMobile: false,
        position: "auto center",
        appendTo: document.body,
    });

    // Open Flatpickr when clicking anywhere on the form-group
    [datePicker, timePicker].forEach(function(picker) {
        const formGroup = picker.closest('.form-group');
        if (formGroup) {
            formGroup.addEventListener('click', function(e) {
                picker._flatpickr.open();
            });
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth Scroll to Booking Section
    function scrollToBooking() {
        const bookingSection = document.getElementById('booking');
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Video Player Controls
    const video = document.getElementById('main-video');
    const playButton = document.querySelector('.play-button');
    const videoOverlay = document.querySelector('.video-overlay');

    function playVideo() {
        video.play();
        videoOverlay.style.display = 'none';
    }

    video.addEventListener('ended', () => {
        videoOverlay.style.display = 'flex';
    });

    // Testimonials Data (now 9 reviews)
    const testimonials = [
        {
            name: "John Smith",
            rating: 5,
            comment: "Best car detailing service I've ever used! My car looks brand new.",
            image: "assets/testimonial1.jpg",
            carImage: "assets/review-car1.jpg"
        },
        {
            name: "Sarah Johnson",
            rating: 5,
            comment: "Professional service and amazing results. Will definitely use again!",
            image: "assets/testimonial2.jpg",
            carImage: "assets/review-car2.jpg"
        },
        {
            name: "Mike Brown",
            rating: 5,
            comment: "They came to my location and did an outstanding job. Very convenient!",
            image: "assets/testimonial3.jpg",
            carImage: "assets/review-car3.jpg"
        },
        {
            name: "Emily White",
            rating: 5,
            comment: "Incredible attention to detail. My SUV looks better than when I bought it!",
            image: "assets/testimonial4.jpg",
            carImage: "assets/review-car4.jpg"
        },
        {
            name: "David Lee",
            rating: 5,
            comment: "Super friendly and professional. Highly recommend PrimeShine!",
            image: "assets/testimonial5.jpg",
            carImage: "assets/review-car5.jpg"
        },
        {
            name: "Jessica Green",
            rating: 5,
            comment: "Fast, reliable, and my car is spotless. Will book again!",
            image: "assets/testimonial6.jpg",
            carImage: "assets/review-car6.jpg"
        },
        {
            name: "Carlos Mendez",
            rating: 5,
            comment: "The ceramic coating is amazing. Water just beads off now!",
            image: "assets/testimonial7.jpg",
            carImage: "assets/review-car7.jpg"
        },
        {
            name: "Priya Patel",
            rating: 5,
            comment: "They removed stains I thought were permanent. So happy!",
            image: "assets/testimonial8.jpg",
            carImage: "assets/review-car8.jpg"
        },
        {
            name: "Alex Kim",
            rating: 5,
            comment: "On time, great price, and my car looks fantastic.",
            image: "assets/testimonial9.jpg",
            carImage: "assets/review-car9.jpg"
        }
    ];

    const testimonialContainer = document.querySelector('.testimonial-container');
    const loadMoreBtn = document.getElementById('load-more-testimonials');
    const showLessBtn = document.getElementById('show-less-testimonials');
    let testimonialsShown = 3;

    function createTestimonialCard(testimonial) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-content">
                <div class="testimonial-image-wrapper" style="position:relative;">
                    <img src="${testimonial.carImage}" alt="Client's Car" class="intro-image">
                    <div class="review-badge right">
                      <div class="review-badge-row">
                        <img src="${testimonial.image}" alt="${testimonial.name}" class="review-avatar">
                        <div class="review-badge-info">
                          <div class="review-badge-top">
                            <span class="reviewer-name">${testimonial.name}</span>
                            <span class="review-score"><i class="fas fa-star"></i> ${testimonial.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <p class="comment">${testimonial.comment}</p>
            </div>
        `;
        return card;
    }

    function updateTestimonials() {
        testimonialContainer.innerHTML = '';
        for (let i = 0; i < testimonialsShown && i < testimonials.length; i++) {
            testimonialContainer.appendChild(createTestimonialCard(testimonials[i]));
        }
        
        // Show/hide load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = testimonialsShown < testimonials.length ? 'flex' : 'none';
        }
        
        // Show/hide show less button
        if (showLessBtn) {
            showLessBtn.style.display = testimonialsShown > 3 ? 'flex' : 'none';
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            testimonialsShown += 3;
            updateTestimonials();
            // Smooth scroll to the newly loaded testimonials
            testimonialContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    if (showLessBtn) {
        showLessBtn.addEventListener('click', () => {
            testimonialsShown = 3;
            updateTestimonials();
            // Smooth scroll to the testimonials section
            document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Initialize testimonials
    updateTestimonials();

    // --- Dynamic Booking & Quoting System ---
    const vehicleType = document.getElementById('vehicle-type');
    const serviceCheckboxes = document.querySelectorAll('.service-checkbox');
    const quoteAmount = document.getElementById('quote-amount');

    const pricing = {
        coupe: {
            ultimate: 145,
            interior: 115,
            exterior: 75,
            correction: 280,
            ceramic: 175
        },
        sedan: {
            ultimate: 175,
            interior: 125,
            exterior: 85,
            correction: 340,
            ceramic: 205
        },
        suv5: {
            ultimate: 195,
            interior: 150,
            exterior: 95,
            correction: 410,
            ceramic: 275
        },
        suv7: {
            ultimate: 225,
            interior: 170,
            exterior: 110,
            correction: 460,
            ceramic: 305
        },
        truck: {
            ultimate: 225,
            interior: 170,
            exterior: 110,
            correction: 420,
            ceramic: 305
        }
    };

    function calculateQuote() {
        const vehicle = vehicleType.value;
        if (!vehicle || !pricing[vehicle]) {
            quoteAmount.textContent = '$0';
            return;
        }
        let total = 0;
        serviceCheckboxes.forEach(cb => {
            if (cb.checked) {
                total += pricing[vehicle][cb.value] || 0;
            }
        });
        quoteAmount.textContent = `$${total}`;
    }

    vehicleType.addEventListener('change', calculateQuote);
    serviceCheckboxes.forEach(cb => cb.addEventListener('change', calculateQuote));

    // Save booking details on submit
    const bookingForm = document.getElementById('booking-form');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalForm = document.getElementById('modal-form');
    const thankYouModal = document.getElementById('thank-you-modal');
    const closeThankYouBtn = document.getElementById('close-thank-you');

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        bookingModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', function() {
        bookingModal.style.display = 'none';
    });

    closeThankYouBtn.addEventListener('click', function() {
        thankYouModal.style.display = 'none';
    });

    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    thankYouModal.addEventListener('click', function(e) {
        if (e.target === thankYouModal) {
            thankYouModal.style.display = 'none';
        }
    });

    modalForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get all selected services
        const selectedServices = Array.from(serviceCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.nextElementSibling.textContent)
            .join(', ');

        // Get the message and format it properly
        const message = document.getElementById('modal-message').value.trim();
        const formattedMessage = message ? `\n\nAdditional Notes:\n${message}` : '';

        // Prepare the data
        const formData = {
            name: document.getElementById('modal-name').value,
            phone: document.getElementById('modal-phone').value,
            address: document.getElementById('modal-address').value,
            vehicleType: vehicleType.value,
            date: document.getElementById('date-picker').value,
            time: document.getElementById('time-picker').value,
            services: selectedServices,
            quoteAmount: document.getElementById('quote-amount').textContent,
            message: formattedMessage
        };

        try {
            const response = await fetch('https://formspree.io/f/mzzrykqg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                bookingModal.style.display = 'none';
                thankYouModal.style.display = 'flex';
                bookingForm.reset();
                modalForm.reset();
                document.getElementById('quote-amount').textContent = '$0';
            } else {
                alert('There was an error submitting your booking. Please try again.');
            }
        } catch (error) {
            alert('There was an error submitting your booking. Please try again.');
        }
    });

    // Add smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.video-section, .testimonials, .booking-section').forEach(section => {
        observer.observe(section);
    });

    // Header background slideshow
    const slides = document.querySelectorAll('.header-bg-slide');
    let currentSlideIdx = 0;
    setInterval(() => {
        slides[currentSlideIdx].classList.remove('active');
        currentSlideIdx = (currentSlideIdx + 1) % slides.length;
        slides[currentSlideIdx].classList.add('active');
    }, 5000);

    // Modern navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-container');
        if (window.scrollY > 30) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Intro Slider Functionality ---
    const introSlides = document.querySelectorAll('.intro-slider .slide');
    const introPrevBtn = document.querySelector('.intro-slider .prev-btn');
    const introNextBtn = document.querySelector('.intro-slider .next-btn');
    let introCurrentSlide = 0;

    function showIntroSlide(index) {
      introSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
    if (introPrevBtn && introNextBtn && introSlides.length > 0) {
      introPrevBtn.addEventListener('click', () => {
        introCurrentSlide = (introCurrentSlide - 1 + introSlides.length) % introSlides.length;
        showIntroSlide(introCurrentSlide);
      });
      introNextBtn.addEventListener('click', () => {
        introCurrentSlide = (introCurrentSlide + 1) % introSlides.length;
        showIntroSlide(introCurrentSlide);
      });
    }

    // Ensure the 'Get Your Free Quote' button scrolls to the booking form
    const getQuoteBtn = document.querySelector('.cta-button.primary');
    if (getQuoteBtn) {
        getQuoteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToBooking();
        });
    }
}); 