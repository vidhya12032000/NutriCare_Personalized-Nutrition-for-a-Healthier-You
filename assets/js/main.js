/* =========================================================
   NUTRICARE
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initIcons();

    initHeader();

    initMobileMenu();

    initProfileMenu();

    initTheme();

    initRTL();

    initScrollProgress();

    initScrollReveal();

    initCounters();

    initFAQ();

    initTestimonials();

    initNewsletter();

    initBackToTop();

});


/* =========================================================
   LUCIDE ICONS
========================================================= */

function initIcons() {

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


/* =========================================================
   HEADER SCROLL
========================================================= */

function initHeader() {

    const header =
        document.getElementById("siteHeader");

    if (!header) return;


    const handleScroll = () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    handleScroll();

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        document.getElementById("mobileMenuBtn");

    const menu =
        document.getElementById("mobileNav");

    if (!button || !menu) return;


    button.addEventListener("click", () => {

        const isOpen =
            menu.classList.toggle("show");

        button.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );


        const icon =
            button.querySelector("svg");

        if (icon) {

            icon.remove();

        }


        button.innerHTML = isOpen
            ? `<i data-lucide="x"></i>`
            : `<i data-lucide="menu"></i>`;


        initIcons();

    });


    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("show");

            button.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

            button.innerHTML =
                `<i data-lucide="menu"></i>`;

            initIcons();

        });

    });

}


/* =========================================================
   PROFILE DROPDOWN
========================================================= */

function initProfileMenu() {

    const button =
        document.getElementById("profileButton");

    const dropdown =
        document.getElementById("profileDropdown");

    if (!button || !dropdown) return;


    button.addEventListener("click", event => {

        event.stopPropagation();

        dropdown.classList.toggle("show");

    });


    document.addEventListener("click", event => {

        if (
            !dropdown.contains(event.target) &&
            !button.contains(event.target)
        ) {

            dropdown.classList.remove("show");

        }

    });

}


/* =========================================================
   THEME
========================================================= */

function initTheme() {

    const button =
        document.getElementById("themeToggle");

    if (!button) return;


    const savedTheme =
        localStorage.getItem("nutricare-theme");


    if (
        savedTheme === "dark" ||
        (
            !savedTheme &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
        )
    ) {

        document.documentElement.classList.add("dark");

    }


    updateThemeIcon();


    button.addEventListener("click", () => {

        document.documentElement.classList.toggle(
            "dark"
        );


        const isDark =
            document.documentElement.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "nutricare-theme",
            isDark ? "dark" : "light"
        );


        updateThemeIcon();

    });


    function updateThemeIcon() {

        const isDark =
            document.documentElement.classList.contains(
                "dark"
            );


        button.innerHTML = isDark
            ? `<i data-lucide="sun"></i>`
            : `<i data-lucide="moon"></i>`;

        initIcons();

    }

}


/* =========================================================
   RTL / LTR
========================================================= */

function initRTL() {

    const button =
        document.getElementById("rtlToggle");

    if (!button) return;


    const savedDirection =
        localStorage.getItem(
            "nutricare-direction"
        );


    if (savedDirection === "rtl") {

        document.documentElement.dir = "rtl";

        updateRTLButton();

    }


    button.addEventListener("click", () => {

        const html =
            document.documentElement;

        const isRTL =
            html.dir === "rtl";


        html.dir =
            isRTL ? "ltr" : "rtl";


        localStorage.setItem(
            "nutricare-direction",
            html.dir
        );


        updateRTLButton();

    });


    function updateRTLButton() {

        const isRTL =
            document.documentElement.dir === "rtl";

        const label =
            button.querySelector(".rtl-label");

        if (label) {

            label.textContent =
                isRTL ? "LTR" : "RTL";

        }

    }

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    const progress =
        document.getElementById(
            "scrollProgress"
        );

    if (!progress) return;


    const updateProgress = () => {

        const scrollTop =
            window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (scrollHeight <= 0) {

            progress.style.width = "0%";

            return;

        }


        const percentage =
            (scrollTop / scrollHeight) * 100;


        progress.style.width =
            `${percentage}%`;

    };


    updateProgress();


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(counter => {

            counter.textContent =
                counter.dataset.target;

        });

        return;

    }


    const animateCounter = counter => {

        const target =
            Number(
                counter.dataset.target
            );


        const duration = 1600;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const current =
                Math.floor(
                    eased * target
                );


            counter.textContent =
                current.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }


        requestAnimationFrame(update);

    };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .7
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) return;


        question.addEventListener(
            "click",
            () => {

                const wasActive =
                    item.classList.contains(
                        "active"
                    );


                faqItems.forEach(other => {

                    other.classList.remove(
                        "active"
                    );

                });


                if (!wasActive) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    });

}


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

function initTestimonials() {

    const track =
        document.getElementById(
            "testimonialTrack"
        );

    const prev =
        document.getElementById(
            "testimonialPrev"
        );

    const next =
        document.getElementById(
            "testimonialNext"
        );


    if (!track || !prev || !next) return;


    const slides =
        track.querySelectorAll(
            ".testimonial-card"
        );


    if (slides.length <= 1) {

        prev.disabled = true;
        next.disabled = true;

        return;

    }


    let currentIndex = 0;


    const updateSlider = () => {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

    };


    next.addEventListener(
        "click",
        () => {

            currentIndex =
                (currentIndex + 1) %
                slides.length;

            updateSlider();

        }
    );


    prev.addEventListener(
        "click",
        () => {

            currentIndex =
                (currentIndex - 1 + slides.length) %
                slides.length;

            updateSlider();

        }
    );


    let autoplay =
        setInterval(() => {

            currentIndex =
                (currentIndex + 1) %
                slides.length;

            updateSlider();

        }, 6000);


    track.addEventListener(
        "mouseenter",
        () => {

            clearInterval(autoplay);

        }
    );


    track.addEventListener(
        "mouseleave",
        () => {

            autoplay =
                setInterval(() => {

                    currentIndex =
                        (currentIndex + 1) %
                        slides.length;

                    updateSlider();

                }, 6000);

        }
    );

}


/* =========================================================
   NEWSLETTER
========================================================= */

function initNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "newsletterEmail"
                );


            if (
                !email ||
                !email.value.trim()
            ) {

                showToast(
                    "Please enter your email address."
                );

                return;

            }


            if (
                !isValidEmail(
                    email.value
                )
            ) {

                showToast(
                    "Please enter a valid email."
                );

                email.focus();

                return;

            }


            showToast(
                "You're subscribed to NutriCare!"
            );


            form.reset();

        }
    );

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    if (!toast || !messageElement) return;


    messageElement.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3500);

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.addEventListener(
    "error",
    event => {

        if (
            event.target.tagName === "IMG"
        ) {

            event.target.style.opacity =
                "0.5";

        }

    },
    true
);