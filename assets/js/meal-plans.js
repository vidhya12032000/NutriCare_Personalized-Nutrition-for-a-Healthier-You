/* =========================================================
   NUTRICARE
   MEAL PLANS PAGE JAVASCRIPT
========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    function initIcons() {

        if (window.lucide) {
            lucide.createIcons();
        }

    }


    /* =====================================================
       FAQ
    ===================================================== */

    function initFAQ() {

        const questions =
            document.querySelectorAll(
                ".meal-faq-question"
            );


        questions.forEach(button => {

            button.addEventListener("click", () => {

                const currentItem =
                    button.closest(".meal-faq-item");


                if (!currentItem) {
                    return;
                }


                const isActive =
                    currentItem.classList.contains("active");


                /*
                 * Close all FAQ items
                 */

                document
                    .querySelectorAll(".meal-faq-item")
                    .forEach(item => {

                        item.classList.remove("active");


                        const question =
                            item.querySelector(
                                ".meal-faq-question"
                            );


                        if (question) {

                            question.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    });


                /*
                 * Open clicked item
                 */

                if (!isActive) {

                    currentItem.classList.add("active");


                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            });

        });

    }


    /* =====================================================
       SCROLL REVEAL FALLBACK
    ===================================================== */

    function initMealReveal() {

        const elements =
            document.querySelectorAll(".reveal");


        /*
         * Browser does not support
         * IntersectionObserver
         */

        if (!("IntersectionObserver" in window)) {

            elements.forEach(element => {

                element.classList.add("active");

            });

            return;
        }


        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "active"
                            );


                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        elements.forEach(element => {

            observer.observe(element);

        });

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    function initSmoothLinks() {

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        links.forEach(link => {

            link.addEventListener("click", event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#" ||
                    href.length <= 1
                ) {
                    return;
                }


                const target =
                    document.querySelector(href);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

    }


    /* =====================================================
       BUTTON FEEDBACK
    ===================================================== */

    function initBookingLinks() {

        const bookingLinks =
            document.querySelectorAll(
                'a[href="booking.html"]'
            );


        bookingLinks.forEach(link => {

            link.addEventListener("click", () => {

                /*
                 * Normal navigation is intentionally preserved.
                 * This function is only here for future
                 * booking integration.
                 */

                link.classList.add("is-loading");


                setTimeout(() => {

                    link.classList.remove(
                        "is-loading"
                    );

                }, 700);

            });

        });

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    initIcons();

    initFAQ();

    initMealReveal();

    initSmoothLinks();

    initBookingLinks();


});