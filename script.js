/* =========================================
   PRELOADER + HERO ENTRANCE
========================================= */

const preloader = document.getElementById("preloader");

function revealPage() {

    document.body.classList.add("loaded");

    if (preloader) {
        preloader.classList.add("hide");
    }

}

// Hide as soon as everything is loaded, with a small minimum
// display time so the animation doesn't just flash on fast connections.
const preloaderStart = Date.now();
const MIN_PRELOADER_TIME = 700;

window.addEventListener("load", () => {

    const elapsed = Date.now() - preloaderStart;
    const remaining = Math.max(MIN_PRELOADER_TIME - elapsed, 0);

    setTimeout(revealPage, remaining);

});

// Safety fallback in case the load event is delayed by a slow asset.
setTimeout(revealPage, 2500);


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

    const name =
        document.getElementById("name") ?
        document.getElementById("name").value :
        "";

    formStatus.textContent = name ?
        `Thanks ${name}! Your message has been received.` :
        "Thanks! Your message has been received.";

    contactForm.reset();

});


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const animatedElements = document.querySelectorAll(".reveal-item");


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            // Toggle instead of only adding, so every card, heading, and
            // panel replays its reveal animation each time it re-enters
            // view — scrolling down past it or back up over it again.
            entry.target.classList.toggle("show", entry.isIntersecting);

        });

    },
    {
        threshold: 0.2,
        rootMargin: "-40px 0px -40px 0px"
    }
);


animatedElements.forEach(element => {

    observer.observe(element);

});