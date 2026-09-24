/* =========================================================
   NUTRICARE
   HEALTH ASSESSMENT JAVASCRIPT
========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const form =
        document.getElementById("assessmentForm");


    const panels =
        document.querySelectorAll(".assessment-panel");


    const steps =
        document.querySelectorAll(".assessment-step");


    const progressText =
        document.getElementById("progressText");


    const progressBar =
        document.getElementById("progressBar");


    const prevButton =
        document.getElementById("prevStep");


    const nextButton =
        document.getElementById("nextStep");


    const submitButton =
        document.getElementById("submitAssessment");


    const reviewList =
        document.getElementById("reviewList");


    const successSection =
        document.getElementById("assessmentSuccess");


    const totalSteps =
        panels.length;


    let currentStep = 1;



    /* =====================================================
       ICONS
    ===================================================== */

    function initIcons() {

        if (window.lucide) {

            lucide.createIcons();

        }

    }



    /* =====================================================
       SESSION STORAGE
    ===================================================== */

    const STORAGE_KEY =
        "nutricareAssessment";


    function saveProgress() {

        if (!form) {
            return;
        }


        const formData =
            new FormData(form);


        const data = {};


        formData.forEach((value, key) => {

            if (data[key]) {

                if (!Array.isArray(data[key])) {

                    data[key] = [data[key]];

                }

                data[key].push(value);

            } else {

                data[key] = value;

            }

        });


        sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

    }


    function restoreProgress() {

        const stored =
            sessionStorage.getItem(STORAGE_KEY);


        if (!stored || !form) {
            return;
        }


        let data;


        try {

            data = JSON.parse(stored);

        } catch (error) {

            return;

        }


        Object.entries(data).forEach(
            ([name, value]) => {

                const fields =
                    form.querySelectorAll(
                        `[name="${name}"]`
                    );


                if (!fields.length) {
                    return;
                }


                fields.forEach(field => {

                    if (
                        field.type === "radio" ||
                        field.type === "checkbox"
                    ) {

                        const values =
                            Array.isArray(value)
                                ? value
                                : [value];


                        field.checked =
                            values.includes(field.value);

                    } else {

                        field.value = value;

                    }

                });

            }
        );

    }



    /* =====================================================
       PROGRESS
    ===================================================== */

    function updateProgress() {

        const percentage =
            (currentStep / totalSteps) * 100;


        if (progressBar) {

            progressBar.style.width =
                `${percentage}%`;

        }


        if (progressText) {

            progressText.textContent =
                `${currentStep} of ${totalSteps}`;

        }


        steps.forEach(step => {

            const stepNumber =
                Number(
                    step.dataset.step
                );


            step.classList.toggle(
                "active",
                stepNumber === currentStep
            );


            step.classList.toggle(
                "completed",
                stepNumber < currentStep
            );

        });


        if (prevButton) {

            prevButton.style.visibility =
                currentStep === 1
                    ? "hidden"
                    : "visible";

        }


        if (nextButton) {

            nextButton.style.display =
                currentStep === totalSteps
                    ? "none"
                    : "inline-flex";

        }


        if (submitButton) {

            submitButton.style.display =
                currentStep === totalSteps
                    ? "inline-flex"
                    : "none";

        }

    }



    /* =====================================================
       SHOW STEP
    ===================================================== */

    function showStep(stepNumber) {

        if (
            stepNumber < 1 ||
            stepNumber > totalSteps
        ) {
            return;
        }


        currentStep = stepNumber;


        panels.forEach(panel => {

            const panelNumber =
                Number(
                    panel.dataset.panel
                );


            panel.classList.toggle(
                "active",
                panelNumber === currentStep
            );

        });


        updateProgress();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        saveProgress();

    }



    /* =====================================================
       ERROR HELPERS
    ===================================================== */

    function clearErrors() {

        document
            .querySelectorAll(".field-error")
            .forEach(error => {

                error.textContent = "";

            });


        document
            .querySelectorAll(".invalid")
            .forEach(element => {

                element.classList.remove(
                    "invalid"
                );

            });

    }


    function showError(id, message) {

        const element =
            document.getElementById(id);


        if (element) {

            element.textContent =
                message;

        }

    }



    /* =====================================================
       STEP 1 VALIDATION
    ===================================================== */

    function validateStepOne() {

        let valid = true;


        const fullName =
            document.getElementById("fullName");


        const email =
            document.getElementById("email");


        const age =
            document.getElementById("age");


        if (
            !fullName.value.trim()
        ) {

            showError(
                "fullNameError",
                "Please enter your name."
            );

            fullName.classList.add(
                "invalid"
            );

            valid = false;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !email.value.trim()
        ) {

            showError(
                "emailError",
                "Please enter your email."
            );

            email.classList.add(
                "invalid"
            );

            valid = false;

        } else if (
            !emailPattern.test(
                email.value.trim()
            )
        ) {

            showError(
                "emailError",
                "Please enter a valid email."
            );

            email.classList.add(
                "invalid"
            );

            valid = false;

        }


        const ageValue =
            Number(age.value);


        if (
            !age.value ||
            ageValue < 13 ||
            ageValue > 100
        ) {

            showError(
                "ageError",
                "Please enter an age between 13 and 100."
            );

            age.classList.add(
                "invalid"
            );

            valid = false;

        }


        return valid;

    }



    /* =====================================================
       STEP 2 VALIDATION
    ===================================================== */

    function validateStepTwo() {

        const selected =
            document.querySelector(
                'input[name="goal"]:checked'
            );


        if (!selected) {

            showError(
                "goalError",
                "Please select a primary goal."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       STEP 4 VALIDATION
    ===================================================== */

    function validateStepFour() {

        const selected =
            document.querySelector(
                'input[name="activity"]:checked'
            );


        if (!selected) {

            showError(
                "activityError",
                "Please select your activity level."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       STEP 7 VALIDATION
    ===================================================== */

    function validateStepSeven() {

        const consent =
            document.getElementById(
                "assessmentConsent"
            );


        if (!consent.checked) {

            showError(
                "consentError",
                "Please confirm the statement before completing the assessment."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       STEP VALIDATION
    ===================================================== */

    function validateCurrentStep() {

        clearErrors();


        switch (currentStep) {

            case 1:
                return validateStepOne();

            case 2:
                return validateStepTwo();

            case 4:
                return validateStepFour();

            case 7:
                return validateStepSeven();

            default:
                return true;

        }

    }



    /* =====================================================
       GET FORM VALUE
    ===================================================== */

    function getValue(name) {

        const field =
            form.querySelector(
                `[name="${name}"]:checked`
            );


        if (field) {
            return field.value;
        }


        const normalField =
            form.querySelector(
                `[name="${name}"]`
            );


        return normalField
            ? normalField.value
            : "";

    }



    /* =====================================================
       GET CHECKBOX VALUES
    ===================================================== */

    function getCheckboxValues(name) {

        return [
            ...form.querySelectorAll(
                `input[name="${name}"]:checked`
            )
        ].map(
            input => input.value
        );

    }



    /* =====================================================
       FORMAT VALUES
    ===================================================== */

    function formatValue(value) {

        if (!value) {
            return "Not specified";
        }


        const labels = {

            "weight-management":
                "Weight Management",

            "muscle-building":
                "Strength & Muscle",

            performance:
                "Performance",

            wellness:
                "Everyday Wellness",

            family:
                "Family Nutrition",

            "meal-planning":
                "Meal Planning",

            vegetarian:
                "Vegetarian",

            "non-vegetarian":
                "Non-vegetarian",

            vegan:
                "Vegan",

            flexible:
                "Flexible",

            low:
                "Low",

            light:
                "Lightly active",

            moderate:
                "Moderate",

            high:
                "Highly active",

            "meal-plan":
                "Personalized meal plans",

            recipes:
                "Recipe ideas",

            grocery:
                "Grocery guidance",

            habit:
                "Habit coaching",

            performance:
                "Performance nutrition",

            family:
                "Family meal planning"

        };


        return labels[value] || value;

    }



    /* =====================================================
       REVIEW
    ===================================================== */

    function buildReview() {

        if (!reviewList) {
            return;
        }


        const support =
            getCheckboxValues(
                "support"
            );


        const rows = [

            [
                "Full name",
                getValue("fullName")
            ],

            [
                "Email",
                getValue("email")
            ],

            [
                "Age",
                getValue("age")
            ],

            [
                "Gender",
                formatValue(
                    getValue("gender")
                )
            ],

            [
                "Primary goal",
                formatValue(
                    getValue("goal")
                )
            ],

            [
                "Eating pattern",
                formatValue(
                    getValue("dietPattern")
                )
            ],

            [
                "Meals per day",
                getValue("mealFrequency")
            ],

            [
                "Activity level",
                formatValue(
                    getValue("activity")
                )
            ],

            [
                "Exercise",
                getValue(
                    "exerciseFrequency"
                )
            ],

            [
                "Sleep",
                getValue("sleep")
            ],

            [
                "Water intake",
                getValue("water")
            ],

            [
                "Stress",
                formatValue(
                    getValue("stress")
                )
            ],

            [
                "Meal routine",
                formatValue(
                    getValue("routine")
                )
            ],

            [
                "Support requested",
                support.length
                    ? support
                        .map(formatValue)
                        .join(", ")
                    : "Not specified"
            ]

        ];


        reviewList.innerHTML =
            rows.map(row => {

                return `
                    <div class="review-item">

                        <strong>
                            ${row[0]}
                        </strong>

                        <span>
                            ${escapeHTML(
                                String(row[1] || "Not specified")
                            )}
                        </span>

                    </div>
                `;

            }).join("");

    }



    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }



    /* =====================================================
       STEP NAVIGATION
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    !validateCurrentStep()
                ) {
                    return;
                }


                if (
                    currentStep + 1 === totalSteps
                ) {

                    buildReview();

                }


                showStep(
                    currentStep + 1
                );

            }
        );

    }



    /* =====================================================
       BACK
    ===================================================== */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                showStep(
                    currentStep - 1
                );

            }
        );

    }



    /* =====================================================
       SIDEBAR STEP CLICK
    ===================================================== */

    steps.forEach(step => {

        step.addEventListener(
            "click",
            () => {

                const target =
                    Number(
                        step.dataset.step
                    );


                /*
                 * Don't allow skipping ahead
                 * without completing the current step.
                 */

                if (
                    target > currentStep
                ) {

                    if (
                        !validateCurrentStep()
                    ) {
                        return;
                    }

                }


                if (
                    target === 7
                ) {

                    buildReview();

                }


                showStep(target);

            }
        );

    });



    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    !validateCurrentStep()
                ) {
                    return;
                }


                saveProgress();


                const assessmentData =
                    sessionStorage.getItem(
                        STORAGE_KEY
                    );


                /*
                 * Demo front-end behavior.
                 *
                 * In a real project this data can be
                 * POSTed to a backend API here.
                 */

                console.log(
                    "NutriCare Assessment:",
                    assessmentData
                );


                form.parentElement.style.display =
                    "none";


                const sidebar =
                    document.querySelector(
                        ".assessment-sidebar"
                    );


                if (sidebar) {
                    sidebar.style.display = "none";
                }


                successSection.classList.add(
                    "show"
                );


                successSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                sessionStorage.removeItem(
                    STORAGE_KEY
                );

            }
        );

    }



    /* =====================================================
       AUTO SAVE
    ===================================================== */

    if (form) {

        form.addEventListener(
            "input",
            () => {

                saveProgress();

            }
        );


        form.addEventListener(
            "change",
            () => {

                saveProgress();

            }
        );

    }



    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    function initReveal() {

        const elements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(element => {

                element.classList.add(
                    "active"
                );

            });

            return;

        }


        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

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
                    threshold: .12
                }
            );


        elements.forEach(element => {

            observer.observe(element);

        });

    }



    /* =====================================================
       INITIALIZE
    ===================================================== */

    restoreProgress();

    updateProgress();

    initIcons();

    initReveal();

});