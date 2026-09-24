/* =========================================================
   NUTRICARE BLOG PAGE
   BLOG JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initBlogIcons();
    initBlogSearch();
    initCategoryFilter();
    initNewsletter();
    initBlogReveal();
    initBlogRTL();
    initSearchShortcut();

});


/* =========================================================
   01. LUCIDE ICONS
========================================================= */

function initBlogIcons() {

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


/* =========================================================
   02. BLOG SEARCH + FILTER
========================================================= */

function initBlogSearch() {

    const searchInput =
        document.getElementById("blogSearch");

    const clearButton =
        document.getElementById("clearSearch");

    const articleGrid =
        document.getElementById("articlesGrid");

    const noResults =
        document.getElementById("noResults");

    const resetButton =
        document.getElementById("resetFilters");


    if (!searchInput || !articleGrid) {
        return;
    }


    const articles =
        Array.from(
            articleGrid.querySelectorAll(".article-card")
        );


    /* =====================================================
       GET ACTIVE CATEGORY
    ===================================================== */

    function getActiveCategory() {

        const activeButton =
            document.querySelector(
                ".category-btn.active"
            );


        return activeButton
            ? activeButton.dataset.category || "all"
            : "all";

    }


    /* =====================================================
       FILTER ARTICLES
    ===================================================== */

    function filterArticles() {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        const activeCategory =
            getActiveCategory();


        let visibleCount = 0;


        articles.forEach((article) => {

            /* ---------------------------------------------
               ARTICLE TITLE
            --------------------------------------------- */

            const title =
                article.dataset.title ||
                article.querySelector(".article-title")
                    ?.textContent ||
                "";


            /* ---------------------------------------------
               ARTICLE CONTENT
            --------------------------------------------- */

            const content =
                article.textContent || "";


            /* ---------------------------------------------
               ARTICLE CATEGORY
            --------------------------------------------- */

            const category =
                article.dataset.category || "all";


            /* ---------------------------------------------
               SEARCHABLE CONTENT
            --------------------------------------------- */

            const searchableText =
                `${title} ${content}`.toLowerCase();


            /* ---------------------------------------------
               SEARCH MATCH
            --------------------------------------------- */

            const matchesSearch =
                searchTerm === "" ||
                searchableText.includes(searchTerm);


            /* ---------------------------------------------
               CATEGORY MATCH
            --------------------------------------------- */

            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;


            /* ---------------------------------------------
               FINAL MATCH
            --------------------------------------------- */

            const shouldShow =
                matchesSearch &&
                matchesCategory;


            if (shouldShow) {

                article.classList.remove(
                    "is-hidden"
                );

                visibleCount++;

            } else {

                article.classList.add(
                    "is-hidden"
                );

            }

        });


        /* =================================================
           CLEAR SEARCH BUTTON
        ================================================= */

        if (clearButton) {

            clearButton.classList.toggle(
                "show",
                searchTerm.length > 0
            );

        }


        /* =================================================
           NO RESULTS
        ================================================= */

        if (noResults) {

            noResults.classList.toggle(
                "show",
                visibleCount === 0
            );

        }

    }


    /* =====================================================
       SEARCH INPUT
    ===================================================== */

    searchInput.addEventListener(
        "input",
        filterArticles
    );


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                searchInput.focus();

                filterArticles();

            }
        );

    }


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                /* Clear search */

                searchInput.value = "";


                /* Find ALL button */

                const allButton =
                    document.querySelector(
                        '.category-btn[data-category="all"]'
                    );


                /* Reset category */

                if (allButton) {

                    document
                        .querySelectorAll(".category-btn")
                        .forEach((button) => {

                            button.classList.remove(
                                "active"
                            );

                        });


                    allButton.classList.add(
                        "active"
                    );

                }


                /* Apply filters */

                filterArticles();

            }
        );

    }


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterArticles();

}


/* =========================================================
   03. CATEGORY FILTER
========================================================= */

function initCategoryFilter() {

    const categoryFilter =
        document.getElementById("categoryFilter");


    if (!categoryFilter) {
        return;
    }


    const categoryButtons =
        categoryFilter.querySelectorAll(
            ".category-btn"
        );


    categoryButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                /* Remove active from all */

                categoryButtons.forEach((btn) => {

                    btn.classList.remove(
                        "active"
                    );

                });


                /* Add active to clicked button */

                button.classList.add(
                    "active"
                );


                /* Re-run search/filter */

                const searchInput =
                    document.getElementById(
                        "blogSearch"
                    );


                if (searchInput) {

                    searchInput.dispatchEvent(
                        new Event("input")
                    );

                }

            }
        );

    });

}


