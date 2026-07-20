(function() {
  const ADMIN_PASSWORD = 'crsmedia2026';
  const SESSION_KEY = 'adminAuth';
  let data = null;
  let editingProjectIndex = -1;
  let editingRoleIndex = -1;

  // --- Auth ---
  const loginScreen = document.getElementById('login-screen');
  const dashboard = document.getElementById('dashboard');
  const passwordInput = document.getElementById('password-input');
  const loginBtn = document.getElementById('login-btn');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  function checkAuth() {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      loginScreen.style.display = 'none';
      dashboard.classList.add('active');
      loadData();
    }
  }

  loginBtn.addEventListener('click', () => {
    if (passwordInput.value === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      loginScreen.style.display = 'none';
      dashboard.classList.add('active');
      loadData();
    } else {
      loginError.classList.add('show');
      passwordInput.value = '';
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loginBtn.click();
  });

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem(SESSION_KEY);
    location.reload();
  });

  checkAuth();

  // --- Data ---
  function loadData() {
    data = getPortfolioData();
    populateHero();
    populateAbout();
    populateWork();
    populateExperience();
    populateContact();
    populateSettings();
  }

  // --- MOBILE MENU ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebar = document.querySelector('.sidebar');

  function closeMobileMenu() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('show');
  }

  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('show');
  });

  sidebarOverlay.addEventListener('click', closeMobileMenu);

  // --- Navigation ---
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.getElementById('section-' + section).classList.add('active');
      closeMobileMenu();
    });
  });

  // --- Toast ---
  function showToast(msg, type) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast ' + type;
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // --- HERO ---
  function populateHero() {
    document.getElementById('hero-eyebrow').value = data.hero.eyebrow;
    document.getElementById('hero-headline').value = data.hero.headline;
    document.getElementById('hero-lede').value = data.hero.lede;
    document.getElementById('hero-portrait').value = data.hero.portrait;
    document.getElementById('hero-tag').value = data.hero.tag;
    renderStats();
  }

  function renderStats() {
    const container = document.getElementById('hero-stats');
    container.innerHTML = '';
    data.hero.stats.forEach((stat, i) => {
      const row = document.createElement('div');
      row.className = 'card-grid';
      row.style.marginBottom = '12px';
      row.innerHTML = `
        <div class="form-group">
          <label>Value</label>
          <input type="text" value="${esc(stat.value)}" data-idx="${i}" data-field="value" class="stat-field">
        </div>
        <div class="form-group" style="display:flex;gap:10px;align-items:flex-end;">
          <div style="flex:1;">
            <label>Label</label>
            <input type="text" value="${esc(stat.label)}" data-idx="${i}" data-field="label" class="stat-field">
          </div>
          <button class="btn btn-danger btn-sm btn-icon remove-stat" data-idx="${i}" style="margin-bottom:4px;">✕</button>
        </div>`;
      container.appendChild(row);
    });
    container.querySelectorAll('.stat-field').forEach(input => {
      input.addEventListener('input', () => {
        const idx = parseInt(input.dataset.idx);
        data.hero.stats[idx][input.dataset.field] = input.value;
      });
    });
    container.querySelectorAll('.remove-stat').forEach(btn => {
      btn.addEventListener('click', () => {
        data.hero.stats.splice(parseInt(btn.dataset.idx), 1);
        renderStats();
      });
    });
  }

  document.getElementById('add-stat').addEventListener('click', () => {
    data.hero.stats.push({ value: '', label: '' });
    renderStats();
  });

  document.getElementById('save-hero').addEventListener('click', () => {
    data.hero.eyebrow = document.getElementById('hero-eyebrow').value;
    data.hero.headline = document.getElementById('hero-headline').value;
    data.hero.lede = document.getElementById('hero-lede').value;
    data.hero.portrait = document.getElementById('hero-portrait').value;
    data.hero.tag = document.getElementById('hero-tag').value;
    savePortfolioData(data);
    showToast('Hero section saved!', 'success');
  });

  // --- ABOUT ---
  function populateAbout() {
    document.getElementById('about-eyebrow').value = data.about.eyebrow;
    document.getElementById('about-headline').value = data.about.headline;
    renderParagraphs();
    renderChips('skills-software', data.about.skills.software);
    renderChips('skills-production', data.about.skills.production);
    renderChips('skills-core', data.about.skills.core);
  }

  function renderParagraphs() {
    const container = document.getElementById('about-paragraphs');
    container.innerHTML = '';
    data.about.paragraphs.forEach((p, i) => {
      const row = document.createElement('div');
      row.className = 'list-item';
      row.style.alignItems = 'flex-start';
      row.innerHTML = `
        <textarea rows="3" data-idx="${i}" class="para-field" style="flex:1;padding:10px 14px;background:var(--bg-2);border:1px solid var(--line);border-radius:6px;color:var(--ink);font-size:13.5px;font-family:'Inter',sans-serif;resize:vertical;">${esc(p)}</textarea>
        <button class="btn btn-danger btn-sm btn-icon remove-para" data-idx="${i}" style="margin-top:4px;">✕</button>`;
      container.appendChild(row);
    });
    container.querySelectorAll('.para-field').forEach(textarea => {
      textarea.addEventListener('input', () => {
        data.about.paragraphs[parseInt(textarea.dataset.idx)] = textarea.value;
      });
    });
    container.querySelectorAll('.remove-para').forEach(btn => {
      btn.addEventListener('click', () => {
        data.about.paragraphs.splice(parseInt(btn.dataset.idx), 1);
        renderParagraphs();
      });
    });
  }

  document.getElementById('add-paragraph').addEventListener('click', () => {
    data.about.paragraphs.push('');
    renderParagraphs();
  });

  function renderChips(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach((item, i) => {
      const chip = document.createElement('span');
      chip.className = 'chip-item';
      chip.innerHTML = `${esc(item)} <span class="remove" data-idx="${i}">✕</span>`;
      container.appendChild(chip);
    });
    container.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const skillKey = containerId.replace('skills-', '');
        data.about.skills[skillKey].splice(parseInt(btn.dataset.idx), 1);
        renderChips(containerId, data.about.skills[skillKey]);
      });
    });
  }

  document.querySelectorAll('.add-skill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const skillKey = target.replace('skills-', '');
      const input = document.getElementById('new-' + target);
      if (input.value.trim()) {
        data.about.skills[skillKey].push(input.value.trim());
        renderChips(target, data.about.skills[skillKey]);
        input.value = '';
      }
    });
  });

  document.querySelectorAll('[id^="new-skill-"]').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const skillKey = input.id.replace('new-skill-', '');
        const containerId = 'skills-' + skillKey;
        if (input.value.trim()) {
          data.about.skills[skillKey].push(input.value.trim());
          renderChips(containerId, data.about.skills[skillKey]);
          input.value = '';
        }
      }
    });
  });

  document.getElementById('save-about').addEventListener('click', () => {
    data.about.eyebrow = document.getElementById('about-eyebrow').value;
    data.about.headline = document.getElementById('about-headline').value;
    savePortfolioData(data);
    showToast('About section saved!', 'success');
  });

  // --- WORK ---
  function populateWork() {
    document.getElementById('work-eyebrow').value = data.work.eyebrow;
    document.getElementById('work-headline').value = data.work.headline;
    document.getElementById('work-desc').value = data.work.description;
    renderCategories();
    renderProjects();
    updateCatSelect();
  }

  function renderCategories() {
    const container = document.getElementById('work-categories');
    container.innerHTML = '';
    data.work.categories.forEach((cat, i) => {
      if (cat.key === 'all') return;
      const row = document.createElement('div');
      row.className = 'list-item';
      row.innerHTML = `
        <input type="text" value="${esc(cat.key)}" data-idx="${i}" data-field="key" class="cat-field" style="max-width:160px;" placeholder="Key">
        <input type="text" value="${esc(cat.label)}" data-idx="${i}" data-field="label" class="cat-field" placeholder="Label">
        <button class="btn btn-danger btn-sm btn-icon remove-cat" data-idx="${i}">✕</button>`;
      container.appendChild(row);
    });
    container.querySelectorAll('.cat-field').forEach(input => {
      input.addEventListener('input', () => {
        const idx = parseInt(input.dataset.idx);
        data.work.categories[idx][input.dataset.field] = input.value;
        updateCatSelect();
      });
    });
    container.querySelectorAll('.remove-cat').forEach(btn => {
      btn.addEventListener('click', () => {
        data.work.categories.splice(parseInt(btn.dataset.idx), 1);
        renderCategories();
        updateCatSelect();
      });
    });
  }

  function updateCatSelect() {
    const select = document.getElementById('proj-cat');
    select.innerHTML = '';
    data.work.categories.forEach((cat, i) => {
      const opt = document.createElement('option');
      opt.value = cat.key;
      opt.textContent = cat.label;
      select.appendChild(opt);
    });
    select.addEventListener('change', () => {
      const cat = data.work.categories.find(c => c.key === select.value);
      if (cat) document.getElementById('proj-label').value = cat.label;
    });
  }

  document.getElementById('add-category-btn').addEventListener('click', () => {
    const key = document.getElementById('new-cat-key').value.trim();
    const label = document.getElementById('new-cat-label').value.trim();
    if (key && label) {
      data.work.categories.push({ key, label });
      renderCategories();
      updateCatSelect();
      document.getElementById('new-cat-key').value = '';
      document.getElementById('new-cat-label').value = '';
    }
  });

  function renderProjects() {
    const container = document.getElementById('work-projects');
    container.innerHTML = '';
    if (data.work.projects.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No projects yet. Click "+ Add Project" to get started.</p></div>';
      return;
    }
    data.work.projects.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="thumb"><img src="${esc(p.img)}" alt="${esc(p.title)}" onerror="this.style.display='none'"></div>
        <div class="info">
          <div class="cat">${esc(p.label)}</div>
          <h4>${esc(p.title)}</h4>
          <div class="desc">${esc(p.desc)}</div>
        </div>
        <div class="actions">
          <button class="btn btn-secondary btn-sm edit-proj" data-idx="${i}">Edit</button>
          <button class="btn btn-danger btn-sm del-proj" data-idx="${i}">Delete</button>
        </div>`;
      container.appendChild(card);
    });
    container.querySelectorAll('.edit-proj').forEach(btn => {
      btn.addEventListener('click', () => openProjectModal(parseInt(btn.dataset.idx)));
    });
    container.querySelectorAll('.del-proj').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this project?')) {
          data.work.projects.splice(parseInt(btn.dataset.idx), 1);
          renderProjects();
        }
      });
    });
  }

  document.getElementById('add-project-btn').addEventListener('click', () => openProjectModal(-1));

  const projectModal = document.getElementById('project-modal');
  document.getElementById('project-modal-cancel').addEventListener('click', () => projectModal.classList.remove('show'));
  projectModal.addEventListener('click', (e) => { if (e.target === projectModal) projectModal.classList.remove('show'); });

  function openProjectModal(idx) {
    editingProjectIndex = idx;
    updateCatSelect();
    if (idx >= 0) {
      const p = data.work.projects[idx];
      document.getElementById('project-modal-title').textContent = 'Edit Project';
      document.getElementById('proj-title').value = p.title;
      document.getElementById('proj-img').value = p.img;
      document.getElementById('proj-cat').value = p.cat;
      document.getElementById('proj-label').value = p.label;
      document.getElementById('proj-desc').value = p.desc;
    } else {
      document.getElementById('project-modal-title').textContent = 'Add Project';
      document.getElementById('proj-title').value = '';
      document.getElementById('proj-img').value = '';
      document.getElementById('proj-desc').value = '';
      if (data.work.categories.length > 1) {
        document.getElementById('proj-cat').value = data.work.categories[1].key;
        document.getElementById('proj-label').value = data.work.categories[1].label;
      }
    }
    projectModal.classList.add('show');
  }

  document.getElementById('project-modal-save').addEventListener('click', () => {
    const catKey = document.getElementById('proj-cat').value;
    const catObj = data.work.categories.find(c => c.key === catKey);
    const project = {
      img: document.getElementById('proj-img').value,
      title: document.getElementById('proj-title').value,
      cat: catKey,
      label: catObj ? catObj.label : catKey,
      desc: document.getElementById('proj-desc').value
    };
    if (editingProjectIndex >= 0) {
      data.work.projects[editingProjectIndex] = project;
    } else {
      data.work.projects.push(project);
    }
    projectModal.classList.remove('show');
    renderProjects();
    showToast(editingProjectIndex >= 0 ? 'Project updated!' : 'Project added!', 'success');
  });

  document.getElementById('save-work').addEventListener('click', () => {
    data.work.eyebrow = document.getElementById('work-eyebrow').value;
    data.work.headline = document.getElementById('work-headline').value;
    data.work.description = document.getElementById('work-desc').value;
    savePortfolioData(data);
    showToast('Work section saved!', 'success');
  });

  // --- EXPERIENCE ---
  function populateExperience() {
    document.getElementById('exp-eyebrow').value = data.experience.eyebrow;
    document.getElementById('exp-headline').value = data.experience.headline;
    renderRoles();
    renderChipsExperience('exp-remote', data.experience.remoteClients, 'remote');
    renderChipsExperience('exp-featured', data.experience.featuredClients, 'featured');
  }

  function renderRoles() {
    const container = document.getElementById('exp-roles');
    container.innerHTML = '';
    data.experience.roles.forEach((r, i) => {
      const card = document.createElement('div');
      card.className = 'exp-card';
      card.innerHTML = `
        <div class="year">${esc(r.year)}</div>
        <div class="details">
          <div class="role">${esc(r.role)}</div>
          <div class="org">${esc(r.org)}</div>
        </div>
        <div class="actions">
          <button class="btn btn-secondary btn-sm edit-role" data-idx="${i}">Edit</button>
          <button class="btn btn-danger btn-sm del-role" data-idx="${i}">Delete</button>
        </div>`;
      container.appendChild(card);
    });
    container.querySelectorAll('.edit-role').forEach(btn => {
      btn.addEventListener('click', () => openRoleModal(parseInt(btn.dataset.idx)));
    });
    container.querySelectorAll('.del-role').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this role?')) {
          data.experience.roles.splice(parseInt(btn.dataset.idx), 1);
          renderRoles();
        }
      });
    });
  }

  document.getElementById('add-role-btn').addEventListener('click', () => openRoleModal(-1));

  const roleModal = document.getElementById('role-modal');
  document.getElementById('role-modal-cancel').addEventListener('click', () => roleModal.classList.remove('show'));
  roleModal.addEventListener('click', (e) => { if (e.target === roleModal) roleModal.classList.remove('show'); });

  function openRoleModal(idx) {
    editingRoleIndex = idx;
    if (idx >= 0) {
      const r = data.experience.roles[idx];
      document.getElementById('role-modal-title').textContent = 'Edit Role';
      document.getElementById('role-year').value = r.year;
      document.getElementById('role-title').value = r.role;
      document.getElementById('role-org').value = r.org;
    } else {
      document.getElementById('role-modal-title').textContent = 'Add Role';
      document.getElementById('role-year').value = '';
      document.getElementById('role-title').value = '';
      document.getElementById('role-org').value = '';
    }
    roleModal.classList.add('show');
  }

  document.getElementById('role-modal-save').addEventListener('click', () => {
    const role = {
      year: document.getElementById('role-year').value,
      role: document.getElementById('role-title').value,
      org: document.getElementById('role-org').value
    };
    if (editingRoleIndex >= 0) {
      data.experience.roles[editingRoleIndex] = role;
    } else {
      data.experience.roles.push(role);
    }
    roleModal.classList.remove('show');
    renderRoles();
    showToast(editingRoleIndex >= 0 ? 'Role updated!' : 'Role added!', 'success');
  });

  function renderChipsExperience(containerId, items, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach((item, i) => {
      const chip = document.createElement('span');
      chip.className = 'chip-item';
      chip.innerHTML = `${esc(item)} <span class="remove" data-idx="${i}">✕</span>`;
      container.appendChild(chip);
    });
    container.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', () => {
        data.experience[type === 'remote' ? 'remoteClients' : 'featuredClients'].splice(parseInt(btn.dataset.idx), 1);
        renderChipsExperience(containerId, data.experience[type === 'remote' ? 'remoteClients' : 'featuredClients'], type);
      });
    });
  }

  document.getElementById('add-remote-client-btn').addEventListener('click', () => {
    const input = document.getElementById('new-remote-client');
    if (input.value.trim()) {
      data.experience.remoteClients.push(input.value.trim());
      renderChipsExperience('exp-remote', data.experience.remoteClients, 'remote');
      input.value = '';
    }
  });

  document.getElementById('new-remote-client').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('add-remote-client-btn').click();
  });

  document.getElementById('add-featured-client-btn').addEventListener('click', () => {
    const input = document.getElementById('new-featured-client');
    if (input.value.trim()) {
      data.experience.featuredClients.push(input.value.trim());
      renderChipsExperience('exp-featured', data.experience.featuredClients, 'featured');
      input.value = '';
    }
  });

  document.getElementById('new-featured-client').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('add-featured-client-btn').click();
  });

  document.getElementById('save-experience').addEventListener('click', () => {
    data.experience.eyebrow = document.getElementById('exp-eyebrow').value;
    data.experience.headline = document.getElementById('exp-headline').value;
    savePortfolioData(data);
    showToast('Experience section saved!', 'success');
  });

  // --- CONTACT ---
  function populateContact() {
    document.getElementById('contact-eyebrow').value = data.contact.eyebrow;
    document.getElementById('contact-headline').value = data.contact.headline;
    document.getElementById('contact-desc').value = data.contact.description;
    document.getElementById('contact-email').value = data.contact.email;
    document.getElementById('contact-phone').value = data.contact.phone;
    document.getElementById('contact-behance').value = data.contact.behance;
    document.getElementById('contact-location').value = data.contact.location;
    document.getElementById('contact-card-title').value = data.contact.cardTitle;
    document.getElementById('contact-card-desc').value = data.contact.cardDescription;
  }

  document.getElementById('save-contact').addEventListener('click', () => {
    data.contact.eyebrow = document.getElementById('contact-eyebrow').value;
    data.contact.headline = document.getElementById('contact-headline').value;
    data.contact.description = document.getElementById('contact-desc').value;
    data.contact.email = document.getElementById('contact-email').value;
    data.contact.phone = document.getElementById('contact-phone').value;
    data.contact.behance = document.getElementById('contact-behance').value;
    data.contact.location = document.getElementById('contact-location').value;
    data.contact.cardTitle = document.getElementById('contact-card-title').value;
    data.contact.cardDescription = document.getElementById('contact-card-desc').value;
    savePortfolioData(data);
    showToast('Contact section saved!', 'success');
  });

  // --- SETTINGS ---
  function populateSettings() {
    document.getElementById('site-title').value = data.site.title;
    document.getElementById('site-desc').value = data.site.description;
    document.getElementById('site-og').value = data.site.ogImage;
    document.getElementById('site-logo').value = data.site.logo;
    document.getElementById('footer-copyright').value = data.footer.copyright;
    document.getElementById('footer-behance').value = data.footer.behance;
    document.getElementById('footer-email').value = data.footer.email;
  }

  document.getElementById('save-settings').addEventListener('click', () => {
    data.site.title = document.getElementById('site-title').value;
    data.site.description = document.getElementById('site-desc').value;
    data.site.ogImage = document.getElementById('site-og').value;
    data.site.logo = document.getElementById('site-logo').value;
    data.footer.copyright = document.getElementById('footer-copyright').value;
    data.footer.behance = document.getElementById('footer-behance').value;
    data.footer.email = document.getElementById('footer-email').value;
    savePortfolioData(data);
    showToast('Settings saved!', 'success');
  });

  // --- EXPORT / IMPORT / RESET ---
  document.getElementById('export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported!', 'success');
  });

  document.getElementById('import-btn').addEventListener('click', () => {
    document.getElementById('import-file').click();
  });

  document.getElementById('import-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        data = imported;
        savePortfolioData(data);
        loadData();
        showToast('Data imported successfully!', 'success');
      } catch (err) {
        showToast('Invalid JSON file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Reset all data to defaults? This cannot be undone.')) {
      data = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
      savePortfolioData(data);
      loadData();
      showToast('Data reset to defaults.', 'success');
    }
  });

  // --- UTILS ---
  function esc(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
})();
