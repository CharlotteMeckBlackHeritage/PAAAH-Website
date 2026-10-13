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

    // Preview cleanup: remove the temporary email-provider setup note under the signup form.
    document.querySelectorAll('.signup small').forEach((note) => note.remove());

// Preview gallery: replace unavailable placeholder sources with archived photographs.
(() => {
  const photographs = ["Excelsior004.jpg","carolina room.jpg","jcsu students.jpg","jcsu cheerleaders.jpg","Celebrating 50 Years of Civil Rights Advocacy-4495.jpg","Hats on for T.D. - 90th Birthday Celebration-64.jpg","League of Women Voters - 2017 Annual Meeting-48.jpg","Allegra Westbrooks2.jpg","CMBHC Thereasea C. Elder Trailblazer Award 2015-18.jpg","CMBHC Thereasea C. Elder Trailblazer Award '15-28.jpg","DSC_0072.JPG"];
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  galleryImages.forEach((img, index) => {
    if (index >= photographs.length) return;
    img.src = 'https://raw.githubusercontent.com/CharlotteMeckBlackHeritage/PAAAH-Website/preview/' + encodeURIComponent(photographs[index]);
    img.alt = photographs[index].replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    img.loading = 'lazy';
    const captions = [
      { title: 'Jimmie McKee at Excelsior Club', credit: 'UNC Charlotte J. Murrey Atkins Archives' },
      { title: 'Newspaper carriers', credit: 'Robinson Spangler Room' },
      { title: 'Johnson C. Smith Students studying', credit: 'Johnson C. Smith Archives' }
    ];
    const caption = img.closest('figure')?.querySelector('figcaption');
    if (caption && index < captions.length) {
      caption.replaceChildren();
      caption.append(document.createTextNode(captions[index].title));
      const credit = document.createElement('span');
      credit.textContent = captions[index].credit;
      caption.append(credit);
      img.alt = captions[index].title;
    } else if (caption) {
      caption.querySelectorAll('span').forEach((span) => {
        if (/provenance\s+pending/i.test(span.textContent || '')) span.remove();
      });
    }
  });
})();