/* =========================================================
   04. NEWSLETTER
========================================================= */

function initNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );


    const emailInput =
        document.getElementById(
            "newsletterEmail"
        );


    if (!form || !emailInput) {
        return;
    }


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const email =
                emailInput.value.trim();


            /* =================================================
               CORRECT EMAIL REGEX
            ================================================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            /* =================================================
               EMPTY EMAIL
            ================================================= */

            if (!email) {

                showBlogToast(
                    "Please enter your email address."
                );

                emailInput.focus();

                return;

            }


            /* =================================================
               INVALID EMAIL
            ================================================= */

            if (!emailPattern.test(email)) {

                showBlogToast(
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;

            }


            /* =================================================
               SUCCESS
            ================================================= */

            showBlogToast(
                "Thank you! You are now subscribed."
            );


            form.reset();

        }
    );

}


/* =========================================================
   05. TOAST
========================================================= */

function showBlogToast(message) {

    /*
       Use global NutriCare toast from main.js
       when available.
    */

    if (typeof showToast === "function") {

        showToast(message);

        return;

    }


    /* =====================================================
       FALLBACK TOAST
    ===================================================== */

    const toast =
        document.getElementById("toast");


    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    if (!toast || !toastMessage) {
        return;
    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3000);

}


/* =========================================================
   06. SCROLL REVEAL
========================================================= */

function initBlogReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!revealElements.length) {
        return;
    }


    /* =====================================================
       BROWSER FALLBACK
    ===================================================== */

    if (
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer =
        new IntersectionObserver(
            (
                entries,
                observerInstance
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   07. RTL / LTR
========================================================= */

function initBlogRTL() {

    const rtlToggle =
        document.getElementById(
            "rtlToggle"
        );


    if (!rtlToggle) {
        return;
    }


    const html =
        document.documentElement;


    /* =====================================================
       RESTORE SAVED DIRECTION
    ===================================================== */

    const savedDirection =
        localStorage.getItem(
            "nutricare-direction"
        );


    if (savedDirection === "rtl") {

        html.setAttribute(
            "dir",
            "rtl"
        );


        rtlToggle.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        html.setAttribute(
            "dir",
            "ltr"
        );


        rtlToggle.setAttribute(
            "aria-pressed",
            "false"
        );

    }


    /* =====================================================
       RTL / LTR TOGGLE
    ===================================================== */

    rtlToggle.addEventListener(
        "click",
        () => {

            const currentDirection =
                html.getAttribute(
                    "dir"
                );


            const newDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";


            /* Set direction */

            html.setAttribute(
                "dir",
                newDirection
            );


            /* Save direction */

            localStorage.setItem(
                "nutricare-direction",
                newDirection
            );


            /* Accessibility */

            rtlToggle.setAttribute(
                "aria-pressed",
                newDirection === "rtl"
                    ? "true"
                    : "false"
            );


            /* Refresh Lucide icons */

            if (
                typeof lucide !== "undefined"
            ) {

                lucide.createIcons();

            }

        }
    );

}


/* =========================================================
   08. SEARCH KEYBOARD SHORTCUT
========================================================= */

function initSearchShortcut() {

    const searchInput =
        document.getElementById(
            "blogSearch"
        );


    if (!searchInput) {
        return;
    }


    document.addEventListener(
        "keydown",
        (event) => {

            const activeElement =
                document.activeElement;


            /* =================================================
               CHECK WHETHER USER IS TYPING
            ================================================= */

            const isTyping =
                activeElement &&
                (
                    activeElement.tagName ===
                        "INPUT" ||

                    activeElement.tagName ===
                        "TEXTAREA" ||

                    activeElement.tagName ===
                        "SELECT" ||

                    activeElement.isContentEditable
                );


            /* =================================================
               "/" → FOCUS SEARCH
            ================================================= */

            if (
                event.key === "/" &&
                !isTyping
            ) {

                event.preventDefault();

                searchInput.focus();

            }


            /* =================================================
               ESC → CLEAR SEARCH
            ================================================= */

            if (
                event.key === "Escape" &&
                document.activeElement ===
                    searchInput
            ) {

                if (
                    searchInput.value !== ""
                ) {

                    searchInput.value = "";

                    searchInput.dispatchEvent(
                        new Event("input")
                    );

                }

            }

        }
    );

}