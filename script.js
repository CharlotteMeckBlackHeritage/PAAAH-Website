const header = document.querySelector('[data-header]');
    const nav = document.querySelector('[data-nav]');
    const toggle = document.querySelector('[data-nav-toggle]');
    const year = document.querySelector('[data-year]');

    year.textContent = new Date().getFullYear();

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open');
    });

    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    });