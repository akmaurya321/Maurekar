(() => {
  const article = document.querySelector('.problem-page .prose');
  let navigation = document.querySelector('.article-nav');
  if (!navigation && article) {
    const headings = [...article.querySelectorAll(':scope > h2')];
    if (headings.length > 1) {
      const usedIds = new Set();
      navigation = document.createElement('nav');
      navigation.className = 'article-nav';
      navigation.setAttribute('aria-label', 'Article sections');
      const title = document.createElement('p');
      title.className = 'article-nav-title';
      title.textContent = 'On this page';
      navigation.append(title);
      headings.forEach((heading, index) => {
        const baseId = heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        let id = baseId || `section-${index + 1}`;
        while (usedIds.has(id)) id = `${baseId}-${index + 1}`;
        usedIds.add(id);
        heading.id = id;
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = `${String(index + 1).padStart(2, '0')} · ${heading.textContent}`;
        navigation.append(link);
      });
      article.parentNode.insertBefore(navigation, article);
    }
  }
  if (!navigation) return;

  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  let activeSection = '';
  let scheduled = false;

  // Keep the active link in sync with both observer callbacks and the fallback
  // scroll calculation so clicks and manual scrolling share one code path.
  const setActiveSection = (section) => {
    if (!section || section.id === activeSection) return;
    activeSection = section.id;
    links.forEach((link) =>
      link.classList.toggle('active', link.getAttribute('href') === `#${activeSection}`),
    );
    if (window.innerWidth <= 850) {
      const activeLink = navigation.querySelector(`a[href="#${activeSection}"]`);
      if (activeLink) {
        navigation.scrollTo({
          left: activeLink.offsetLeft - (navigation.clientWidth - activeLink.offsetWidth) / 2,
          behavior: 'smooth',
        });
      }
    }
  };

  const updateNavigation = () => {
    scheduled = false;
    const header = document.querySelector('.site-header');
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    const threshold = headerBottom + navigation.getBoundingClientRect().height + 24;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    });
    setActiveSection(current);
  };

  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.setTimeout(updateNavigation, 0);
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)
          .forEach((entry) => setActiveSection(entry.target));
      },
      { rootMargin: '-18% 0px -68% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
  } else {
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
  }
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  scheduleUpdate();
  window.setTimeout(scheduleUpdate, 100);
})();
