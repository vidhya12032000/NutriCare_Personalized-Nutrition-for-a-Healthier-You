/* =========================================================
   NUTRICARE
   BLOG DETAILS JAVASCRIPT
   (loads after main.js)
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const article = document.getElementById("postContent");

    if (!article) return;


    /* -----------------------------------------------------
       HELPERS
    ----------------------------------------------------- */

    const toast = message => {

        if (typeof showToast === "function") {

            showToast(message);

        }

    };

    const isValidEmail = email =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const storageGet = key => {

        try {

            return localStorage.getItem(key);

        } catch (error) {

            return null;

        }

    };

    const storageSet = (key, value) => {

        try {

            localStorage.setItem(key, value);

        } catch (error) {

            /* ignore */

        }

    };

    // One key per article so this works when reused for many posts
    const ARTICLE_ID = location.pathname + location.search;


    /* -----------------------------------------------------
       READING TIME
    ----------------------------------------------------- */

    (function readingTime() {

        const target = document.getElementById("readingTime");

        if (!target) return;

        const words =
            article.textContent.trim().split(/\s+/).length;

        const minutes = Math.max(1, Math.round(words / 200));

        target.textContent = `${minutes} min read`;

    })();


    /* -----------------------------------------------------
       TABLE OF CONTENTS + SCROLL SPY
    ----------------------------------------------------- */

    (function tableOfContents() {

        const list = document.getElementById("tocList");

        const headings = article.querySelectorAll("h2[id]");

        if (!list || !headings.length) return;

        headings.forEach(heading => {

            const item = document.createElement("li");

            const link = document.createElement("a");

            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;

            item.appendChild(link);
            list.appendChild(item);

        });

        const links = [...list.querySelectorAll("a")];

        const setActive = id => {

            links.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );

            });

        };

        setActive(headings[0].id);

        if (!("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        setActive(entry.target.id);

                    }

                });

            },
            {
                rootMargin: "-20% 0px -70% 0px"
            }
        );

        headings.forEach(heading => observer.observe(heading));

    })();


    /* -----------------------------------------------------
       LIKE + SAVE
    ----------------------------------------------------- */

    (function likeAndSave() {

        const likeBtn = document.getElementById("likeBtn");
        const likeCount = document.getElementById("likeCount");
        const saveBtn = document.getElementById("saveBtn");

        const LIKE_KEY = `nutricare-like:${ARTICLE_ID}`;
        const SAVE_KEY = `nutricare-save:${ARTICLE_ID}`;

        if (likeBtn && likeCount) {

            const base = Number(likeCount.textContent) || 0;

            const render = liked => {

                likeBtn.classList.toggle("active", liked);

                likeBtn.setAttribute("aria-pressed", String(liked));

                likeCount.textContent = liked ? base + 1 : base;

            };

            render(storageGet(LIKE_KEY) === "1");

            likeBtn.addEventListener("click", () => {

                const liked = !likeBtn.classList.contains("active");

                storageSet(LIKE_KEY, liked ? "1" : "0");

                render(liked);

            });

        }

        if (saveBtn) {

            const render = saved => {

                saveBtn.classList.toggle("active", saved);

                saveBtn.setAttribute("aria-pressed", String(saved));

            };

            render(storageGet(SAVE_KEY) === "1");

            saveBtn.addEventListener("click", () => {

                const saved = !saveBtn.classList.contains("active");

                storageSet(SAVE_KEY, saved ? "1" : "0");

                render(saved);

                toast(saved ? "Article saved." : "Removed from saved.");

            });

        }

    })();


    /* -----------------------------------------------------
       SHARE
    ----------------------------------------------------- */

    (function share() {

        const url = encodeURIComponent(location.href);

        const text = encodeURIComponent(document.title);

        const targets = {

            facebook:
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,

            linkedin:
                `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,

            whatsapp:
                `https://wa.me/?text=${text}%20${url}`

        };

        const copyLink = async () => {

            try {

                await navigator.clipboard.writeText(location.href);

                toast("Link copied to clipboard.");

            } catch (error) {

                // Fallback for older browsers / non-secure contexts
                const temp = document.createElement("input");

                temp.value = location.href;

                document.body.appendChild(temp);

                temp.select();

                document.execCommand("copy");

                temp.remove();

                toast("Link copied to clipboard.");

            }

        };

        document.querySelectorAll("[data-share]").forEach(button => {

            button.addEventListener("click", () => {

                const type = button.dataset.share;

                if (type === "copy") {

                    copyLink();

                    return;

                }

                if (targets[type]) {

                    window.open(
                        targets[type],
                        "_blank",
                        "noopener,noreferrer,width=640,height=560"
                    );

                }

            });

        });

    })();


    /* -----------------------------------------------------
       SIDEBAR NEWSLETTER
    ----------------------------------------------------- */

    (function sidebarNewsletter() {

        const form = document.getElementById("sideNewsletter");

        const email = document.getElementById("sideEmail");

        if (!form || !email) return;

        form.addEventListener("submit", event => {

            event.preventDefault();

            const value = email.value.trim();

            if (!value) {

                toast("Please enter your email address.");

                email.focus();

                return;

            }

            if (!isValidEmail(value)) {

                toast("Please enter a valid email.");

                email.focus();

                return;

            }

            toast("You're subscribed to NutriCare!");

            form.reset();

        });

    })();


    /* -----------------------------------------------------
       COMMENTS
    ----------------------------------------------------- */

    (function comments() {

        const form = document.getElementById("commentForm");
        const list = document.getElementById("commentList");
        const counter = document.getElementById("commentCount");

        if (!form || !list) return;

        const nameInput = document.getElementById("commentName");
        const emailInput = document.getElementById("commentEmail");
        const textInput = document.getElementById("commentText");

        const markInvalid = (input, invalid) => {

            input.closest(".field").classList.toggle("invalid", invalid);

        };

        [nameInput, emailInput, textInput].forEach(input => {

            input.addEventListener("input", () => markInvalid(input, false));

        });

        form.addEventListener("submit", event => {

            event.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const text = textInput.value.trim();

            let valid = true;

            if (name.length < 2) {

                markInvalid(nameInput, true);
                valid = false;

            }

            if (!isValidEmail(email)) {

                markInvalid(emailInput, true);
                valid = false;

            }

            if (text.length < 3) {

                markInvalid(textInput, true);
                valid = false;

            }

            if (!valid) {

                toast("Please fill in all fields correctly.");

                return;

            }

            // Build the comment with textContent to avoid HTML injection
            const comment = document.createElement("div");
            comment.className = "comment";

            const avatar = document.createElement("div");
            avatar.className = "comment-avatar";
            avatar.textContent = name.charAt(0).toUpperCase();

            const body = document.createElement("div");
            body.className = "comment-body";

            const top = document.createElement("div");
            top.className = "comment-top";

            const author = document.createElement("strong");
            author.textContent = name;

            const time = document.createElement("span");
            time.textContent = "Just now";

            top.append(author, time);

            const paragraph = document.createElement("p");
            paragraph.textContent = text;

            body.append(top, paragraph);

            comment.append(avatar, body);

            list.appendChild(comment);

            if (counter) {

                counter.textContent = `(${list.querySelectorAll(".comment").length})`;

            }

            form.reset();

            toast("Thanks! Your comment has been posted.");

        });

    })();

});