/**
 * MAISON DU CACAO — MAIN JAVASCRIPT
 * Lightweight, accessible, framework-free UI interactivity
 */

// Immediate execution for instant loader dismissal
initLoader();

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavigation();
  initThemeMode();
  initDirectionRTL();
  initScrollToTop();
  initInteractiveWidgets();
});

/* --------------------------------------------------------------------------
   1. PAGE LOADER
   -------------------------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add('loaded');
    setTimeout(() => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 400);
  };

  // Immediate dismissal or fast fallback (max 300ms)
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader, { once: true });
    document.addEventListener('DOMContentLoaded', hideLoader, { once: true });
    setTimeout(hideLoader, 350);
  }
}

/* --------------------------------------------------------------------------
   2. NAVIGATION & DROPDOWNS (STRICT CLICK-ONLY BEHAVIOR)
   -------------------------------------------------------------------------- */
function initNavigation() {
  // Highlight active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Desktop Home Dropdown (Click-Only, Never Hover)
  const homeDropdownBtn = document.getElementById('home-dropdown-btn');
  const homeDropdownMenu = document.getElementById('home-dropdown-menu');

  if (homeDropdownBtn && homeDropdownMenu) {
    homeDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = homeDropdownMenu.classList.contains('active');
      if (isActive) {
        homeDropdownMenu.classList.remove('active');
        homeDropdownBtn.setAttribute('aria-expanded', 'false');
      } else {
        homeDropdownMenu.classList.add('active');
        homeDropdownBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking Home 1 or Home 2
    const homeSubLinks = homeDropdownMenu.querySelectorAll('a');
    homeSubLinks.forEach(subLink => {
      subLink.addEventListener('click', () => {
        homeDropdownMenu.classList.remove('active');
        homeDropdownBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!homeDropdownMenu.contains(e.target) && e.target !== homeDropdownBtn) {
        homeDropdownMenu.classList.remove('active');
        homeDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile Menu Toggle & Backdrop Management
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuToggle && mobileMenuDrawer) {
    // Create or reuse backdrop overlay
    let backdrop = document.getElementById('mobile-menu-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'mobile-menu-backdrop';
      backdrop.className = 'hidden';
      document.body.appendChild(backdrop);
    }

    const openDrawer = () => {
      mobileMenuDrawer.classList.remove('hidden');
      backdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    };

    const closeDrawer = () => {
      mobileMenuDrawer.classList.add('hidden');
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    };

    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenuDrawer.classList.contains('hidden');
      if (isHidden) {
        openDrawer();
      } else {
        closeDrawer();
      }
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDrawer();
      });
    }

    // Backdrop click closes drawer
    backdrop.addEventListener('click', () => {
      closeDrawer();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenuDrawer.classList.contains('hidden')) {
        closeDrawer();
      }
    });

    // Auto close on window resize to desktop (1024px+)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && !mobileMenuDrawer.classList.contains('hidden')) {
        closeDrawer();
      }
    });

    // Mobile Home Accordion with rotating chevron
    const mobileHomeBtn = document.getElementById('mobile-home-btn');
    const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');
    if (mobileHomeBtn && mobileHomeSubmenu) {
      const chevron = mobileHomeBtn.querySelector('svg');
      if (chevron) {
        chevron.style.transition = 'transform 0.25s ease';
      }
      mobileHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isSubHidden = mobileHomeSubmenu.classList.toggle('hidden');
        if (chevron) {
          chevron.style.transform = isSubHidden ? 'rotate(0deg)' : 'rotate(180deg)';
        }
        mobileHomeBtn.setAttribute('aria-expanded', (!isSubHidden).toString());
      });
    }

    // Close mobile menu when clicking any link
    const mobileLinks = mobileMenuDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. DARK / LIGHT MODE TOGGLE (#000000 pure dark default)
   -------------------------------------------------------------------------- */
function initThemeMode() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('theme_mode');

  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    updateThemeIcons(true);
  } else {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    updateThemeIcons(false);
  }

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCurrentlyLight = document.documentElement.classList.contains('light');
      const willBeLight = !isCurrentlyLight;
      
      if (willBeLight) {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
      
      localStorage.setItem('theme_mode', willBeLight ? 'light' : 'dark');
      updateThemeIcons(willBeLight);
    });
  });

  function updateThemeIcons(isLight) {
    document.querySelectorAll('.theme-icon-sun').forEach(el => {
      el.classList.toggle('hidden', !isLight);
    });
    document.querySelectorAll('.theme-icon-moon').forEach(el => {
      el.classList.toggle('hidden', isLight);
    });
    document.querySelectorAll('.theme-badge').forEach(el => {
      el.textContent = isLight ? 'LIGHT' : 'DARK';
    });
  }
}

/* --------------------------------------------------------------------------
   4. RTL / LTR TOGGLE (Persisted via localStorage)
   -------------------------------------------------------------------------- */
function initDirectionRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('site_direction') || 'ltr';

  document.documentElement.dir = savedDir;
  updateRTLButtons(savedDir);

  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.dir;
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.dir = newDir;
      localStorage.setItem('site_direction', newDir);
      updateRTLButtons(newDir);
    });
  });

  function updateRTLButtons(dir) {
    document.querySelectorAll('.rtl-badge').forEach(badge => {
      badge.textContent = dir.toUpperCase();
    });
  }
}

