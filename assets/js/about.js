/* =========================================================
   NUTRICARE
   ABOUT PAGE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initAboutIcons();
    initAboutReveal();
    initAboutCounters();
    initAboutHeaderEffects();
    initAboutBackToTop();
    initAboutParallax();

});


/* =========================================================
   01. LUCIDE ICONS
========================================================= */

function initAboutIcons() {

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


/* =========================================================
   02. SCROLL REVEAL
========================================================= */

function initAboutReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");

    if (!revealElements.length) return;


    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

        return;

    }


    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observerInstance.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   03. COUNTERS
========================================================= */

function initAboutCounters() {

    const counters =
        document.querySelectorAll(".counter");

    if (!counters.length) return;


    const animateCounter = counter => {

        const target =
            Number(counter.dataset.target);

        if (Number.isNaN(target)) return;


        const duration = 1600;

        const startTime = performance.now();


        const update = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /*
             * Ease-out animation
             */
            const eased =
                1 - Math.pow(1 - progress, 3);


            const currentValue =
                Math.floor(target * eased);


            counter.textContent =
                currentValue.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        };


        requestAnimationFrame(update);

    };


    if (!("IntersectionObserver" in window)) {

        counters.forEach(counter => {

            counter.textContent =
                Number(counter.dataset.target)
                    .toLocaleString();

        });

        return;

    }


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    animateCounter(entry.target);

                    counterObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/* =========================================================
   04. HEADER SCROLL EFFECT
========================================================= */

function initAboutHeaderEffects() {

    const header =
        document.getElementById("siteHeader");

    if (!header) return;


    const updateHeader = () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   05. BACK TO TOP
========================================================= */

function initAboutBackToTop() {

    const backToTop =
        document.getElementById("backToTop");

    if (!backToTop) return;


    const toggleButton = () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    };


    window.addEventListener(
        "scroll",
        toggleButton,
        {
            passive: true
        }
    );


    backToTop.addEventListener(
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
   06. SUBTLE HERO PARALLAX
========================================================= */

function initAboutParallax() {

    const visual =
        document.querySelector(".about-hero-visual");

    if (!visual) return;


    /*
     * Disable on touch devices.
     */
    const isTouch =
        window.matchMedia(
            "(hover: none)"
        ).matches;

    if (isTouch) return;


    let ticking = false;


    const updateParallax = () => {

        const scrollY =
            window.scrollY;

        if (scrollY > 650) {

            ticking = false;
            return;

        }


        const mainImage =
            visual.querySelector(
                ".about-image-main"
            );

        const smallImage =
            visual.querySelector(
                ".about-image-small"
            );

        const floatingCard =
            visual.querySelector(
                ".about-floating-card"
            );


        if (mainImage) {

            mainImage.style.transform =
                `translateY(${scrollY * 0.035}px)`;

        }


        if (smallImage) {

            smallImage.style.transform =
                `translateY(${scrollY * -0.025}px)`;

        }


        if (floatingCard) {

            floatingCard.style.transform =
                `translateY(${scrollY * -0.04}px)`;

        }


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   07. SMOOTH INTERNAL LINKS
========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );

        if (!link) return;


        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);

        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================================================
   08. REDUCE MOTION
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document.documentElement.style
        .scrollBehavior = "auto";

}