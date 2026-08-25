(() => {
  const currentPath = new URL(window.location.href).pathname.replace(/index\.html$/, '');
  const navigation = document.querySelector('.site-header nav');
  if (!navigation) return;
  const topicMatch = currentPath.match(/\/dsa\/([^/]+)\//);
  let links = [...navigation.querySelectorAll('a[href]')];
  if (topicMatch) {
    // Topic pages do not all repeat their topic link in the header, so add the
    // missing link before choosing the most specific active destination.
    const topicPath = `/dsa/${topicMatch[1]}/`;
    const hasTopicLink = links.some(
      (link) =>
        new URL(link.href, window.location.href).pathname.replace(/index\.html$/, '') === topicPath,
    );
    if (!hasTopicLink) {
      const topicLink = document.createElement('a');
      const topicUrl = new URL(window.location.href);
      topicUrl.pathname = topicUrl.pathname.replace(/\/dsa\/.*$/, topicPath);
      topicLink.href = topicUrl.href;
      topicLink.textContent = topicMatch[1]
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
      navigation.append(topicLink);
      links = [...navigation.querySelectorAll('a[href]')];
    }
  }
  const candidates = links
    .map((link) => ({
      link,
      path: new URL(link.href, window.location.href).pathname.replace(/index\.html$/, ''),
    }))
    .filter(({ path }) => path !== '/' && currentPath.startsWith(path));
  // A question page matches several parent paths; the longest match is the
  // deepest topic and therefore the correct active navigation item.
  const active = candidates.sort((left, right) => right.path.length - left.path.length)[0]?.link;
  links.forEach((link) => link.classList.toggle('active', link === active));
})();
