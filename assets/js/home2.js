/* =========================================================
   NUTRICARE — HOME 2 SCRIPT
   Loads after main.js. Only touches elements that exist
   on the home2.html page.
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initTrainerSwitcher();

    initCompareSlider();

    initProgramTabs();

    initPlayButton();

});


/* =========================================================
   TRAINER SPOTLIGHT SWITCHER
========================================================= */

function initTrainerSwitcher() {

    const tabs =
        document.querySelectorAll(".h2-trainer-tab");

    const slides =
        document.querySelectorAll(".h2-trainer-slide");

    if (!tabs.length || !slides.length) return;

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.trainer;

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            slides.forEach(slide => {

                slide.classList.toggle(
                    "active",
                    slide.dataset.slide === target
                );

            });

        });

    });

}


/* =========================================================
   BEFORE / AFTER COMPARE SLIDER
========================================================= */

function initCompareSlider() {

    const wrap =
        document.getElementById("h2Compare");

    const before =
        document.getElementById("h2CompareBefore");

    const handle =
        document.getElementById("h2CompareHandle");

    if (!wrap || !before || !handle) return;

    let dragging = false;

    const setPosition = clientX => {

        const rect = wrap.getBoundingClientRect();

        let ratio = (clientX - rect.left) / rect.width;

        ratio = Math.min(Math.max(ratio, 0), 1);

        const percent = ratio * 100;

        before.style.clipPath =
            `inset(0 ${100 - percent}% 0 0)`;

        handle.style.left = `${percent}%`;

    };

    const start = event => {

        dragging = true;

        wrap.classList.add("dragging");

        move(event);

    };

    const move = event => {

        if (!dragging && event.type !== "pointerdown") return;

        const clientX =
            event.touches ?
                event.touches[0].clientX :
                event.clientX;

        setPosition(clientX);

    };

    const end = () => {

        dragging = false;

        wrap.classList.remove("dragging");

    };

    wrap.addEventListener("pointerdown", start);

    window.addEventListener("pointermove", event => {

        if (dragging) move(event);

    });

    window.addEventListener("pointerup", end);

    // Click-anywhere-on-bar convenience
    wrap.addEventListener("click", event => {

        setPosition(event.clientX);

    });

    // Keyboard support
    handle.setAttribute("tabindex", "0");
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-label", "Drag to compare before and after");
    handle.setAttribute("aria-valuemin", "0");
    handle.setAttribute("aria-valuemax", "100");
    handle.setAttribute("aria-valuenow", "50");

    handle.addEventListener("keydown", event => {

        const rect = wrap.getBoundingClientRect();

        const current =
            parseFloat(handle.style.left) || 50;

        let next = current;

        if (event.key === "ArrowLeft") next = Math.max(current - 5, 0);
        if (event.key === "ArrowRight") next = Math.min(current + 5, 100);

        if (next !== current) {

            setPosition(rect.left + (rect.width * next / 100));

            handle.setAttribute("aria-valuenow", String(Math.round(next)));

        }

    });

}


/* =========================================================
   PROGRAM TABS
========================================================= */

function initProgramTabs() {

    const tabs =
        document.querySelectorAll(".h2-program-tab");

    const panels =
        document.querySelectorAll(".h2-program-panel");

    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.program;

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            panels.forEach(panel => {

                panel.classList.toggle(
                    "active",
                    panel.dataset.panel === target
                );

            });

        });

    });

}


/* =========================================================
   HERO PLAY BUTTON — scrolls to the trainer section
   (placeholder for a future video modal)
========================================================= */

function initPlayButton() {

    const button =
        document.getElementById("h2PlayBtn");

    const target =
        document.querySelector(".h2-trainers");

    if (!button || !target) return;

    button.addEventListener("click", () => {

        target.scrollIntoView({ behavior: "smooth" });

    });

}