/* --------------------------------------------------------------------------
   5. SCROLL-TO-TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE WIDGETS (TABS, FILTERS & MODALS)
   -------------------------------------------------------------------------- */
function initInteractiveWidgets() {
  // Product filter tabs (Products Page)
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-item-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');

        const filter = btn.getAttribute('data-filter');
        productCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Interactive Cacao Percentage Slider (Home 2)
  const cacaoSlider = document.getElementById('cacao-percentage-slider');
  const cacaoValue = document.getElementById('cacao-percentage-val');
  const cacaoDescriptor = document.getElementById('cacao-taste-profile');
  const cacaoPills = document.querySelectorAll('.cacao-pill-btn');

  if (cacaoSlider && cacaoValue && cacaoDescriptor) {
    const profiles = {
      55: 'Delicate creamy milk chocolate with Madagascar vanilla & caramel undertones.',
      65: 'Balanced semi-sweet dark with bright notes of red fruit & jasmine blossom.',
      75: 'Intense single-origin Venezuelan Criollo with roasted hazelnut & dark cherry notes.',
      85: 'Robust, earthy deep cocoa with mineral depth and subtle cedar wood finish.',
      100: 'Pure unadulterated Peruvian cacao paste; primal, bold, zero sugar for true purists.'
    };

    const updateProfile = (val) => {
      cacaoValue.textContent = val + '%';
      cacaoSlider.value = val;
      
      const keys = [55, 65, 75, 85, 100];
      const closest = keys.reduce((prev, curr) => Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
      cacaoDescriptor.textContent = profiles[closest];

      if (cacaoPills.length > 0) {
        cacaoPills.forEach(p => {
          if (p.getAttribute('data-val') === String(closest)) {
            p.classList.add('bg-[#E8C77A]', 'text-[#1A0B06]', 'font-bold');
            p.classList.remove('bg-[#1A0B06]', 'text-[#FFF4D6]');
          } else {
            p.classList.remove('bg-[#E8C77A]', 'text-[#1A0B06]', 'font-bold');
            p.classList.add('bg-[#1A0B06]', 'text-[#FFF4D6]');
          }
        });
      }
    };

    cacaoSlider.addEventListener('input', (e) => {
      updateProfile(e.target.value);
    });

    if (cacaoPills.length > 0) {
      cacaoPills.forEach(pill => {
        pill.addEventListener('click', () => {
          const targetVal = pill.getAttribute('data-val');
          updateProfile(targetVal);
        });
      });
    }
  }

  // Curriculum Workshop Pathway Filter (Classes Page)
  const curriculumBtns = document.querySelectorAll('.curriculum-filter-btn');
  const curriculumItems = document.querySelectorAll('.masterclass-editorial-item');

  if (curriculumBtns.length > 0 && curriculumItems.length > 0) {
    curriculumBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        curriculumBtns.forEach(b => b.classList.remove('active-pathway'));
        btn.classList.add('active-pathway');

        const target = btn.getAttribute('data-target');
        curriculumItems.forEach(item => {
          if (target === 'all' || item.id === target) {
            item.style.display = '';
            item.style.animation = 'none';
            void item.offsetWidth;
            item.style.animation = 'fadeInUpMasterclass 0.4s cubic-bezier(0.16, 1, 0.3, 1) both';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Chef Instructor & Master Dossier Tabs (Classes Page Section 04)
  const dossierBtns = document.querySelectorAll('.dossier-tab-btn');
  const dossierPanels = document.querySelectorAll('.dossier-content-panel');

  if (dossierBtns.length > 0 && dossierPanels.length > 0) {
    dossierBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dossierBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-dossier-target');
        dossierPanels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.remove('hidden');
            panel.style.animation = 'none';
            void panel.offsetWidth;
            panel.style.animation = 'fadeInDossier 0.4s cubic-bezier(0.16, 1, 0.3, 1) both';
          } else {
            panel.classList.add('hidden');
          }
        });
      });
    });
  }

  // Corporate Hamper Suites Filter (Gifting Page Section 03)
  const hamperBtns = document.querySelectorAll('.hamper-filter-btn');
  const hamperCards = document.querySelectorAll('.hamper-suite-card');

  if (hamperBtns.length > 0 && hamperCards.length > 0) {
    hamperBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        hamperBtns.forEach(b => b.classList.remove('active-hamper'));
        btn.classList.add('active-hamper');

        const target = btn.getAttribute('data-hamper-target');
        hamperCards.forEach(card => {
          if (target === 'all' || card.getAttribute('data-hamper-id') === target) {
            card.style.display = '';
            card.classList.remove('opacity-30', 'grayscale');
            card.classList.add('opacity-100');
            card.style.animation = 'none';
            void card.offsetWidth;
            card.style.animation = 'fadeInDossier 0.4s cubic-bezier(0.16, 1, 0.3, 1) both';
          } else {
            card.classList.add('opacity-30', 'grayscale');
            card.classList.remove('opacity-100');
          }
        });
      });
    });
  }
}


