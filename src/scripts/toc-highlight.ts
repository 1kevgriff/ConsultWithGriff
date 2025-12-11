// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('[data-toc-link]');
  const headings = document.querySelectorAll('.markdown-body h2, .markdown-body h3');

  if (!headings.length) return;

  const observerOptions = {
    rootMargin: '-80px 0px -80% 0px',
    // Top: -80px accounts for sticky header
    // Bottom: -80% activates when heading is 20% from top
    threshold: 0,
  };

  const setActiveLink = (id: string) => {
    tocLinks.forEach((link) => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-target="${id}"]`);
    activeLink?.classList.add('active');
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  headings.forEach((heading) => observer.observe(heading));
});
