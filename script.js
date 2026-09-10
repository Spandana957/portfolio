/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close menu after clicking */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   PROFILE PICTURE — CURSOR-TRACKED GLOW
========================================= */

const heroImage = document.querySelector(".hero-image");
const profileCircle = document.querySelector(".profile-circle");

if (heroImage && profileCircle) {

    heroImage.addEventListener("mousemove", (event) => {

        const rect = profileCircle.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        profileCircle.style.setProperty("--glow-x", `${x}px`);
        profileCircle.style.setProperty("--glow-y", `${y}px`);

    });

    heroImage.addEventListener("mouseenter", () => {

        profileCircle.classList.add("glowing");

    });

    heroImage.addEventListener("mouseleave", () => {

        profileCircle.classList.remove("glowing");

    });

}


/* =========================================
   SCROLL TO TOP
========================================= */

const scrollTop = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTop.style.display = "flex";

    } else {

        scrollTop.style.display = "none";

    }

});


scrollTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const nameField = document.getElementById("name");

    const name = nameField ? nameField.value : "there";

    formStatus.textContent =
        `Thanks ${name}! Your message has been received.`;

    contactForm.reset();

});


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const animatedElements = document.querySelectorAll(
    ".skill-card, .stat-card, .strength, .education-card, .project-container"
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach(element => {

    observer.observe(element);

});