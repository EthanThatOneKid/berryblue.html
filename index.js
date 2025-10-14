// Sidenav functionality following Adam Argyle's tutorial
const sidenav = document.querySelector("#sidenav-open");
const sidenavButton = document.querySelector("#sidenav-button");
const sidenavClose = document.querySelector("#sidenav-close");

// Escape key handling
sidenav.addEventListener("keyup", (event) => {
  if (event.code === "Escape") {
    document.location.hash = "";
  }
});

// Focus management after transitions
sidenav.addEventListener("transitionend", () => {
  const isOpen = document.location.hash === "#sidenav-open";

  if (isOpen) {
    sidenavClose.focus();
    sidenavButton.classList.add("hidden");
  } else {
    sidenavButton.focus();
    sidenavButton.classList.remove("hidden");
  }
});

// Handle initial state and hash changes
function updateHamburgerVisibility() {
  const isOpen = document.location.hash === "#sidenav-open";
  if (isOpen) {
    sidenavButton.classList.add("hidden");
  } else {
    sidenavButton.classList.remove("hidden");
  }
}

// Update on page load
updateHamburgerVisibility();

// Update on hash change
globalThis.addEventListener("hashchange", updateHamburgerVisibility);

// Browser history management for close button
sidenavClose.addEventListener("click", () => {
  history.go(-1);
});

// Close sidenav when clicking navigation links (mobile only)
const navLinks = sidenav.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (globalThis.innerWidth <= 540) {
      document.location.hash = "";
    }
  });
});
