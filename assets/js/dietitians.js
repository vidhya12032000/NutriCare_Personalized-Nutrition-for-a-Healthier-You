/* =========================================================
   NUTRICARE
   DIETITIANS PAGE JAVASCRIPT
   (loads after main.js)
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("dtGrid");

    if (!grid) return;


    /* -----------------------------------------------------
       DATA
       Replace with an API call / JSON file in production.
    ----------------------------------------------------- */

    const DIETITIANS = [

        {
            id: "ananya-sharma",
            name: "Dr. Ananya Sharma",
            role: "Clinical Nutritionist",
            cats: ["clinical", "weight"],
            tags: ["Clinical Nutrition", "Weight Management"],
            rating: 4.9,
            reviews: 312,
            exp: 12,
            langs: ["English", "Hindi", "Tamil"],
            modes: ["video", "phone", "clinic"],
            avail: "today",
            img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85",
            bio: "Ananya combines clinical experience with a practical, judgement-free approach. She helps clients build sustainable eating habits that work alongside their medical care."
        },

        {
            id: "maya-patel",
            name: "Dr. Maya Patel",
            role: "Sports Nutritionist",
            cats: ["sports", "lifestyle"],
            tags: ["Sports Nutrition", "Performance"],
            rating: 4.8,
            reviews: 244,
            exp: 9,
            langs: ["English", "Gujarati", "Hindi"],
            modes: ["video", "phone"],
            avail: "week",
            img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=85",
            bio: "Maya works with recreational and competitive athletes to fuel training, improve recovery and build confidence around food."
        },

        {
            id: "arjun-mehta",
            name: "Dr. Arjun Mehta",
            role: "Lifestyle Nutritionist",
            cats: ["lifestyle", "family"],
            tags: ["Lifestyle", "Healthy Habits"],
            rating: 4.9,
            reviews: 286,
            exp: 10,
            langs: ["English", "Hindi"],
            modes: ["video", "clinic"],
            avail: "today",
            img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=85",
            bio: "Arjun specialises in simple nutrition strategies for busy schedules, helping professionals and families eat well without overthinking it."
        },

        {
            id: "kavya-raman",
            name: "Kavya Raman",
            role: "Diabetes Care Dietitian",
            cats: ["diabetes", "clinical"],
            tags: ["Diabetes Care", "Clinical Nutrition"],
            rating: 4.9,
            reviews: 198,
            exp: 8,
            langs: ["English", "Tamil", "Telugu"],
            modes: ["video", "phone", "clinic"],
            avail: "week",
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=85",
            bio: "Kavya supports people managing diabetes and prediabetes with practical meal planning that fits regional food habits and complements their doctor's advice."
        },

        {
            id: "rohan-iyer",
            name: "Rohan Iyer",
            role: "Weight Management Specialist",
            cats: ["weight", "lifestyle"],
            tags: ["Weight Management", "Behaviour Change"],
            rating: 4.7,
            reviews: 167,
            exp: 7,
            langs: ["English", "Tamil"],
            modes: ["video", "phone"],
            avail: "today",
            img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&q=85",
            bio: "Rohan focuses on habit-based weight management, helping clients build a healthier relationship with food without extreme restrictions."
        },

        {
            id: "sneha-nair",
            name: "Dr. Sneha Nair",
            role: "Family & Child Nutritionist",
            cats: ["family"],
            tags: ["Family Nutrition", "Child Nutrition"],
            rating: 4.8,
            reviews: 221,
            exp: 11,
            langs: ["English", "Malayalam", "Tamil"],
            modes: ["video", "clinic"],
            avail: "week",
            img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=85",
            bio: "Sneha guides parents and children toward balanced eating, from fussy toddlers to teenagers, with calm and realistic advice."
        },

        {
            id: "vikram-singh",
            name: "Vikram Singh",
            role: "Strength & Performance Coach",
            cats: ["sports"],
            tags: ["Sports Nutrition", "Muscle Gain"],
            rating: 4.8,
            reviews: 143,
            exp: 6,
            langs: ["English", "Hindi", "Punjabi"],
            modes: ["video", "phone"],
            avail: "later",
            img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=700&q=85",
            bio: "Vikram helps gym-goers and strength athletes plan protein, training-day meals and recovery around their schedule."
        },

        {
            id: "meera-krishnan",
            name: "Dr. Meera Krishnan",
            role: "Clinical Dietitian",
            cats: ["clinical", "diabetes", "family"],
            tags: ["Clinical Nutrition", "Women's Health"],
            rating: 4.9,
            reviews: 275,
            exp: 14,
            langs: ["English", "Tamil", "Hindi"],
            modes: ["video", "phone", "clinic"],
            avail: "week",
            img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&q=85",
            bio: "With over a decade in clinical practice, Meera supports women's health, thyroid concerns and long-term lifestyle conditions with evidence-based guidance."
        },

        {
            id: "farhan-ali",
            name: "Farhan Ali",
            role: "Lifestyle Nutritionist",
            cats: ["lifestyle", "weight"],
            tags: ["Lifestyle", "Meal Planning"],
            rating: 4.6,
            reviews: 96,
            exp: 5,
            langs: ["English", "Hindi", "Urdu"],
            modes: ["video", "phone"],
            avail: "later",
            img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=85&sat=-20",
            bio: "Farhan makes meal planning approachable, helping busy clients batch-cook, shop smarter and stay consistent."
        }

    ];


    /* -----------------------------------------------------
       ELEMENTS + STATE
    ----------------------------------------------------- */

    const searchInput = document.getElementById("dtSearch");
    const clearBtn = document.getElementById("dtClear");
    const modeSelect = document.getElementById("dtMode");
    const sortSelect = document.getElementById("dtSort");
    const availToggle = document.getElementById("dtAvailable");
    const chipWrap = document.getElementById("dtCategories");

    const countEl = document.getElementById("dtCount");
    const resetBtn = document.getElementById("dtReset");
    const emptyBox = document.getElementById("dtEmpty");
    const emptyReset = document.getElementById("dtEmptyReset");

    const moreWrap = document.getElementById("dtMoreWrap");
    const moreBtn = document.getElementById("dtMore");

    const modal = document.getElementById("dtModal");
    const modalBody = document.getElementById("dtModalBody");

    const PAGE_SIZE = 6;

    const state = {
        query: "",
        category: "all",
        mode: "all",
        sort: "rating",
        availableOnly: false,
        visible: PAGE_SIZE
    };

    let filtered = [];


    /* -----------------------------------------------------
       HELPERS
    ----------------------------------------------------- */

    const refreshIcons = () => {

        if (typeof lucide !== "undefined") {

            lucide.createIcons();

        }

    };

    const initials = name =>
        name
            .replace(/^Dr\.?\s+/i, "")
            .split(" ")
            .map(part => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    const MODE_LABEL = {
        video: "Video call",
        phone: "Phone call",
        clinic: "In-clinic"
    };

    const MODE_ICON = {
        video: "video",
        phone: "phone",
        clinic: "map-pin"
    };

    const AVAIL_LABEL = {
        today: "Available today",
        week: "This week",
        later: "Next week"
    };

    const bookingUrl = d =>
        `booking.html?dietitian=${encodeURIComponent(d.name)}`;

    const profileUrl = d =>
        `dietitian-details.html?id=${encodeURIComponent(d.id)}`;


    /* -----------------------------------------------------
       FILTER + SORT
    ----------------------------------------------------- */

    function applyFilters() {

        const q = state.query.trim().toLowerCase();

        filtered = DIETITIANS.filter(d => {

            if (state.category !== "all" && !d.cats.includes(state.category)) {
                return false;
            }

            if (state.mode !== "all" && !d.modes.includes(state.mode)) {
                return false;
            }

            if (state.availableOnly && d.avail === "later") {
                return false;
            }

            if (q) {

                const haystack = [
                    d.name,
                    d.role,
                    d.bio,
                    ...d.tags,
                    ...d.langs
                ].join(" ").toLowerCase();

                if (!haystack.includes(q)) return false;

            }

            return true;

        });

        filtered.sort((a, b) => {

            switch (state.sort) {

                case "experience":
                    return b.exp - a.exp;

                case "name":
                    return a.name
                        .replace(/^Dr\.?\s+/i, "")
                        .localeCompare(b.name.replace(/^Dr\.?\s+/i, ""));

                default:
                    return b.rating - a.rating || b.reviews - a.reviews;

            }

        });

    }


    /* -----------------------------------------------------
       RENDER
    ----------------------------------------------------- */

    function cardTemplate(d, index) {

        const availClass = d.avail === "later" ? "later" : "";

        const modeIcons = d.modes
            .map(m => `<span title="${MODE_LABEL[m]}"><i data-lucide="${MODE_ICON[m]}"></i>${MODE_LABEL[m]}</span>`)
            .join("");

        return `
            <article class="dt-card" style="animation-delay:${(index % PAGE_SIZE) * 60}ms">

                <div class="dt-card-image">

                    <img src="${d.img}" alt="${d.name}" loading="lazy" data-initials="${initials(d.name)}">

                    <span class="dt-verified">
                        <i data-lucide="badge-check"></i>
                        Verified
                    </span>

                    <span class="dt-avail ${availClass}">${AVAIL_LABEL[d.avail]}</span>

                </div>

                <div class="dt-card-body">

                    <div class="dt-card-top">

                        <div>
                            <h3>${d.name}</h3>
                            <span>${d.role}</span>
                        </div>

                        <div class="dt-rating">★ ${d.rating.toFixed(1)}</div>

                    </div>

                    <div class="dt-facts">
                        <span><i data-lucide="briefcase"></i>${d.exp} yrs experience</span>
                        <span><i data-lucide="languages"></i>${d.langs.slice(0, 2).join(", ")}${d.langs.length > 2 ? " +" + (d.langs.length - 2) : ""}</span>
                    </div>

                    <div class="dt-tags">
                        ${d.tags.map(tag => `<span>${tag}</span>`).join("")}
                    </div>

                    <div class="dt-card-actions">

                        <button type="button" class="btn dt-quick" data-quick="${d.id}">
                            Quick view
                        </button>

                        <a href="${bookingUrl(d)}" class="btn btn-primary">
                            Book Session
                            <i data-lucide="arrow-up-right"></i>
                        </a>

                    </div>

                </div>

            </article>
        `;

    }

    function render() {

        const total = DIETITIANS.length;

        const shown = filtered.slice(0, state.visible);

        grid.innerHTML = shown.map(cardTemplate).join("");

        // Empty state
        emptyBox.hidden = filtered.length !== 0;

        // Load more
        moreWrap.hidden = filtered.length <= state.visible;

        // Count text
        countEl.innerHTML = filtered.length === total
            ? `Showing <strong>${filtered.length}</strong> experts`
            : `Showing <strong>${filtered.length}</strong> of ${total} experts`;

        // Reset button
        const isFiltered =
            state.query ||
            state.category !== "all" ||
            state.mode !== "all" ||
            state.availableOnly ||
            state.sort !== "rating";

        resetBtn.hidden = !isFiltered;

        refreshIcons();

    }

    function update(resetPage = true) {

        if (resetPage) state.visible = PAGE_SIZE;

        applyFilters();

        render();

    }


    /* -----------------------------------------------------
       FILTER EVENTS
    ----------------------------------------------------- */

    let searchTimer;

    searchInput.addEventListener("input", () => {

        clearBtn.classList.toggle("show", searchInput.value.length > 0);

        clearTimeout(searchTimer);

        searchTimer = setTimeout(() => {

            state.query = searchInput.value;

            update();

        }, 200);

    });

    clearBtn.addEventListener("click", () => {

        searchInput.value = "";

        clearBtn.classList.remove("show");

        state.query = "";

        update();

        searchInput.focus();

    });

    chipWrap.addEventListener("click", event => {

        const chip = event.target.closest(".dt-chip");

        if (!chip) return;

        chipWrap.querySelectorAll(".dt-chip").forEach(item => {

            item.classList.toggle("active", item === chip);

        });

        state.category = chip.dataset.category;

        update();

    });

    modeSelect.addEventListener("change", () => {

        state.mode = modeSelect.value;

        update();

    });

    sortSelect.addEventListener("change", () => {

        state.sort = sortSelect.value;

        update();

    });

    availToggle.addEventListener("change", () => {

        state.availableOnly = availToggle.checked;

        update();

    });

    moreBtn.addEventListener("click", () => {

        state.visible += PAGE_SIZE;

        applyFilters();

        render();

    });

    function resetFilters() {

        state.query = "";
        state.category = "all";
        state.mode = "all";
        state.sort = "rating";
        state.availableOnly = false;

        searchInput.value = "";
        clearBtn.classList.remove("show");
        modeSelect.value = "all";
        sortSelect.value = "rating";
        availToggle.checked = false;

        chipWrap.querySelectorAll(".dt-chip").forEach(chip => {

            chip.classList.toggle("active", chip.dataset.category === "all");

        });

        update();

    }

    resetBtn.addEventListener("click", resetFilters);
    emptyReset.addEventListener("click", resetFilters);


    /* -----------------------------------------------------
       IMAGE FALLBACK (initials avatar)
       "error" doesn't bubble, so listen in the capture phase.
    ----------------------------------------------------- */

    document.addEventListener("error", event => {

        const img = event.target;

        if (!(img instanceof HTMLImageElement)) return;

        if (!img.dataset.initials) return;

        const holder = document.createElement("div");

        holder.className = "dt-initials";

        holder.textContent = img.dataset.initials;

        img.replaceWith(holder);

    }, true);


    /* -----------------------------------------------------
       QUICK VIEW MODAL
    ----------------------------------------------------- */

    let lastFocused = null;

    function openModal(id) {

        const d = DIETITIANS.find(item => item.id === id);

        if (!d) return;

        lastFocused = document.activeElement;

        modalBody.innerHTML = `
            <div class="dt-modal-photo">
                <img src="${d.img}" alt="${d.name}" data-initials="${initials(d.name)}">
            </div>

            <div class="dt-modal-info">

                <span class="dt-role">${d.role}</span>

                <h3 id="dtModalName">${d.name}</h3>

                <div class="dt-modal-rating">
                    <span class="dt-rating">★ ${d.rating.toFixed(1)}</span>
                    ${d.reviews} reviews
                </div>

                <p>${d.bio}</p>

                <div class="dt-modal-stats">
                    <div><strong>${d.exp}+</strong><span>Years</span></div>
                    <div><strong>${d.reviews}</strong><span>Reviews</span></div>
                    <div><strong>${d.langs.length}</strong><span>Languages</span></div>
                </div>

                <div class="dt-modal-label">Specialties</div>
                <div class="dt-tags">
                    ${d.tags.map(tag => `<span>${tag}</span>`).join("")}
                </div>

                <div class="dt-modal-label">Languages</div>
                <div class="dt-tags">
                    ${d.langs.map(lang => `<span>${lang}</span>`).join("")}
                </div>

                <div class="dt-modal-label">Consultation modes</div>
                <div class="dt-facts">
                    ${d.modes.map(m => `<span><i data-lucide="${MODE_ICON[m]}"></i>${MODE_LABEL[m]}</span>`).join("")}
                </div>

                <div class="dt-modal-actions">

                    <a href="${bookingUrl(d)}" class="btn btn-primary">
                        Book Session
                        <i data-lucide="arrow-up-right"></i>
                    </a>

                    <a href="${profileUrl(d)}" class="btn btn-outline">
                        Full Profile
                    </a>

                </div>

            </div>
        `;

        refreshIcons();

        modal.classList.add("open");

        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        modal.querySelector(".dt-modal-close").focus();

    }

    function closeModal() {

        modal.classList.remove("open");

        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (lastFocused) lastFocused.focus();

    }

    grid.addEventListener("click", event => {

        const trigger = event.target.closest("[data-quick]");

        if (trigger) openModal(trigger.dataset.quick);

    });

    modal.addEventListener("click", event => {

        if (event.target.closest("[data-close]")) closeModal();

    });

    document.addEventListener("keydown", event => {

        if (!modal.classList.contains("open")) return;

        if (event.key === "Escape") {

            closeModal();

            return;

        }

        // Basic focus trap
        if (event.key === "Tab") {

            const focusable = modal.querySelectorAll(
                "a[href], button:not([disabled])"
            );

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {

                event.preventDefault();
                last.focus();

            } else if (!event.shiftKey && document.activeElement === last) {

                event.preventDefault();
                first.focus();

            }

        }

    });


    /* -----------------------------------------------------
       INIT
    ----------------------------------------------------- */

    update();

});