/* =========================================================
   NUTRICARE
   SERVICES PAGE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initServicesIcons();
    initServicesReveal();
    initServiceFilters();
    initServiceFAQ();
    initServicesBackToTop();
    initServicesSmoothLinks();

});


/* =========================================================
   01. LUCIDE ICONS
========================================================= */

function initServicesIcons() {

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


/* =========================================================
   02. SCROLL REVEAL
========================================================= */

function initServicesReveal() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;


    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "visible"
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -45px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   03. SERVICE FILTER
========================================================= */

function initServiceFilters() {

    const filters =
        document.querySelectorAll(
            ".service-filter"
        );

    const cards =
        document.querySelectorAll(
            ".service-card"
        );

    const emptyState =
        document.getElementById(
            "servicesEmpty"
        );


    if (
        !filters.length ||
        !cards.length
    ) {
        return;
    }


    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                const selectedCategory =
                    filter.dataset.filter;


                /*
                 * Update active button
                 */

                filters.forEach(button => {

                    button.classList.remove(
                        "active"
                    );

                });

                filter.classList.add(
                    "active"
                );


                let visibleCount = 0;


                /*
                 * Filter cards
                 */

                cards.forEach(card => {

                    const category =
                        card.dataset.category;


                    const shouldShow =
                        selectedCategory === "all" ||
                        category === selectedCategory;


                    if (shouldShow) {

                        card.classList.remove(
                            "is-hidden"
                        );

                        visibleCount++;

                    } else {

                        card.classList.add(
                            "is-hidden"
                        );

                    }

                });


                /*
                 * Empty state
                 */

                if (emptyState) {

                    if (visibleCount === 0) {

                        emptyState.classList.add(
                            "show"
                        );

                    } else {

                        emptyState.classList.remove(
                            "show"
                        );

                    }

                }


                /*
                 * Re-render icons because
                 * hidden/visible elements may
                 * affect dynamic DOM states.
                 */

                if (
                    typeof lucide !== "undefined"
                ) {

                    lucide.createIcons();

                }

            }
        );

    });

}


/* =========================================================
   04. FAQ ACCORDION
========================================================= */

function initServiceFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    if (!faqItems.length) return;


    faqItems.forEach(item => {

        const button =
            item.querySelector(
                ".faq-question"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains(
                        "active"
                    );


                /*
                 * Close all other items
                 */

                faqItems.forEach(otherItem => {

                    otherItem.classList.remove(
                        "active"
                    );


                    const otherButton =
                        otherItem.querySelector(
                            ".faq-question"
                        );


                    if (otherButton) {

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                });


                /*
                 * Open clicked item
                 */

                if (!isActive) {

                    item.classList.add(
                        "active"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });

}


/* =========================================================
   05. BACK TO TOP
========================================================= */

function initServicesBackToTop() {

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (!backToTop) return;


    const updateButton = () => {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    };


    updateButton();


    window.addEventListener(
        "scroll",
        updateButton,
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
   06. SMOOTH INTERNAL LINKS
========================================================= */

function initServicesSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   07. KEYBOARD ACCESSIBILITY FOR FILTERS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Enter" &&
            event.key !== " "
        ) {
            return;
        }


        const filter =
            document.activeElement;


        if (
            filter &&
            filter.classList.contains(
                "service-filter"
            )
        ) {

            event.preventDefault();

            filter.click();

        }

    }
);


/* =========================================================
   08. REDUCED MOTION
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document.documentElement.style
        .scrollBehavior = "auto";

}