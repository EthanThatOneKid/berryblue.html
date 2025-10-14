// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const closeMobileMenu = document.getElementById(
  "closeMobileMenu",
);
const sidebar = document.getElementById("sidebar");
const navLinks = sidebar.querySelectorAll('a[href^="#"]');

mobileMenuBtn.addEventListener("click", () => {
  sidebar.classList.remove("hidden");
  sidebar.classList.add("translate-x-0");
  mobileMenuBtn.classList.add("hidden");
});

closeMobileMenu.addEventListener("click", () => {
  sidebar.classList.add("hidden");
  sidebar.classList.remove("translate-x-0");
  mobileMenuBtn.classList.remove("hidden");
});

// Close mobile menu when clicking nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
      sidebar.classList.add("hidden");
      sidebar.classList.remove("translate-x-0");
      mobileMenuBtn.classList.remove("hidden");
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    window.innerWidth < 1024 &&
    !sidebar.contains(e.target) &&
    !mobileMenuBtn.contains(e.target) &&
    !sidebar.classList.contains("hidden")
  ) {
    sidebar.classList.add("hidden");
    sidebar.classList.remove("translate-x-0");
    mobileMenuBtn.classList.remove("hidden");
  }
});

// Initialize mobile menu state
if (window.innerWidth < 1024) {
  sidebar.classList.add("hidden");
}
