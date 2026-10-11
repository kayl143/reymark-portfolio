/*
  =======================================================
  REYMARK CARIAGA - PORTFOLIO INTERACTIVITY SCRIPT
  =======================================================
*/

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  setupInspector();
  setupTabs();
  setupSidebars();
  setupTools();
  setupDockNav();
  setupTrafficLights();
});

// Project Data Details (The 3 Spaces)
const projectsData = {
  1: {
    title: "CampusLink — Torres Capitol College Student Portal",
    badge: "PROJECT 01 • ACADEMIC SYSTEM",
    status: "Completed Prototype",
    summary: "A unified academic portal tailored specifically for the Torres Capitol College community to modernize grade inquiries, subject tracking, and student communication.",
    tech: ["PHP 8.2", "MySQL", "JavaScript", "Tailwind CSS", "Apache"],
    highlights: [
      "Secure student and instructor login authentication with role-based access controls.",
      "Automated General Weighted Average (GWA) / GPA computation based on unit weightings.",
      "Dynamic class schedule timeline and real-time announcements from college administration.",
      "Responsive design optimized for smartphones used by students on campus."
    ],
    demoNote: "This project serves as a capstone-level web solution for college administration and students."
  },
  2: {
    title: "Bukidnon AgroLink — Quezon Farmers Market",
    badge: "PROJECT 02 • E-COMMERCE & LOGISTICS",
    status: "Active Prototype",
    summary: "A community-focused web marketplace designed for Quezon, Bukidnon farmers to sell fresh crops (corn, sugar cane, vegetables, fruits) directly to retail buyers and cooperatives.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Direct farmer-to-buyer chat and wholesale order quotation requests.",
      "Real-time Bukidnon agricultural commodity price board to prevent price exploitation.",
      "Geolocation-assisted pickup hub mapping across Quezon barangays including Mibantang.",
      "Lightweight mobile interface optimized for low-bandwidth rural cellular coverage."
    ],
    demoNote: "Designed to uplift the agricultural economy of Bukidnon through accessible web software."
  },
  3: {
    title: "QuezTrack — Barangay Mibantang Incident & Advisory Hub",
    badge: "PROJECT 03 • COMMUNITY SAFETY & GOVTECH",
    status: "In Development",
    summary: "A civic incident reporting and emergency advisory web application built specifically for Barangay Mibantang in Quezon, Bukidnon.",
    tech: ["JavaScript (ES6+)", "Firebase Firestore", "Leaflet Maps API", "Bootstrap 5"],
    highlights: [
      "Citizen incident submission (road hazards, flood alerts, medical assistance) with photo upload & GPS tagging.",
      "Automated Barangay Clearance & Certification request workflow to eliminate long queues.",
      "Broadcast SMS and push alerts for severe weather and municipal announcements.",
      "Barangay council admin dashboard for tracking resolved community tickets."
    ],
    demoNote: "An essential public service system solving day-to-day administrative challenges in Mibantang."
  }
};

// Modal Logic
function openProjectModal(id) {
  const p = projectsData[id];
  if (!p) return;

  const modal = document.getElementById('project-modal');
  const titleEl = document.getElementById('modal-project-title');
  const bodyEl = document.getElementById('modal-project-body');

  titleEl.textContent = p.title;

  bodyEl.innerHTML = `
    <div style="margin-bottom: 16px;">
      <span style="font-size: 11px; font-family: var(--font-mono); color: var(--figma-blue); background: rgba(13,153,255,0.12); padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(13,153,255,0.3);">
        ${p.badge}
      </span>
      <span style="font-size: 11px; margin-left: 8px; color: var(--figma-green); font-weight: 600;">
        ● ${p.status}
      </span>
    </div>
    
    <p style="font-size: 14px; color: var(--text-main); line-height: 1.6; margin-bottom: 20px;">
      ${p.summary}
    </p>

    <h5 style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px;">
      Key System Features
    </h5>
    <ul style="padding-left: 20px; margin-bottom: 20px; font-size: 13px; line-height: 1.7;">
      ${p.highlights.map(item => `<li>${item}</li>`).join('')}
    </ul>

    <h5 style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px;">
      Technology Stack
    </h5>
    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px;">
      ${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
    </div>

    <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 8px; padding: 14px; font-size: 12px; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;">
      <span>💡 ${p.demoNote}</span>
      <button class="btn-figma-primary" onclick="showToast('Demo preview launched!'); closeProjectModal();">
        Launch Demo
      </button>
    </div>
  `;

  modal.classList.add('active');
  updateInspectorWithElement(document.querySelector(`[data-project-id="${id}"]`));
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
}

function handleModalOutsideClick(e) {
  if (e.target.id === 'project-modal') {
    closeProjectModal();
  }
}

// Toast System
function showToast(text) {
  const toast = document.getElementById('toast-msg');
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Share Button
document.getElementById('btn-share')?.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href);
  showToast("📋 Portfolio link copied to clipboard!");
});

// Present Mode Button
document.getElementById('btn-present')?.addEventListener('click', () => {
  togglePresentationMode();
});

