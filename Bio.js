function goToPage(pageUrl) {
  window.location.href = pageUrl;
}

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return; // Exit if toggle button doesn't exist

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "dark");
    }
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  }

  // Load preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(savedTheme || (prefersDark ? "dark" : "light"));

  toggle.addEventListener("click", toggleTheme);

  // Hamburger menu toggle
  let toggleMenu = null;
  const menuBtn = document.querySelector('.menu__btn');
  if (menuBtn) {
    toggleMenu = function() {
      const isOpen = document.body.classList.contains('menu-open');
      if (isOpen) {
        document.body.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      } else {
        document.body.classList.add('menu-open');
        menuBtn.setAttribute('aria-expanded', 'true');
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    menuBtn.addEventListener('keydown', function(e) {
      const isEnter = e.key === 'Enter';
      const isSpace = e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar';
      if (isEnter || isSpace) {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu when clicking a menu item
    const menuItems = document.querySelectorAll('.menu__item');
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        if (document.body.classList.contains('menu-open')) {
          toggleMenu();
        }
      });
    });
  }

  // Close menu with Escape key
  if (toggleMenu) {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        toggleMenu();
      }
    });
  }
});
