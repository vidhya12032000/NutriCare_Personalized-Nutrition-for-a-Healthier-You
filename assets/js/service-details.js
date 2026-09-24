/* =========================================================
   NUTRICARE - SERVICE DETAILS
   Dynamic service details + FAQ
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SERVICE DATA
    ===================================================== */

    const services = {

        /* -------------------------------------------------
           01. WEIGHT MANAGEMENT
        ------------------------------------------------- */

        weight: {
            category: "WEIGHT MANAGEMENT",

            title: "Sustainable Weight Management",

            description:
                "Build healthier eating patterns without extreme restrictions. Your plan evolves as your habits and progress change.",

            image:
                "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=88",

            badge: "Personalized weight support",

            whatTitle:
                "A practical approach to sustainable change.",

            whatDescription:
                "Create a nutrition routine around realistic meals, daily habits and progress reviews rather than complicated rules.",

            focusIntro:
                "The program turns weight-management goals into practical areas you can work on consistently.",

            benefits: [
                [
                    "clipboard-check",
                    "Personal nutrition assessment",
                    "Understand your current routine, preferences and goals."
                ],
                [
                    "utensils",
                    "Personalized meal strategy",
                    "Build a flexible structure around the foods and schedule you already use."
                ],
                [
                    "repeat",
                    "Habit-focused guidance",
                    "Work on practical habits that can fit into everyday routines."
                ],
                [
                    "trending-up",
                    "Progress reviews",
                    "Review what is working and adjust the approach as your needs change."
                ]
            ],

            focus: [
                [
                    "salad",
                    "Balanced meals",
                    "Create meals with practical structure and variety."
                ],
                [
                    "clock-3",
                    "Meal routine",
                    "Build a meal pattern that fits your daily schedule."
                ],
                [
                    "shopping-basket",
                    "Food choices",
                    "Make grocery and food decisions easier."
                ],
                [
                    "heart-pulse",
                    "Lifestyle habits",
                    "Connect nutrition with realistic everyday routines."
                ]
            ],

            process: [
                [
                    "01",
                    "Assessment",
                    "Share your goals, routine, preferences and current challenges.",
                    "clipboard-list"
                ],
                [
                    "02",
                    "Build your plan",
                    "Create a realistic nutrition strategy around your lifestyle.",
                    "notebook-pen"
                ],
                [
                    "03",
                    "Put it into practice",
                    "Use practical meal and habit guidance in your routine.",
                    "utensils"
                ],
                [
                    "04",
                    "Review & adjust",
                    "Review progress and make sensible changes over time.",
                    "trending-up"
                ]
            ],

            whoTitle:
                "For people who want a more sustainable nutrition routine.",

            whoDescription:
                "The program is designed around practical guidance and can begin with simple foundational changes.",

            who: [
                "People starting a healthier eating routine",
                "People who want structured meal guidance",
                "Busy professionals needing practical planning",
                "People looking for ongoing nutrition support"
            ],

            faq: [
                [
                    "Do I need to follow a strict diet?",
                    "No. The service is designed around practical and sustainable habits that can be adapted to your preferences, schedule and goals."
                ],
                [
                    "Can my plan change over time?",
                    "Yes. Progress, schedule changes, preferences and new goals can all affect your nutrition strategy."
                ],
                [
                    "Can beginners use this service?",
                    "Yes. You can start with simple foundational habits and build more detail as your confidence grows."
                ],
                [
                    "How do I get started?",
                    "Begin with the short assessment or contact the NutriCare team to discuss your goals."
                ]
            ],

            ctaTitle:
                "Start building a healthier routine.",

            ctaDescription:
                "Take the short assessment and create a clearer starting point for your nutrition journey."
        },


        /* -------------------------------------------------
           02. PERFORMANCE NUTRITION
        ------------------------------------------------- */

        performance: {

            category: "SPORTS NUTRITION",

            title: "Performance Nutrition",

            description:
                "Match your nutrition strategy with your training calendar, recovery needs and performance goals.",

            image:
                "/assets/images/performanceNutri.jpg",

            badge:
                "Training-focused support",

            whatTitle:
                "Nutrition that works around your training.",

            whatDescription:
                "Organize meals, hydration and recovery-focused choices around your training schedule and performance goals.",

            focusIntro:
                "Your plan can focus on the practical nutrition details that matter around training and recovery.",

            benefits: [
                [
                    "calendar-days",
                    "Training-day nutrition",
                    "Plan food choices around your training schedule."
                ],
                [
                    "zap",
                    "Energy planning",
                    "Build practical meal timing around activity and routine."
                ],
                [
                    "refresh-cw",
                    "Recovery support",
                    "Organize nutrition choices around recovery needs."
                ],
                [
                    "target",
                    "Goal-focused guidance",
                    "Keep your nutrition strategy connected to your performance goals."
                ]
            ],

            focus: [
                [
                    "zap",
                    "Training fuel",
                    "Plan practical meals around active days."
                ],
                [
                    "clock-3",
                    "Meal timing",
                    "Coordinate meals and snacks with your routine."
                ],
                [
                    "droplets",
                    "Hydration",
                    "Keep hydration needs visible in your daily plan."
                ],
                [
                    "refresh-cw",
                    "Recovery",
                    "Support consistent recovery-focused habits."
                ]
            ],

            process: [
                [
                    "01",
                    "Understand your routine",
                    "Review training frequency, schedule and nutrition habits.",
                    "clipboard-list"
                ],
                [
                    "02",
                    "Build your strategy",
                    "Create practical training and recovery nutrition guidance.",
                    "notebook-pen"
                ],
                [
                    "03",
                    "Apply & observe",
                    "Use the plan around training and everyday activities.",
                    "activity"
                ],
                [
                    "04",
                    "Review & adjust",
                    "Refine the approach as your routine and goals evolve.",
                    "trending-up"
                ]
            ],

            whoTitle:
                "For active people who want structured nutrition support.",

            whoDescription:
                "This service can be adapted around different training schedules and performance-oriented goals.",

            who: [
                "Regular gym-goers",
                "Recreational athletes",
                "People preparing for an event",
                "Active people improving recovery routines"
            ],

            faq: [
                [
                    "Can this work with a busy training schedule?",
                    "Yes. The approach can be organized around your existing training calendar and daily routine."
                ],
                [
                    "Does the plan include race preparation?",
                    "Race preparation can be included where it fits the service and your goals."
                ],
                [
                    "Can nutrition change between training and rest days?",
                    "Your strategy can be structured differently around different activity levels when appropriate."
                ],
                [
                    "How do I start?",
                    "Complete the assessment and share your training routine and goals."
                ]
            ],

            ctaTitle:
                "Build nutrition around your training.",

            ctaDescription:
                "Start with an assessment that helps define your routine, preferences and performance goals."
        },


        /* -------------------------------------------------
           03. MUSCLE BUILDING
        ------------------------------------------------- */

        muscle: {

            category: "MUSCLE BUILDING",

            title: "Strength & Muscle Nutrition",

            description:
                "Get practical protein, calorie and meal timing guidance designed around your strength-training routine.",

            image:
                "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=1200&q=88",

            badge:
                "Strength-focused support",

            whatTitle:
                "Practical nutrition for strength-focused routines.",

            whatDescription:
                "Organize protein, meals and timing around your training routine while keeping the plan practical for everyday life.",

            focusIntro:
                "The program focuses on the nutrition building blocks that support a consistent strength-training routine.",

            benefits: [
                [
                    "beef",
                    "Protein targets",
                    "Build practical protein guidance around your meals."
                ],
                [
                    "flame",
                    "Calorie planning",
                    "Create a clear nutrition structure around your goals."
                ],
                [
                    "clock-3",
                    "Meal timing",
                    "Organize meals around your training schedule."
                ],
                [
                    "dumbbell",
                    "Training nutrition",
                    "Connect daily food choices with your strength routine."
                ]
            ],

            focus: [
                [
                    "beef",
                    "Protein",
                    "Plan practical protein-rich meal options."
                ],
                [
                    "flame",
                    "Energy intake",
                    "Create a structured approach to daily energy needs."
                ],
                [
                    "clock-3",
                    "Timing",
                    "Coordinate meals around training."
                ],
                [
                    "dumbbell",
                    "Consistency",
                    "Build repeatable habits that fit your routine."
                ]
            ],

            process: [
                [
                    "01",
                    "Review your routine",
                    "Understand training frequency, food habits and goals.",
                    "clipboard-list"
                ],
                [
                    "02",
                    "Set nutrition targets",
                    "Build a practical meal structure around your needs.",
                    "target"
                ],
                [
                    "03",
                    "Apply the plan",
                    "Use meal and timing guidance alongside training.",
                    "dumbbell"
                ],
                [
                    "04",
                    "Review progress",
                    "Adjust the strategy as your routine develops.",
                    "trending-up"
                ]
            ],

            whoTitle:
                "For people building a consistent strength routine.",

            whoDescription:
                "The service provides practical nutrition guidance that can be adapted to different strength-training routines.",

            who: [
                "People beginning strength training",
                "Regular gym-goers",
                "People working on muscle-building goals",
                "People who need structured protein guidance"
            ],

            faq: [
                [
                    "Will I receive protein guidance?",
                    "Protein targets and meal ideas are part of the service structure and can be adapted to your routine."
                ],
                [
                    "Does the plan include calorie planning?",
                    "Calorie planning can be incorporated as part of your personalized nutrition strategy."
                ],
                [
                    "Can meal timing fit my workout schedule?",
                    "Yes. Meal timing can be organized around your training schedule."
                ],
                [
                    "How do I begin?",
                    "Start with the assessment and share your training routine and nutrition goals."
                ]
            ],

            ctaTitle:
                "Build a nutrition routine for your training.",

            ctaDescription:
                "Take the assessment to create a practical starting point for your strength-focused nutrition plan."
        },


        /* -------------------------------------------------
           04. EVERYDAY WELLNESS
        ------------------------------------------------- */

        wellness: {

            category: "EVERYDAY WELLNESS",

            title: "Everyday Wellness",

            description:
                "Create a balanced routine with practical food choices, meal structure and sustainable daily habits.",

            image:
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=88",

            badge:
                "Everyday wellness support",

            whatTitle:
                "Simple nutrition habits for everyday life.",

            whatDescription:
                "Create a balanced routine using practical meal guidance, everyday food choices and manageable lifestyle habits.",

            focusIntro:
                "The goal is to make everyday nutrition easier to understand and easier to follow.",

            benefits: [
                [
                    "salad",
                    "Balanced meal guidance",
                    "Create practical meal structures for daily life."
                ],
                [
                    "shopping-basket",
                    "Food choices",
                    "Make everyday grocery and meal decisions easier."
                ],
                [
                    "heart-pulse",
                    "Lifestyle habits",
                    "Build nutrition habits that fit your routine."
                ],
                [
                    "calendar-days",
                    "Weekly guidance",
                    "Use a clear weekly structure without unnecessary complexity."
                ]
            ],

            focus: [
                [
                    "salad",
                    "Meal balance",
                    "Build meals with practical variety."
                ],
                [
                    "shopping-basket",
                    "Smart shopping",
                    "Plan useful grocery choices."
                ],
                [
                    "heart-pulse",
                    "Daily habits",
                    "Work on manageable wellness habits."
                ],
                [
                    "calendar-days",
                    "Weekly routine",
                    "Create a simple rhythm for meals and planning."
                ]
            ],

            process: [
                [
                    "01",
                    "Understand your routine",
                    "Share your current food habits, schedule and goals.",
                    "clipboard-list"
                ],
                [
                    "02",
                    "Choose priorities",
                    "Identify practical nutrition areas to work on first.",
                    "list-checks"
                ],
                [
                    "03",
                    "Build habits",
                    "Use simple meal and lifestyle guidance in daily life.",
                    "heart-pulse"
                ],
                [
                    "04",
                    "Review & refine",
                    "Adjust the routine as your needs change.",
                    "trending-up"
                ]
            ],

            whoTitle:
                "For anyone looking to improve everyday nutrition habits.",

            whoDescription:
                "The service starts with practical foundational habits and can become more detailed as your confidence grows.",

            who: [
                "People starting a healthier routine",
                "Busy people who want simpler meal structure",
                "People improving everyday food choices",
                "Beginners looking for practical guidance"
            ],

            faq: [
                [
                    "Is this suitable for beginners?",
                    "Yes. The program can begin with simple foundational habits."
                ],
                [
                    "Do I need a major lifestyle change?",
                    "The focus is on practical, manageable changes that fit your existing routine."
                ],
                [
                    "Can my weekly plan change?",
                    "Yes. Your guidance can evolve as your schedule and goals change."
                ],
                [
                    "How do I get started?",
                    "Complete the assessment to identify a useful starting point."
                ]
            ],

            ctaTitle:
                "Make everyday nutrition feel simpler.",

            ctaDescription:
                "Start with practical guidance built around your current routine and goals."
        },


        /* -------------------------------------------------
           05. FAMILY NUTRITION
        ------------------------------------------------- */

        family: {

            category: "FAMILY NUTRITION",

            title: "Family Nutrition",

            description:
                "Make healthy family meals easier with practical grocery planning and flexible meal ideas for different ages.",

            image:
                "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=88",

            badge:
                "Family-friendly planning",

            whatTitle:
                "Practical food planning for the whole family.",

            whatDescription:
                "Create flexible family meal ideas and grocery routines that make everyday food planning easier.",

            focusIntro:
                "Family nutrition works best when meals are practical, flexible and realistic for different preferences.",

            benefits: [
                [
                    "users",
                    "Family meal planning",
                    "Organize meals that work across the household."
                ],
                [
                    "shopping-basket",
                    "Grocery guidance",
                    "Make weekly shopping more structured."
                ],
                [
                    "chef-hat",
                    "Flexible recipes",
                    "Use adaptable meal ideas for different preferences."
                ],
                [
                    "calendar-days",
                    "Weekly structure",
                    "Create a repeatable family meal routine."
                ]
            ],

            focus: [
                [
                    "users",
                    "Different needs",
                    "Consider different ages and preferences."
                ],
                [
                    "shopping-basket",
                    "Groceries",
                    "Make shopping more organized."
                ],
                [
                    "chef-hat",
                    "Flexible meals",
                    "Choose adaptable meal ideas."
                ],
                [
                    "calendar-days",
                    "Meal routine",
                    "Create a practical weekly rhythm."
                ]
            ],

            process: [
                [
                    "01",
                    "Understand the household",
                    "Review family routines, preferences and meal challenges.",
                    "users"
                ],
                [
                    "02",
                    "Plan the week",
                    "Create flexible meal and grocery guidance.",
                    "calendar-days"
                ],
                [
                    "03",
                    "Put it into practice",
                    "Use adaptable meals within your normal routine.",
                    "chef-hat"
                ],
                [
                    "04",
                    "Review & adjust",
                    "Refine the plan based on what works for your family.",
                    "trending-up"
                ]
            ],

            whoTitle:
                "For households looking for simpler meal planning.",

            whoDescription:
                "The approach is designed to keep family meal planning practical and flexible.",

            who: [
                "Families planning weekly meals",
                "Households with different food preferences",
                "Parents looking for practical meal structure",
                "People who want easier grocery planning"
            ],

            faq: [
                [
                    "Can meals be adapted for different family members?",
                    "Yes. Flexible meal ideas can be adjusted around different preferences and needs."
                ],
                [
                    "Does the service include grocery guidance?",
                    "Grocery planning is part of the service structure."
                ],
                [
                    "Can children and adults have different meals?",
                    "The plan can use flexible meal components where appropriate."
                ],
                [
                    "How do we start?",
                    "Complete the assessment and share your household's meal-planning needs."
                ]
            ],

            ctaTitle:
                "Make family meal planning easier.",

            ctaDescription:
                "Start with a simple assessment of your household routine, preferences and meal goals."
        },


        /* -------------------------------------------------
           06. MEAL PLANS
        ------------------------------------------------- */

        "meal-plans": {

            category: "MEAL PLANNING",

            title: "Personalized Meal Plans",

            description:
                "Take the guesswork out of your week with practical meal ideas built around your preferences and schedule.",

            image:
                "/assets/images/mealplan.jpg",

            badge:
                "Personalized weekly planning",

            whatTitle:
                "A meal structure made for your week.",

            whatDescription:
                "Create a practical weekly meal framework with ideas, grocery guidance and flexible choices that fit your schedule.",

            focusIntro:
                "The plan is designed to make weekly food decisions more organized and less overwhelming.",

            benefits: [
                [
                    "calendar-days",
                    "Weekly meal structure",
                    "Create a practical rhythm for meals throughout the week."
                ],
                [
                    "shopping-basket",
                    "Smart grocery lists",
                    "Organize ingredients around your planned meals."
                ],
                [
                    "book-open",
                    "Recipe suggestions",
                    "Get practical ideas that match your preferences."
                ],
                [
                    "repeat",
                    "Flexible planning",
                    "Adapt the plan when schedules or preferences change."
                ]
            ],

            focus: [
                [
                    "calendar-days",
                    "Weekly structure",
                    "Organize meals across the week."
                ],
                [
                    "shopping-basket",
                    "Grocery list",
                    "Make shopping more focused."
                ],
                [
                    "book-open",
                    "Recipes",
                    "Keep practical meal ideas available."
                ],
                [
                    "repeat",
                    "Flexibility",
                    "Adjust the plan when life changes."
                ]
            ],

            process: [
                [
                    "01",
                    "Share preferences",
                    "Tell us about your routine, foods and schedule.",
                    "clipboard-list"
                ],
                [
                    "02",
                    "Build your week",
                    "Create a practical meal structure and grocery guidance.",
                    "calendar-days"
                ],
                [
                    "03",
                    "Use & adapt",
                    "Follow the plan while making sensible adjustments.",
                    "utensils"
                ],
                [
                    "04",
                    "Review",
                    "Refine the structure based on your experience.",
                    "refresh-cw"
                ]
            ],

            whoTitle:
                "For people who want less guesswork around meals.",

            whoDescription:
                "This service can help create a clearer weekly meal structure around preferences and schedule.",

            who: [
                "Busy professionals",
                "People who struggle with weekly meal planning",
                "People wanting organized grocery lists",
                "Anyone looking for practical meal ideas"
            ],

            faq: [
                [
                    "Are meal plans flexible?",
                    "Yes. Meal ideas and structure can be adapted to preferences and schedule."
                ],
                [
                    "Do I get grocery suggestions?",
                    "Smart grocery guidance is part of the service structure."
                ],
                [
                    "Can recipes match my preferences?",
                    "Recipe suggestions can be selected around the preferences you share."
                ],
                [
                    "How do I start?",
                    "Complete the assessment and share your normal weekly routine."
                ]
            ],

            ctaTitle:
                "Make your week easier to plan.",

            ctaDescription:
                "Start with an assessment and build a meal structure around your real schedule."
        }
    };


    /* =====================================================
       GET SELECTED SERVICE
    ===================================================== */

    const params = new URLSearchParams(window.location.search);

    const serviceKey = params.get("service") || "weight";

    const service = services[serviceKey] || services.weight;


    /* =====================================================
       HELPER
    ===================================================== */

    const $ = (selector) => {
        return document.querySelector(selector);
    };


    /* =====================================================
       RENDER SERVICE
    ===================================================== */

    function renderService() {

        const category = $("#serviceCategory");
        const title = $("#serviceTitle");
        const description = $("#serviceDescription");
        const image = $("#serviceImage");
        const badge = $("#serviceBadge");

        if (category) {
            category.textContent = service.category;
        }

        if (title) {
            title.textContent = service.title;
        }

        if (description) {
            description.textContent = service.description;
        }

        if (image) {
            image.src = service.image;
            image.alt = service.title;
        }

        if (badge) {
            badge.textContent = service.badge;
        }


        /* -------------------------------------------------
           WHAT YOU GET
        ------------------------------------------------- */

        const whatTitle = $("#whatTitle");
        const whatDescription = $("#whatDescription");

        if (whatTitle) {
            whatTitle.textContent = service.whatTitle;
        }

        if (whatDescription) {
            whatDescription.textContent = service.whatDescription;
        }


        /* -------------------------------------------------
           FOCUS INTRO
        ------------------------------------------------- */

        const focusIntro = $("#focusIntro");

        if (focusIntro) {
            focusIntro.textContent = service.focusIntro;
        }


        /* -------------------------------------------------
           BENEFITS
        ------------------------------------------------- */

        const benefitList = $("#benefitList");

        if (benefitList) {

            benefitList.innerHTML = service.benefits
                .map(item => {

                    return `
                        <article class="benefit-item">

                            <span class="benefit-icon">
                                <i data-lucide="${item[0]}"></i>
                            </span>

                            <h3>${item[1]}</h3>

                            <p>${item[2]}</p>

                        </article>
                    `;

                })
                .join("");
        }


        /* -------------------------------------------------
           FOCUS CARDS
        ------------------------------------------------- */

        const focusGrid = $("#focusGrid");

        if (focusGrid) {

            focusGrid.innerHTML = service.focus
                .map(item => {

                    return `
                        <article class="focus-card">

                            <span class="focus-icon">
                                <i data-lucide="${item[0]}"></i>
                            </span>

                            <h3>${item[1]}</h3>

                            <p>${item[2]}</p>

                        </article>
                    `;

                })
                .join("");
        }


        /* -------------------------------------------------
           PROCESS
        ------------------------------------------------- */

        const processGrid = $("#processGrid");

        if (processGrid) {

            processGrid.innerHTML = service.process
                .map(item => {

                    return `
                        <article class="detail-process-card">

                            <div class="detail-process-number">

                                <span>${item[0]}</span>

                                <i data-lucide="${item[3]}"></i>

                            </div>

                            <h3>${item[1]}</h3>

                            <p>${item[2]}</p>

                        </article>
                    `;

                })
                .join("");
        }


        /* -------------------------------------------------
           WHO IS THIS FOR
        ------------------------------------------------- */

        const whoTitle = $("#whoTitle");
        const whoDescription = $("#whoDescription");
        const whoList = $("#whoList");

        if (whoTitle) {
            whoTitle.textContent = service.whoTitle;
        }

        if (whoDescription) {
            whoDescription.textContent = service.whoDescription;
        }

        if (whoList) {

            whoList.innerHTML = service.who
                .map(item => {

                    return `
                        <div class="who-item">

                            <i data-lucide="circle-check"></i>

                            <span>${item}</span>

                        </div>
                    `;

                })
                .join("");
        }


        /* -------------------------------------------------
           FAQ
        ------------------------------------------------- */

        const faqContainer = $("#detailsFaq");

        if (faqContainer) {

            faqContainer.innerHTML = service.faq
                .map((item, index) => {

                    return `
                        <div class="detail-faq-item ${index === 0 ? "active" : ""}">

                            <button
                                class="detail-faq-question"
                                type="button"
                                aria-expanded="${index === 0}"
                            >

                                <span>${item[0]}</span>

                                <i data-lucide="plus"></i>

                            </button>

                            <div class="detail-faq-answer">

                                <div>

                                    <p>${item[1]}</p>

                                </div>

                            </div>

                        </div>
                    `;

                })
                .join("");
        }


        /* -------------------------------------------------
           CTA
        ------------------------------------------------- */

        const ctaTitle = $("#ctaTitle");
        const ctaDescription = $("#ctaDescription");

        if (ctaTitle) {
            ctaTitle.textContent = service.ctaTitle;
        }

        if (ctaDescription) {
            ctaDescription.textContent = service.ctaDescription;
        }


        /* -------------------------------------------------
           PAGE TITLE
        ------------------------------------------------- */

        document.title = `NutriCare | ${service.title}`;


        /* -------------------------------------------------
           LUCIDE ICONS
        ------------------------------------------------- */

        if (window.lucide) {
            lucide.createIcons();
        }


        /* -------------------------------------------------
           FAQ EVENTS
        ------------------------------------------------- */

        bindFAQ();
    }


    /* =====================================================
       FAQ
    ===================================================== */

    function bindFAQ() {

        const questions =
            document.querySelectorAll(".detail-faq-question");

        questions.forEach(button => {

            button.addEventListener("click", () => {

                const item =
                    button.closest(".detail-faq-item");

                if (!item) {
                    return;
                }

                const isActive =
                    item.classList.contains("active");


                /* Close all */

                document
                    .querySelectorAll(".detail-faq-item")
                    .forEach(otherItem => {

                        otherItem.classList.remove("active");

                        const otherButton =
                            otherItem.querySelector(
                                ".detail-faq-question"
                            );

                        if (otherButton) {
                            otherButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }

                    });


                /* Open clicked */

                if (!isActive) {

                    item.classList.add("active");

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            });

        });
    }


    /* =====================================================
       REVEAL ANIMATION FALLBACK
    ===================================================== */

    function initRevealFallback() {

        const elements =
            document.querySelectorAll(".reveal");


        /* Browser does not support IntersectionObserver */

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

                            entry.target.classList.add("active");

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
       INITIALIZE
    ===================================================== */

    renderService();

    initRevealFallback();

});