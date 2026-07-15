const projects = [
    {img:"assets/proj-zepi.jpg", title:"Zepi Enterprise", cat:"print", label:"Print & Brochures", desc:"Business profile brochure for a grains & fresh-food distribution company."},
    {img:"assets/proj-luxe.jpg", title:"Luxe Countryside Convention Center", cat:"print", label:"Print & Brochures", desc:"Business profile for an event venue near Victoria Falls."},
    {img:"assets/proj-muya.jpg", title:"Muya Easy Cash", cat:"branding", label:"Branding & Identity", desc:"Flyer and business card suite for a quick-loan finance brand."},
    {img:"assets/proj-elitrasmart.jpg", title:"Elitrasmart Medical Supplies", cat:"print", label:"Print & Brochures", desc:"First-edition company newsletter covering healthcare community stories."},
    {img:"assets/proj-ddunkah.jpg", title:"Ddunkah Investments", cat:"branding", label:"Branding & Identity", desc:"Business card design for a Lusaka-based investment firm."},
    {img:"assets/proj-travel.jpg", title:"Victoria Falls Travel Brochure", cat:"print", label:"Print & Brochures", desc:"Tri-fold brochure for safari, rafting and Victoria Falls tour packages."},
    {img:"assets/proj-carrent.jpg", title:"Car Rental Flyer", cat:"campaign", label:"Campaigns & Social", desc:"Promotional PSD flyer template for a vehicle rental service."},
    {img:"assets/proj-eagle.jpg", title:"Eagle Energy Drink", cat:"packaging", label:"Packaging", desc:"Can label and packaging design for an energy drink brand."},
    {img:"assets/proj-hairfood.jpg", title:"Hair Food — Golden Oil", cat:"packaging", label:"Packaging", desc:"Product label and bottle packaging for a hair-care oil range."},
    {img:"assets/proj-kasensa.jpg", title:"Kasensa Mineral Water", cat:"campaign", label:"Campaigns & Social", desc:"Social media advertising creative for a mineral water brand."},
    {img:"assets/proj-healingbalm.jpg", title:"The Healing Balm Foundation", cat:"print", label:"Print & Brochures", desc:"Awareness flyer for an NGO focused on gender justice and disability inclusion."},
    {img:"assets/proj-kawama.jpg", title:"Kawama Aka", cat:"packaging", label:"Packaging", desc:"Can design for an orange-flavoured soft drink."},
    {img:"assets/proj-eroyal.jpg", title:"E.Royal Modeling Management Org", cat:"branding", label:"Branding & Identity", desc:"Company profile cover design for a modeling management agency."},
    {img:"assets/proj-menu.jpg", title:"Restaurant Food Menu", cat:"campaign", label:"Campaigns & Social", desc:"Promotional food menu flyer for a Mosi-oa-Tunya Road restaurant."},
    {img:"assets/proj-weekend.jpg", title:"Weekend Special Table Tent", cat:"campaign", label:"Campaigns & Social", desc:"In-restaurant table tent card promoting a weekend giveaway."},
  ];

  const grid = document.getElementById('portfolio-grid');
  function render(filter){
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
  function openLightbox(p){
    lightboxImg.src = p.img;
    lightboxImg.alt = p.title;
    lightboxCap.textContent = p.title + " — " + p.desc;
    lightbox.classList.add('open');
  }
  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });

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
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.01, rootMargin:'0px 0px -40px 0px'});
  revealEls.forEach(el=>io.observe(el));

// Scroll-spy: highlight the active nav link based on which section is currently in view.
// Uses a scroll-position check (closest section top above a reference line) rather than
// IntersectionObserver margins, which misfire when sections have very different heights.
const navLinks = document.querySelectorAll('#nav-links a[data-section]');
const spySections = ['about','work','experience','contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

function updateActiveNav(){
  const referenceY = 160; // px from top of viewport
  let currentId = null;
  for (const sec of spySections){
    const rect = sec.getBoundingClientRect();
    if (rect.top <= referenceY){
      currentId = sec.id;
    }
  }
  // If the page is scrolled to (or very near) the bottom, force-activate the last
  // section — short trailing sections may never cross the reference line otherwise.
  const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 4);
  if (atBottom && spySections.length){
    currentId = spySections[spySections.length - 1].id;
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === currentId);
  });
}

let spyTicking = false;
window.addEventListener('scroll', () => {
  if (!spyTicking){
    requestAnimationFrame(() => { updateActiveNav(); spyTicking = false; });
    spyTicking = true;
  }
});
updateActiveNav();

// Subtle hero portrait tilt following the cursor (desktop only, respects reduced motion)
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