function togglePresentationMode() {
  const leftPanel = document.getElementById('layers-panel');
  const rightPanel = document.getElementById('inspector-panel');
  
  const isCollapsed = leftPanel.classList.contains('collapsed') && rightPanel.classList.contains('collapsed');
  
  if (isCollapsed) {
    leftPanel.classList.remove('collapsed');
    rightPanel.classList.remove('collapsed');
    showToast("Exited Presentation Mode");
  } else {
    leftPanel.classList.add('collapsed');
    rightPanel.classList.add('collapsed');
    showToast("▶ Presentation Mode: Sidebars hidden for clear view");
  }
}

// Traffic Lights
function setupTrafficLights() {
  document.getElementById('dot-red')?.addEventListener('click', () => {
    showToast("Reymark Cariaga's Portfolio — Torres Capitol College");
  });

  document.getElementById('dot-yellow')?.addEventListener('click', () => {
    toggleTheme();
  });

  document.getElementById('dot-green')?.addEventListener('click', () => {
    togglePresentationMode();
  });

  document.getElementById('dock-theme-btn')?.addEventListener('click', () => {
    toggleTheme();
  });
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  showToast(isLight ? "☀️ Switched to Light Canvas" : "🌙 Switched to Dark Canvas");
}

// Sidebars Toggle Buttons
function setupSidebars() {
  const leftToggle = document.getElementById('toggle-left-btn');
  const rightToggle = document.getElementById('toggle-right-btn');
  const leftPanel = document.getElementById('layers-panel');
  const rightPanel = document.getElementById('inspector-panel');

  leftToggle?.addEventListener('click', () => {
    leftPanel.classList.toggle('collapsed');
  });

  rightToggle?.addEventListener('click', () => {
    rightPanel.classList.toggle('collapsed');
  });
}

// Design Tools Button Group
function setupTools() {
  const toolBtns = document.querySelectorAll('.tool-btn');
  toolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toolBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tool = btn.getAttribute('data-tool');
      
      const canvas = document.getElementById('canvas-area');
      if (tool === 'text') {
        canvas.style.cursor = 'text';
        showToast("Text Tool (T) Active");
      } else if (tool === 'comment') {
        canvas.style.cursor = 'crosshair';
        showToast("Comment Tool (C): Click anywhere to note");
      } else {
        canvas.style.cursor = 'default';
        showToast(`Tool: ${tool.toUpperCase()} selected`);
      }
    });
  });
}

// Tab navigation & Layer Tree Selection
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-item');
  const layers = document.querySelectorAll('.layer-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.getAttribute('data-tab');
      const targetElement = document.getElementById(`${targetId}-frame`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        updateInspectorWithElement(targetElement);
      }
    });
  });

  layers.forEach(item => {
    item.addEventListener('click', () => {
      layers.forEach(l => l.classList.remove('active'));
      item.classList.add('active');

      const selector = item.getAttribute('data-target');
      const target = document.querySelector(selector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        updateInspectorWithElement(target);
      }
    });
  });
}

// Floating Dock Navigation
function setupDockNav() {
  const links = document.querySelectorAll('.dock-nav-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const targetId = link.getAttribute('href');
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        updateInspectorWithElement(el);
      }
    });
  });
}

// Design Inspector Interaction
function setupInspector() {
  const inspectables = document.querySelectorAll('[data-inspect-name], .canvas-frame-section, .hero-canvas-artboard');
  inspectables.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      updateInspectorWithElement(el);
    });
  });
}

function updateInspectorWithElement(el) {
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const name = el.getAttribute('data-inspect-name') || el.getAttribute('data-layer-name') || el.tagName.toLowerCase();

  const titleEl = document.getElementById('inspect-title');
  const typeEl = document.getElementById('inspect-type');
  const xEl = document.getElementById('prop-x');
  const yEl = document.getElementById('prop-y');
  const wEl = document.getElementById('prop-w');
  const hEl = document.getElementById('prop-h');

  if (titleEl) titleEl.textContent = name;
  if (typeEl) typeEl.textContent = el.tagName.toUpperCase();
  if (xEl) xEl.textContent = `${Math.round(rect.left)} px`;
  if (yEl) yEl.textContent = `${Math.round(rect.top)} px`;
  if (wEl) wEl.textContent = `${Math.round(rect.width)} px`;
  if (hEl) hEl.textContent = `${Math.round(rect.height)} px`;

  // Update active layer in left panel if matching
  const layerItems = document.querySelectorAll('.layer-item');
  layerItems.forEach(item => {
    const targetSel = item.getAttribute('data-target');
    if (el.matches(targetSel) || el.closest(targetSel)) {
      layerItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });
}

// Contact Form Handler
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('sender-name').value;
  const email = document.getElementById('sender-email').value;
  const msg = document.getElementById('sender-msg').value;

  if (!name || !email || !msg) {
    showToast("⚠️ Please fill in all fields.");
    return;
  }

  showToast(`✨ Thank you, ${name}! Your message has been sent to Reymark.`);
  document.getElementById('portfolio-contact-form').reset();
}

