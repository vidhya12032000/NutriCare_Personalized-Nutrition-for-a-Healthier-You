/* =========================================================
   NUTRICARE
   BOOKING PAGE JAVASCRIPT
   (loads after main.js)
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("bookingForm");

    if (!form) return;


    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const steps = [...document.querySelectorAll(".form-step")];
    const indicators = [...document.querySelectorAll(".step-item")];

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");

    const dateStrip = document.getElementById("dateStrip");
    const slotGrid = document.getElementById("slotGrid");

    const successBox = document.getElementById("bookingSuccess");
    const stepper = document.getElementById("stepper");

    const TOTAL_STEPS = steps.length;

    let currentStep = 1;

    const state = {
        service: "",
        mode: "",
        dietitian: "",
        dateISO: "",
        dateLabel: "",
        time: ""
    };


    /* -----------------------------------------------------
       HELPERS
    ----------------------------------------------------- */

    const toast = message => {

        if (typeof showToast === "function") {

            showToast(message);

        }

    };

    const refreshIcons = () => {

        if (typeof lucide !== "undefined") {

            lucide.createIcons();

        }

    };

    const pad = n => String(n).padStart(2, "0");

    const toISO = d =>
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;


    /* -----------------------------------------------------
       SUMMARY
    ----------------------------------------------------- */

    function setSummary(id, value) {

        const el = document.getElementById(id);

        if (!el) return;

        if (value) {

            el.textContent = value;
            el.classList.remove("empty");

        } else {

            el.textContent = "Not selected";
            el.classList.add("empty");

        }

    }

    function updateSummary() {

        setSummary("sumService", state.service);
        setSummary("sumMode", state.mode);
        setSummary("sumDietitian", state.dietitian);
        setSummary("sumDate", state.dateLabel);
        setSummary("sumTime", state.time);

    }


    /* -----------------------------------------------------
       STEP NAVIGATION
    ----------------------------------------------------- */

    function goToStep(n) {

        currentStep = n;

        steps.forEach((step, i) => {

            step.classList.toggle("active", i + 1 === n);

        });

        indicators.forEach((item, i) => {

            item.classList.toggle("active", i + 1 === n);
            item.classList.toggle("done", i + 1 < n);

        });

        prevBtn.hidden = n === 1;
        nextBtn.hidden = n === TOTAL_STEPS;
        submitBtn.hidden = n !== TOTAL_STEPS;

        stepper.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    function setFieldError(input, message) {

        const field = input.closest(".field");

        if (!field) return;

        let error = field.querySelector(".field-error");

        if (!error) {

            error = document.createElement("div");
            error.className = "field-error";
            field.appendChild(error);

        }

        if (message) {

            field.classList.add("invalid");
            error.textContent = message;

        } else {

            field.classList.remove("invalid");
            error.textContent = "";

        }

    }

    function validateDetails() {

        const name = form.fullName;
        const email = form.email;
        const phone = form.phone;
        const age = form.age;
        const terms = document.getElementById("terms");

        let valid = true;

        if (name.value.trim().length < 2) {

            setFieldError(name, "Please enter your full name.");
            valid = false;

        } else {

            setFieldError(name, "");

        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {

            setFieldError(email, "Please enter a valid email address.");
            valid = false;

        } else {

            setFieldError(email, "");

        }

        const digits = phone.value.replace(/\D/g, "");

        if (digits.length < 10 || digits.length > 13) {

            setFieldError(phone, "Please enter a valid phone number.");
            valid = false;

        } else {

            setFieldError(phone, "");

        }

        const ageValue = Number(age.value);

        if (!age.value || ageValue < 1 || ageValue > 120) {

            setFieldError(age, "Please enter a valid age.");
            valid = false;

        } else {

            setFieldError(age, "");

        }

        const termsRow = terms.closest(".check-row");

        if (!terms.checked) {

            termsRow.classList.add("invalid");
            valid = false;

        } else {

            termsRow.classList.remove("invalid");

        }

        if (!valid) {

            toast("Please fix the highlighted fields.");

            const firstInvalid = form.querySelector(".field.invalid input");

            if (firstInvalid) firstInvalid.focus();

        }

        return valid;

    }

    function validateStep(n) {

        switch (n) {

            case 1:

                if (!state.service) {
                    toast("Please select a service.");
                    return false;
                }

                if (!state.mode) {
                    toast("Please choose a consultation mode.");
                    return false;
                }

                return true;

            case 2:

                if (!state.dietitian) {
                    toast("Please choose a dietitian.");
                    return false;
                }

                return true;

            case 3:

                if (!state.dateISO) {
                    toast("Please select a date.");
                    return false;
                }

                if (!state.time) {
                    toast("Please select a time slot.");
                    return false;
                }

                return true;

            case 4:

                return validateDetails();

        }

        return true;

    }


    /* -----------------------------------------------------
       RADIO INPUTS (service / mode / dietitian)
    ----------------------------------------------------- */

    form.querySelectorAll('input[type="radio"]').forEach(input => {

        input.addEventListener("change", () => {

            state[input.name] = input.value;

            updateSummary();

        });

    });


    /* -----------------------------------------------------
       DATE STRIP
    ----------------------------------------------------- */

    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const MONTHS = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const FULL_DAYS = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    function buildDates() {

        dateStrip.innerHTML = "";

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let cursor = new Date(today);
        cursor.setDate(cursor.getDate() + 1);

        let added = 0;

        while (added < 14) {

            // Closed on Sundays
            if (cursor.getDay() !== 0) {

                const date = new Date(cursor);

                const button = document.createElement("button");

                button.type = "button";
                button.className = "date-chip";
                button.setAttribute("role", "radio");
                button.setAttribute("aria-checked", "false");
                button.dataset.iso = toISO(date);

                button.innerHTML = `
                    <span class="dc-day">${DAYS[date.getDay()]}</span>
                    <span class="dc-num">${date.getDate()}</span>
                    <span class="dc-month">${MONTHS[date.getMonth()]}</span>
                `;

                button.addEventListener("click", () => {

                    dateStrip.querySelectorAll(".date-chip").forEach(chip => {

                        chip.classList.remove("selected");
                        chip.setAttribute("aria-checked", "false");

                    });

                    button.classList.add("selected");
                    button.setAttribute("aria-checked", "true");

                    state.dateISO = button.dataset.iso;

                    state.dateLabel =
                        `${FULL_DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

                    state.time = "";

                    buildSlots(date);

                    updateSummary();

                });

                dateStrip.appendChild(button);

                added++;

            }

            cursor.setDate(cursor.getDate() + 1);

        }

    }


    /* -----------------------------------------------------
       TIME SLOTS
    ----------------------------------------------------- */

    const SLOTS = [
        "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];

    // Demo-only: pseudo-random "already booked" slots per date.
    // Replace with a real availability API in production.
    function isBooked(dateISO, slot) {

        const str = dateISO + slot;

        let hash = 0;

        for (let i = 0; i < str.length; i++) {

            hash = (hash * 31 + str.charCodeAt(i)) >>> 0;

        }

        return hash % 5 === 0;

    }

    function buildSlots(date) {

        slotGrid.innerHTML = "";

        SLOTS.forEach(slot => {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "slot-chip";
            button.textContent = slot;
            button.setAttribute("role", "radio");
            button.setAttribute("aria-checked", "false");

            if (isBooked(toISO(date), slot)) {

                button.disabled = true;
                button.title = "Already booked";

            }

            button.addEventListener("click", () => {

                slotGrid.querySelectorAll(".slot-chip").forEach(chip => {

                    chip.classList.remove("selected");
                    chip.setAttribute("aria-checked", "false");

                });

                button.classList.add("selected");
                button.setAttribute("aria-checked", "true");

                state.time = slot;

                updateSummary();

            });

            slotGrid.appendChild(button);

        });

    }


    /* -----------------------------------------------------
       BUTTONS
    ----------------------------------------------------- */

    nextBtn.addEventListener("click", () => {

        if (!validateStep(currentStep)) return;

        goToStep(Math.min(currentStep + 1, TOTAL_STEPS));

    });

    prevBtn.addEventListener("click", () => {

        goToStep(Math.max(currentStep - 1, 1));

    });

    // Clear inline errors while typing
    form.querySelectorAll(".field input").forEach(input => {

        input.addEventListener("input", () => setFieldError(input, ""));

    });

    document.getElementById("terms").addEventListener("change", event => {

        if (event.target.checked) {

            event.target.closest(".check-row").classList.remove("invalid");

        }

    });


    /* -----------------------------------------------------
       SUBMIT
    ----------------------------------------------------- */

    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!validateStep(4)) return;

        const reference =
            "NC-" + Math.random().toString(36).slice(2, 8).toUpperCase();

        const booking = {

            reference,

            service: state.service,
            mode: state.mode,
            dietitian: state.dietitian,
            date: state.dateLabel,
            time: state.time,

            name: form.fullName.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            age: form.age.value,
            goal: form.goal.value.trim(),

            createdAt: new Date().toISOString()

        };

        // Demo storage. Replace with a POST request to your backend.
        try {

            const saved =
                JSON.parse(localStorage.getItem("nutricare-bookings") || "[]");

            saved.push(booking);

            localStorage.setItem(
                "nutricare-bookings",
                JSON.stringify(saved)
            );

        } catch (error) {

            console.warn("Could not save booking locally.", error);

        }

        document.getElementById("successName").textContent = booking.name;
        document.getElementById("successEmail").textContent = booking.email;
        document.getElementById("successRef").textContent = reference;

        form.hidden = true;
        stepper.hidden = true;
        successBox.hidden = false;

        successBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        toast("Your consultation is booked!");

    });


    /* -----------------------------------------------------
       BOOK ANOTHER
    ----------------------------------------------------- */

    document.getElementById("newBooking").addEventListener("click", () => {

        form.reset();

        Object.keys(state).forEach(key => (state[key] = ""));

        buildDates();

        slotGrid.innerHTML =
            '<p class="slot-hint">Please select a date first.</p>';

        updateSummary();

        successBox.hidden = true;
        form.hidden = false;
        stepper.hidden = false;

        goToStep(1);

    });


    /* -----------------------------------------------------
       INIT
    ----------------------------------------------------- */

    buildDates();

    updateSummary();

    goToStep(1);

    // Prevent the initial scroll jump on page load
    window.scrollTo(0, 0);

    refreshIcons();

});