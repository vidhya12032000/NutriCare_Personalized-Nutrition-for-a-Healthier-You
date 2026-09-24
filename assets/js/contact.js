/* =========================================================
   NUTRICARE
   CONTACT PAGE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initContactIcons();
    initContactForm();
    initMessageCounter();
    initContactReveal();

});


/* =========================================================
   LUCIDE ICONS
========================================================= */

function initContactIcons() {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;


    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const phoneInput = document.getElementById("contactPhone");
    const topicInput = document.getElementById("contactTopic");
    const messageInput = document.getElementById("contactMessage");
    const consentInput = document.getElementById("contactConsent");


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        clearErrors();


        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const topic = topicInput.value;
        const message = messageInput.value.trim();


        let isValid = true;


        /* NAME */

        if (name.length < 2) {

            showFieldError(
                "contactName",
                "contactNameError",
                "Please enter your full name."
            );

            isValid = false;
        }


        /* EMAIL */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showFieldError(
                "contactEmail",
                "contactEmailError",
                "Please enter a valid email address."
            );

            isValid = false;
        }


        /* PHONE */

        if (phone !== "") {

            const phonePattern =
                /^[+]?[\d\s()-]{7,18}$/;

            if (!phonePattern.test(phone)) {

                showFieldError(
                    "contactPhone",
                    "contactPhoneError",
                    "Please enter a valid phone number."
                );

                isValid = false;
            }

        }


        /* TOPIC */

        if (!topic) {

            showFieldError(
                "contactTopic",
                "contactTopicError",
                "Please select a topic."
            );

            isValid = false;
        }


        /* MESSAGE */

        if (message.length < 10) {

            showFieldError(
                "contactMessage",
                "contactMessageError",
                "Please enter at least 10 characters."
            );

            isValid = false;
        }


        /* CONSENT */

        if (!consentInput.checked) {

            showToast(
                "Please confirm that we can contact you."
            );

            isValid = false;
        }


        if (!isValid) return;


        /* SUCCESS */

        const submitButton =
            form.querySelector("button[type='submit']");

        const originalHTML = submitButton.innerHTML;


        submitButton.disabled = true;

        submitButton.innerHTML = `
            Sending...
            <i data-lucide="loader-circle"></i>
        `;


        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }


        /*
         * Demo submission delay.
         * Replace this section later with fetch()
         * when connecting a real backend/API.
         */

        setTimeout(() => {

            submitButton.disabled = false;
            submitButton.innerHTML = originalHTML;

            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }


            form.reset();

            updateMessageCounter();


            showToast(
                "Thanks! Your message has been sent successfully."
            );

        }, 1200);

    });


    /* Clear individual error on input */

    [
        nameInput,
        emailInput,
        phoneInput,
        topicInput,
        messageInput
    ].forEach((field) => {

        field.addEventListener("input", () => {

            clearFieldError(field);

        });

        field.addEventListener("change", () => {

            clearFieldError(field);

        });

    });

}


/* =========================================================
   ERROR HELPERS
========================================================= */

function showFieldError(
    inputId,
    errorId,
    message
) {

    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    if (!input || !error) return;


    const group = input.closest(".form-group");

    if (group) {
        group.classList.add("invalid");
    }


    error.textContent = message;

}


function clearFieldError(input) {

    if (!input) return;


    const group = input.closest(".form-group");

    if (group) {
        group.classList.remove("invalid");
    }


    const errorId =
        `${input.id}Error`;

    const error =
        document.getElementById(errorId);

    if (error) {
        error.textContent = "";
    }

}


function clearErrors() {

    document
        .querySelectorAll(".form-group.invalid")
        .forEach((group) => {
            group.classList.remove("invalid");
        });


    document
        .querySelectorAll(".field-error")
        .forEach((error) => {
            error.textContent = "";
        });

}


/* =========================================================
   MESSAGE COUNTER
========================================================= */

function initMessageCounter() {

    const textarea =
        document.getElementById("contactMessage");

    const counter =
        document.getElementById("messageCounter");


    if (!textarea || !counter) return;


    textarea.addEventListener(
        "input",
        updateMessageCounter
    );


    updateMessageCounter();

}


function updateMessageCounter() {

    const textarea =
        document.getElementById("contactMessage");

    const counter =
        document.getElementById("messageCounter");


    if (!textarea || !counter) return;


    counter.textContent =
        `${textarea.value.length} / 500`;

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /*
     * Use global main.js toast if available.
     */

    if (
        typeof window.showToast === "function"
    ) {

        window.showToast(message);
        return;

    }


    if (!toast || !toastMessage) return;


    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(
        window.contactToastTimer
    );


    window.contactToastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initContactReveal() {

    const elements =
        document.querySelectorAll(".contact-hero .reveal, .contact-info-card.reveal, .contact-form-card.reveal, .contact-side.reveal, .location-card.reveal, .final-cta .reveal");


    if (!elements.length) return;


    /*
     * main.js already contains global reveal support.
     * Only use this fallback when elements have not
     * already been revealed by the shared script.
     */

    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

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
                    threshold: 0.12
                }
            );


        elements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        elements.forEach((element) => {

            element.classList.add("visible");

        });

    }

}