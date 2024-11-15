const nav = document.querySelector(".navbar");
const logo = document.querySelector(".logo");
const navLinks = document.querySelectorAll(".nav-links li");

nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
        e.preventDefault();
        const target = e.target.getAttribute("href");
        if (target === "#") {
            return;
        }
        document.querySelector("body").classList.add("active");
        document.querySelector("body").classList.remove("inactive");
        setTimeout(() => {
            document.querySelector("body").classList.remove("active");
            document.querySelector("body").classList.add("inactive");
        }, 500);
        const navLinks = document.querySelectorAll(".nav-links li");
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove("active");
        }
        const navLink = document.querySelector(`.nav-links li a[href="${target}"]`);
        navLink.classList.add("active");
    }
});

logo.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("body").classList.add("active");
    document.querySelector("body").classList.remove("inactive");
    setTimeout(() => {
        document.querySelector("body").classList.remove("active");
        document.querySelector("body").classList.add("inactive");
    }, 500);
});

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function (e) {
        e.preventDefault();
        const target = e.target.getAttribute("href");
        if (target === "#") {
            return;
        }
        document.querySelector("body").classList.add("active");
        document.querySelector("body").classList.remove("inactive");
        setTimeout(() => {
            document.querySelector("body").classList.remove("active");
            document.querySelector("body").classList.add("inactive");
        }, 500);
        const navLinks = document.querySelectorAll(".nav-links li");
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove("active");
        }
        const navLink = document.querySelector(`.nav-links li a[href="${target}"]`);
        navLink.classList.add("active");
    });
}