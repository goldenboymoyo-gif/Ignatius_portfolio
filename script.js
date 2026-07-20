const data = getPortfolioData();
const projects = data.work.projects;
const grid = document.getElementById('portfolio-grid');

function render(filter) {
  grid.innerHTML = "";
  projects.filter(p => filter === 'all' || p.cat === filter).forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
      <div class="info">
        <div class="cat">${p.label}</div>
        <h4>${p.title}</h4>
        <div class="desc">${p.desc}</div>
      </div>`;
    card.addEventListener('click', () => openLightbox(p));
    grid.appendChild(card);
  });
}
render('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter);
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCap = document.getElementById('lightbox-cap');
function openLightbox(p) {
  lightboxImg.src = p.img;
  lightboxImg.alt = p.title;
  lightboxCap.textContent = p.title + " — " + p.desc;
  lightbox.classList.add('open');
}
document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

const menuToggle = document.getElementById('menu-toggle');
const mobilePanel = document.getElementById('mobile-panel');
menuToggle.addEventListener('click', () => {
  const isOpen = mobilePanel.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
mobilePanel.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobilePanel.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.01, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

const navLinks = document.querySelectorAll('#nav-links a[data-section]');
const spySections = ['about', 'work', 'experience', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

function updateActiveNav() {
  const referenceY = 160;
  let currentId = null;
  for (const sec of spySections) {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= referenceY) {
      currentId = sec.id;
    }
  }
  const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 4);
  if (atBottom && spySections.length) {
    currentId = spySections[spySections.length - 1].id;
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === currentId);
  });
}

let spyTicking = false;
window.addEventListener('scroll', () => {
  if (!spyTicking) {
    requestAnimationFrame(() => { updateActiveNav(); spyTicking = false; });
    spyTicking = true;
  }
});
updateActiveNav();

const heroPortrait = document.getElementById('hero-portrait');
const heroPortraitImg = document.getElementById('hero-portrait-img');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroPortrait && heroPortraitImg && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
  heroPortrait.addEventListener('mousemove', (e) => {
    const rect = heroPortrait.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = x * 10;
    const rotateX = -y * 10;
    heroPortraitImg.style.transform = `scale(1.04) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });
  heroPortrait.addEventListener('mouseleave', () => {
    heroPortraitImg.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
  });
}
