// Abo6 Gamer Portfolio — تفاعلات الموقع مكتوبة بـ JavaScript مع React
const { useEffect, useState } = React;

function Abo6Interactions() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll('#navLinks a');
    const closeMenu = () => setMenuOpen(false);
    links.forEach(link => link.addEventListener('click', closeMenu));

    const sections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => observer.observe(section));

    return () => {
      links.forEach(link => link.removeEventListener('click', closeMenu));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const nav = document.getElementById('navLinks');
    const button = document.getElementById('menuToggle');
    if (nav) nav.classList.toggle('open', menuOpen);
    if (button) button.setAttribute('aria-expanded', String(menuOpen));
  }, [menuOpen]);

  return null;
}

const rootElement = document.createElement('div');
rootElement.id = 'react-interactions';
document.body.appendChild(rootElement);
ReactDOM.createRoot(rootElement).render(React.createElement(Abo6Interactions));

document.getElementById('menuToggle')?.addEventListener('click', () => {
  const nav = document.getElementById('navLinks');
  nav?.classList.toggle('open');
});

// حركة بسيطة لبطاقات الألعاب عند ظهورها على الشاشة
const cards = document.querySelectorAll('.game-card, .trait, .about-panel');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
cards.forEach(card => {
  card.classList.add('reveal-ready');
  revealObserver.observe(card);
});
