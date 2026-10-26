/* =========================================
   PRELOADER + HERO ENTRANCE
========================================= */

const preloader = document.getElementById("preloader");

function revealPage() {
    document.body.classList.add("loaded");
    if (preloader) preloader.classList.add("hide");
}

// Small minimum display time so the animation doesn't just flash on fast connections.
const preloaderStart = Date.now();
const MIN_PRELOADER_TIME = 700;

window.addEventListener("load", () => {
    const elapsed = Date.now() - preloaderStart;
    setTimeout(revealPage, Math.max(MIN_PRELOADER_TIME - elapsed, 0));
});

// Safety fallback in case the load event is delayed by a slow asset.
setTimeout(revealPage, 2500);


/* =========================================
   THEME TOGGLE (dark / light)
========================================= */

const themeBtn = document.getElementById("theme-btn");
const root = document.documentElement;

function applyTheme(theme) {
    if (theme === "light") {
        root.setAttribute("data-theme", "light");
    } else {
        root.removeAttribute("data-theme");
    }

    const isLight = theme === "light";
    const icon = themeBtn.querySelector("i");

    // Show the icon of the theme you will switch TO
    icon.classList.toggle("fa-sun", !isLight);
    icon.classList.toggle("fa-moon", isLight);

    themeBtn.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isLight ? "#f6f7fb" : "#0b0d12");
}

let currentTheme = "dark";
try {
    currentTheme = localStorage.getItem("theme") === "light" ? "light" : "dark";
} catch (e) {}

applyTheme(currentTheme);

themeBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(currentTheme);
    try {
        localStorage.setItem("theme", currentTheme);
    } catch (e) {}
});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

function setMenu(open) {
    navbar.classList.toggle("active", open);

    const icon = menuBtn.querySelector("i");
    icon.classList.toggle("fa-xmark", open);
    icon.classList.toggle("fa-bars", !open);

    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => {
    setMenu(!navbar.classList.contains("active"));
});

// Close menu after clicking a link
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
});

// Close menu with Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
});


/* =========================================
   SCROLL TO TOP + ACTIVE NAVIGATION
========================================= */

const scrollTop = document.getElementById("scroll-top");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

const navTargets = Array.from(navLinks).map(link =>
    link.getAttribute("href").slice(1)
);

function onScroll() {

    scrollTop.style.display = window.scrollY > 500 ? "flex" : "none";

    let current = "";

    sections.forEach(section => {
        // Only sections that have a nav link can become "current", so
        // linkless sections (like Strengths) keep the previous highlight.
        if (
            navTargets.includes(section.id) &&
            window.scrollY >= section.offsetTop - 200
        ) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });

}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

scrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const animatedElements = document.querySelectorAll(".reveal-item");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            // Toggle so every card, heading and panel replays its reveal
            // each time it re-enters view.
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    },
    {
        threshold: 0.2,
        rootMargin: "-40px 0px -40px 0px"
    }
);

animatedElements.forEach(element => observer.observe(element));