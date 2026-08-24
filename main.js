// Robust DOM Ready Helper (Guarantees execution even if script is loaded after DOM)
function onReady(fn) {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

onReady(() => {
  if (window.lucide) {
    lucide.createIcons();
  }
  initHeroChart();
  initBoothChart();
  initLeadershipMapChart();
  startLiveStreamTickers();
  initSplashScreen();
  initChromaKeyCycle();
  initAccordionTouchHandler();
  switchHistoricalYear('2022');
});

// Touch & Tap Handler for Smooth Accordion Columns
function initAccordionTouchHandler() {
  const wrapper = document.querySelector('.accordion-split-wrapper');
  const columns = document.querySelectorAll('.accordion-col');
  
  if (!wrapper || !columns.length) return;

  columns.forEach(col => {
    col.addEventListener('click', (e) => {
      e.stopPropagation();
      columns.forEach(c => c.classList.remove('active'));
      col.classList.add('active');
    });
  });

  // Automatically reset all 4 cards to equal state when cursor leaves section
  wrapper.addEventListener('mouseleave', () => {
    columns.forEach(c => c.classList.remove('active'));
  });
}

// -------------------------------------------------------------
// SAMAJWADI PARTY SPLASH SCREEN LOADING LOGIC
// -------------------------------------------------------------
let splashInitialized = false;

function initSplashScreen() {
  if (splashInitialized) return;
  splashInitialized = true;

  const loadingBar = document.getElementById("loadingProgressBar");
  const loadingCycle = document.getElementById("loadingCycleContainer");
  const loadingPercent = document.getElementById("loadingPercent");
  const enterBtn = document.getElementById("enterPortalBtn");
  const splashScreen = document.getElementById("splashScreen");

  let progress = 0;
  let hasTransitioned = false;

  const handleExitSplash = () => {
    if (hasTransitioned) return;
    hasTransitioned = true;
    if (splashScreen) {
      splashScreen.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      splashScreen.style.opacity = "0";
      splashScreen.style.transform = "scale(1.05)";
      setTimeout(() => {
        splashScreen.style.display = "none";
      }, 800);
    }
  };

  // Failsafe auto-dismiss after 3.5 seconds max
  setTimeout(() => {
    if (!hasTransitioned) {
      handleExitSplash();
    }
  }, 3500);

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 14) + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      if (loadingBar) loadingBar.style.width = "100%";
      if (loadingCycle) loadingCycle.style.left = "100%";
      if (loadingPercent) loadingPercent.innerText = "100%";

      // ===================================================================
      // 100% COMPLETE FEATURE: DIRECT DEAD-CENTER EMERGENCE & 2.2s AUTO PAGE
      // ===================================================================
      setTimeout(() => {
        // Hide line cycle & progress track
        if (loadingCycle) {
          loadingCycle.style.transition = "opacity 0.3s ease";
          loadingCycle.style.opacity = "0";
        }
        const progressTrack = loadingBar ? loadingBar.parentElement : null;
        if (progressTrack) progressTrack.style.transition = "opacity 0.4s ease";
        if (progressTrack) progressTrack.style.opacity = "0";
        if (loadingPercent) loadingPercent.style.transition = "opacity 0.4s ease";
        if (loadingPercent) loadingPercent.style.opacity = "0";

        // Show Dead Center Emergence Overlay
        const centerModal = document.getElementById("centerZoomCycleModal");
        const centerCard = document.getElementById("centerZoomCycleCard");

        if (centerModal && centerCard) {
          centerModal.classList.remove("hidden");
          setTimeout(() => {
            centerCard.style.transform = "scale(1.8)";
            centerCard.style.opacity = "1";
          }, 50);
        }

        if (window.confetti) {
          try {
            confetti({
              particleCount: 100,
              spread: 90,
              origin: { y: 0.5 }
            });
          } catch(e) {}
        }

        // Exact 2.2-Second Center Hold then auto-transition to next page
        setTimeout(() => {
          handleExitSplash();
        }, 2200);

      }, 150);

      if (enterBtn) {
        enterBtn.classList.remove("hidden");
        enterBtn.classList.add("animate-bounce");
      }
    } else {
      if (loadingBar) loadingBar.style.width = `${progress}%`;
      if (loadingCycle) loadingCycle.style.left = `${progress}%`;
      if (loadingPercent) loadingPercent.innerText = `${progress}%`;
    }
  }, 100);

  if (enterBtn) enterBtn.addEventListener("click", handleExitSplash);
  const skipBtn = document.getElementById("skipSplashBtn");
  if (skipBtn) skipBtn.addEventListener("click", handleExitSplash);
}

// Scroll Helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// -------------------------------------------------------------
// FULLSCREEN IMAGE ZOOM MODAL HANDLERS
// -------------------------------------------------------------
function openImageModal(imgSrc) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('image-modal-img');
  const modalTitle = document.getElementById('image-modal-title');
  if (modal && modalImg) {
    modalImg.src = imgSrc;
    if (modalTitle) modalTitle.innerText = `ElectraPulse Platform Screenshot — ${imgSrc.replace('/', '')}`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  }
}

function closeImageModal() {
  const modal = document.getElementById('image-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// -------------------------------------------------------------
// 01 — HERO CHART & LIVE STREAM TICKER
// -------------------------------------------------------------
let heroChartInstance = null;

function initHeroChart() {
  const ctx = document.getElementById('heroPreviewChart');
  if (!ctx) return;

  heroChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', 'Current'],
      datasets: [
        {
          label: 'Survey Confidence Index %',
          data: [62, 70, 78, 83, 89, 92, 94.8],
          borderColor: '#E11D48',
          backgroundColor: 'rgba(225, 29, 72, 0.12)',
          fill: true,
          tension: 0.4,
          borderWidth: 3
        },
        {
          label: 'Historical Turnout Baseline %',
          data: [52.4, 54.8, 56.1, 57.5, 58.6, 59.1, 59.51],
          borderColor: '#0284C7',
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#334155', font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } } }
      },
      scales: {
        x: { ticks: { color: '#64748B' }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        y: { ticks: { color: '#64748B' }, grid: { color: 'rgba(0, 0, 0, 0.05)' } }
      }
    }
  });
}

function startLiveStreamTickers() {
  const heroWorkerCount = document.getElementById('hero-active-workers-counter');
  const heroStream = document.getElementById('hero-live-stream');

  const updates = [
    '<span class="text-rose-600 font-bold">[Booth #142]</span> Voter survey submitted (Voter slip verified)',
    '<span class="text-cyan-600 font-bold">[Mandal 4]</span> Worker Rahul M. checked-in at Booth #89',
    '<span class="text-emerald-600 font-bold">[District LKO]</span> Road repair issue flagged & resolved',
    '<span class="text-amber-600 font-bold">[Booth #156]</span> Swing voter sentiment flipped to Favorable',
    '<span class="text-indigo-600 font-bold">[Mandal 12]</span> 450 Voter slips dispatched via Mobile App',
    '<span class="text-rose-600 font-bold">[HQ Alert]</span> High turnout flag raised at Booth #42'
  ];

  let counter = 48520;
  setInterval(() => {
    // Update worker counter slightly
    counter += Math.floor(Math.random() * 3) - 1;
    if (heroWorkerCount) heroWorkerCount.innerText = counter.toLocaleString();

    // Prepend new ticker item
    if (heroStream) {
      const randomText = updates[Math.floor(Math.random() * updates.length)];
      const div = document.createElement('div');
      div.className = 'p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 font-medium animate-fadeIn';
      div.innerHTML = randomText;
      heroStream.prepend(div);
      if (heroStream.children.length > 4) {
        heroStream.removeChild(heroStream.lastChild);
      }
    }
  }, 4000);
}

// -------------------------------------------------------------
// 03 — SOLUTION HIERARCHY INTERACTIVE SELECTOR
// -------------------------------------------------------------
const hierarchyData = {
  state: {
    title: 'State Command Level (HQ)',
    desc: 'Oversees all 75 Districts, sets macro campaign strategies, allocates state budget/cadre resources, and monitors overall sentiment.',
    stat1: '100% (75/75)',
    stat2: '14 State Directives'
  },
  district: {
    title: 'District Intelligence Level',
    desc: '75 District Chiefs coordinate Assembly In-charges, resolve inter-constituency issues, and manage district media operations.',
    stat1: '75 Districts Mapped',
    stat2: '403 Assembly Chiefs'
  },
  assembly: {
    title: 'Assembly Constituency (AC)',
    desc: '403 AC Command Units drive local candidate campaigns, organize Mandal rallies, and track booth-by-booth vote targets.',
    stat1: '403 Constituencies',
    stat2: '6,200 Mandal Presidents'
  },
  mandal: {
    title: 'Mandal Organizational Level',
    desc: '18 Mandals / Divisions supervise constituency and sector networks, ensuring worker attendance, voter slip distribution, and local rally support.',
    stat1: '18 Active Mandals / Divisions',
    stat2: '18,500 Sector Officers'
  },
  booth: {
    title: 'Booth & Polling Station Unit (Win/Loss & Vote Swing)',
    desc: '1,74,351 Booths & Polling Stations with micro-targeting of vote margins (Victory Margin %, Loss Deficit Recovery %, Vote Swing %), active cadre deployment, and voter slips.',
    stat1: '1,74,351 Booths Mapped',
    stat2: 'Win/Loss & Swing Tracked'
  },
  worker: {
    title: 'Field Cadre & Page In-Charges',
    desc: '48,500+ active field workers equipped with the Android/iOS App to conduct door-to-door surveys, report issues, and verify voters.',
    stat1: '48,500 Active App Users',
    stat2: '98.4% Report Accuracy'
  }
};

function selectHierarchyNode(levelKey) {
  // Update button active borders
  document.querySelectorAll('.hierarchy-btn').forEach(btn => {
    btn.classList.remove('active', 'border-rose-600', 'bg-rose-50');
    btn.classList.add('border-slate-200', 'bg-slate-50');
  });

  const selectedBtn = document.getElementById(`hnode-${levelKey}`);
  if (selectedBtn) {
    selectedBtn.classList.remove('border-slate-200', 'bg-slate-50');
    selectedBtn.classList.add('active', 'border-rose-600', 'bg-rose-50');
  }

  // Update text panel
  const data = hierarchyData[levelKey];
  if (data) {
    document.getElementById('h-detail-title').innerText = data.title;
    document.getElementById('h-detail-desc').innerText = data.desc;
    document.getElementById('h-detail-stat1').innerText = data.stat1;
    document.getElementById('h-detail-stat2').innerText = data.stat2;
  }
}

// -------------------------------------------------------------
// 04 — BOOTH INTELLIGENCE SWITCHER & ANIMATED CHART
// -------------------------------------------------------------
const boothData = {
  '142': {
    acName: 'AC 184 — LUCKNOW WEST',
    header: 'BOOTH #142',
    location: 'Govt Primary School Room No. 1, Rajajipuram',
    badge: 'KEY BATTLEGROUND',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    totalVoters: '1,240',
    votesPolled: '892',
    turnoutPct: '71.9%',
    margin: '+560',
    incharge: 'Suresh Kumar Verma',
    sentiment: '84% Surveyed',
    histYear: '2022 Assembly',
    histWinner: 'SP (+560 votes)',
    histShare: '54.2% vs 38.6%',
    histTrend: '↗ Consistent +3.8%',
    surveyCov: '1,041 / 1,240 Voters',
    issues: '3 Issues (2 Resolved)',
    workers: '8 Page In-charges',
    chartData: [480, 520, 560, 680, 750, 892]
  },
  '143': {
    acName: 'AC 184 — LUCKNOW WEST',
    header: 'BOOTH #143',
    location: 'Community Hall Block B, Sector 12',
    badge: 'DOMINANT STRONGHOLD',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    totalVoters: '1,450',
    votesPolled: '1,120',
    turnoutPct: '77.2%',
    margin: '+840',
    incharge: 'Anand Prakash Srivastava',
    sentiment: '91% Surveyed',
    histYear: '2022 Assembly',
    histWinner: 'SP (+840 votes)',
    histShare: '62.4% vs 31.0%',
    histTrend: '↗ Strong Lead +5.1%',
    surveyCov: '1,320 / 1,450 Voters',
    issues: '1 Issue (Resolved)',
    workers: '12 Page In-charges',
    chartData: [600, 710, 820, 940, 1020, 1120]
  },
  '156': {
    acName: 'AC 184 — LUCKNOW WEST',
    header: 'BOOTH #156',
    location: 'Panchayat Bhavan Room No. 2, Old City',
    badge: 'HIGH RISK SWING BOOTH',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    totalVoters: '980',
    votesPolled: '640',
    turnoutPct: '65.3%',
    margin: '-42',
    incharge: 'Mohd. Imran Khan',
    sentiment: '76% Surveyed',
    histYear: '2022 Assembly',
    histWinner: 'Opp. Lead (-42 votes)',
    histShare: '47.2% vs 49.5%',
    histTrend: '↘ Critical Swing Zone',
    surveyCov: '745 / 980 Voters',
    issues: '5 Issues (3 Pending)',
    workers: '6 Page In-charges',
    chartData: [310, 390, 420, 490, 580, 640]
  }
};

let boothChartInstance = null;

function initBoothChart() {
  const ctx = document.getElementById('boothIntelligenceChart');
  if (!ctx) return;

  boothChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2017 Election', '2019 Lok Sabha', '2022 Assembly', '2026 Ground Survey', 'Target Turnout', 'Predicted Polled'],
      datasets: [
        {
          label: 'Historical & Projected Votes',
          data: [480, 520, 560, 680, 750, 892],
          backgroundColor: [
            'rgba(225, 29, 72, 0.8)',
            'rgba(225, 29, 72, 0.8)',
            'rgba(225, 29, 72, 0.95)',
            'rgba(2, 132, 199, 0.85)',
            'rgba(5, 150, 105, 0.85)',
            'rgba(217, 119, 6, 0.85)'
          ],
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { ticks: { color: '#475569', font: { weight: '600' } }, grid: { color: 'rgba(0,0,0,0.05)' } },
        y: { ticks: { color: '#475569', font: { weight: '600' } }, grid: { color: 'rgba(0,0,0,0.05)' } }
      }
    }
  });
}

function switchBooth(boothId) {
  // Update button active styles
  document.querySelectorAll('.booth-tab-btn').forEach(btn => {
    btn.classList.remove('bg-rose-600', 'text-white', 'border-rose-600');
    btn.classList.add('bg-slate-100', 'text-slate-700', 'border-slate-300');
  });

  const activeBtn = document.getElementById(`btn-booth-${boothId}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-slate-100', 'text-slate-700', 'border-slate-300');
    activeBtn.classList.add('bg-rose-600', 'text-white', 'border-rose-600');
  }

  const b = boothData[boothId];
  if (!b) return;

  document.getElementById('booth-ac-name').innerText = b.acName;
  document.getElementById('booth-number-header').innerText = b.header;
  document.getElementById('booth-location-text').innerText = b.location;
  
  const statusBadge = document.getElementById('booth-status-badge');
  statusBadge.innerText = b.badge;
  statusBadge.className = `px-3 py-1 rounded-full text-xs font-bold ${b.badgeClass}`;

  document.getElementById('b-total-voters').innerText = b.totalVoters;
  document.getElementById('b-votes-polled').innerText = b.votesPolled;
  document.getElementById('b-turnout-pct').innerText = b.turnoutPct;
  document.getElementById('b-vote-margin').innerText = b.margin;
  document.getElementById('booth-incharge-name').innerText = b.incharge;

  document.getElementById('hist-year').innerText = b.histYear;
  document.getElementById('hist-winner').innerText = b.histWinner;

  document.getElementById('cg-survey-coverage').innerText = b.surveyCov;

  // Update chart
  if (boothChartInstance) {
    boothChartInstance.data.datasets[0].data = b.chartData;
    boothChartInstance.update();
  }
}

// -------------------------------------------------------------
// 05 — ADMIN TAB SWITCHER
// -------------------------------------------------------------
const adminTabContent = {
  hierarchy: `
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-bold text-slate-900 flex items-center gap-2">
        <i data-lucide="sitemap" class="w-4 h-4 text-rose-600"></i> Organization Hierarchy & Data Upload Status
      </h4>
      <span class="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold">Active Onboarding</span>
    </div>
    <div class="rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group" onclick="openImageModal('/1 (6).png')">
      <img src="./1 (6).png" alt="Onboarding & Data Upload Status" class="w-full h-36 object-cover object-top group-hover:scale-105 transition-transform">
    </div>
  `,
  tasks: `
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-bold text-slate-900 flex items-center gap-2">
        <i data-lucide="send" class="w-4 h-4 text-rose-600"></i> Task Dispatch & Campaign Directives
      </h4>
      <span class="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-mono font-bold">1,420 Directives</span>
    </div>
    <div class="rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group" onclick="openImageModal('/1 (12).png')">
      <img src="./1 (12).png" alt="Karyakarta Communication Measurement" class="w-full h-36 object-cover object-top group-hover:scale-105 transition-transform">
    </div>
  `,
  workers: `
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-bold text-slate-900 flex items-center gap-2">
        <i data-lucide="users" class="w-4 h-4 text-cyan-600"></i> Worker Monitoring by Wing
      </h4>
      <span class="text-[10px] bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded font-mono font-bold">48,500 Active</span>
    </div>
    <div class="rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group" onclick="openImageModal('/1 (1).png')">
      <img src="./1 (1).png" alt="Worker Performance Dashboard" class="w-full h-36 object-cover object-top group-hover:scale-105 transition-transform">
    </div>
  `,
  surveys: `
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-bold text-slate-900 flex items-center gap-2">
        <i data-lucide="file-check" class="w-4 h-4 text-emerald-600"></i> Live Ground Surveys & Voter List Correction
      </h4>
      <span class="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold">5.3M Records</span>
    </div>
    <div class="rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group" onclick="openImageModal('/1 (7).png')">
      <img src="./1 (7).png" alt="Survey Activity Status" class="w-full h-36 object-cover object-top group-hover:scale-105 transition-transform">
    </div>
  `,
  reports: `
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-bold text-slate-900 flex items-center gap-2">
        <i data-lucide="check-square" class="w-4 h-4 text-amber-600"></i> Membership Addition & Total Growth Trends
      </h4>
      <span class="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-mono font-bold">85.4% Accuracy</span>
    </div>
    <div class="rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group" onclick="openImageModal('/1 (8).png')">
      <img src="./1 (8).png" alt="Membership Added Dashboard" class="w-full h-36 object-cover object-top group-hover:scale-105 transition-transform">
    </div>
  `
};

function setAdminTab(tabKey) {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.remove('bg-rose-600', 'text-white', 'font-bold');
    btn.classList.add('bg-slate-100', 'text-slate-600');
  });

  const activeBtn = document.getElementById(`atab-${tabKey}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-slate-100', 'text-slate-600');
    activeBtn.classList.add('bg-rose-600', 'text-white', 'font-bold');
  }

  const container = document.getElementById('admin-tab-display');
  if (container && adminTabContent[tabKey]) {
    container.innerHTML = adminTabContent[tabKey];
    if (window.lucide) lucide.createIcons();
  }
}

function triggerAppTask(taskType) {
  const toast = document.getElementById('mobile-toast');
  if (!toast) return;

  if (taskType === 'flag') {
    toast.innerHTML = `
      <i data-lucide="camera" class="w-4 h-4 text-amber-400 shrink-0"></i>
      <span>Jhanda Lagao Proof Uploaded! 35/50 Flags Verified</span>
    `;
  } else if (taskType === 'survey') {
    toast.innerHTML = `
      <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i>
      <span>Voter Survey #142 Dispatched & Synced to Adhyaksh HQ</span>
    `;
  } else {
    toast.innerHTML = `
      <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i>
      <span>District Adhyaksh Ji resolved Query #1042</span>
    `;
  }
  
  if (window.lucide) lucide.createIcons();
  
  setTimeout(() => {
    toast.innerHTML = `
      <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i>
      <span>District Adhyaksh Ji resolved Query #1042</span>
    `;
    if (window.lucide) lucide.createIcons();
  }, 4000);
}

// -------------------------------------------------------------
// 06 — LEADERSHIP MAP & DRILLDOWN
// -------------------------------------------------------------
let mapChartInstance = null;

function initLeadershipMapChart() {
  const ctx = document.getElementById('leadershipMapChart');
  if (!ctx) return;

  mapChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Cadre Strength', 'Survey Coverage', 'Historical Win Rate', 'Issue Resolution', 'Turnout Potential', 'Media Reach'],
      datasets: [
        {
          label: 'State Level Average %',
          data: [88, 84, 76, 94, 72, 85],
          backgroundColor: 'rgba(225, 29, 72, 0.15)',
          borderColor: '#E11D48',
          pointBackgroundColor: '#E11D48',
          borderWidth: 2
        },
        {
          label: 'Target Leadership Benchmark',
          data: [95, 90, 85, 98, 85, 90],
          backgroundColor: 'rgba(2, 132, 199, 0.1)',
          borderColor: '#0284C7',
          borderDash: [4, 4],
          pointBackgroundColor: '#0284C7',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#334155', font: { family: 'Plus Jakarta Sans', size: 10, weight: '600' } } }
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
          pointLabels: { color: '#334155', font: { size: 10, weight: '600' } },
          ticks: { backdropColor: 'transparent', color: '#64748B' }
        }
      }
    }
  });
}

function setMapLevel(levelName) {
  document.querySelectorAll('.map-level-btn').forEach(btn => {
    btn.classList.remove('bg-rose-600', 'text-white', 'font-bold');
    btn.classList.add('hover:text-slate-900', 'text-slate-600');
  });

  const activeBtn = document.getElementById(`mlevel-${levelName.toLowerCase()}`);
  if (activeBtn) {
    activeBtn.classList.remove('hover:text-slate-900', 'text-slate-600');
    activeBtn.classList.add('bg-rose-600', 'text-white', 'font-bold');
  }

  const regionLabel = document.getElementById('map-active-region');
  if (regionLabel) {
    if (levelName === 'STATE') regionLabel.innerText = 'Active View: Uttar Pradesh (403 ACs)';
    if (levelName === 'MANDAL') regionLabel.innerText = 'Active View: Lucknow Mandal / Division (18 Mandals)';
    if (levelName === 'DISTRICT') regionLabel.innerText = 'Active View: Lucknow District (9 ACs)';
    if (levelName === 'ASSEMBLY') regionLabel.innerText = 'Active View: AC 184 Lucknow West (402 Booths)';
    if (levelName === 'BOOTH') regionLabel.innerText = 'Active View: Booth #142 Micro Sector Map';
  }

  if (mapChartInstance) {
    const randomMultiplier = levelName === 'STATE' ? 1 : (levelName === 'DISTRICT' ? 0.9 : 0.85);
    mapChartInstance.data.datasets[0].data = [
      Math.round(88 * randomMultiplier),
      Math.round(84 * randomMultiplier),
      Math.round(76 * randomMultiplier),
      Math.round(94 * randomMultiplier),
      Math.round(72 * randomMultiplier),
      Math.round(85 * randomMultiplier)
    ];
    mapChartInstance.update();
  }
}

// -------------------------------------------------------------
// DEMO REQUEST MODAL & REDIRECT TO CATALYST DEMO LINK
// -------------------------------------------------------------
function openDemoModal() {
  window.open('https://catalyst.itlcindia.com/', '_blank');
}

function closeDemoModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleDemoSubmit(e) {
  e.preventDefault();
  closeDemoModal();
  
  if (window.confetti) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  window.open('https://catalyst.itlcindia.com/', '_blank');
}

// -------------------------------------------------------------
// CHROMA-KEY VIDEO BACKGROUND REMOVAL ENGINE (100% TRANSPARENT BACKGROUND)
// -------------------------------------------------------------
function initChromaKeyCycle() {
  const video = document.getElementById("cycleVideoElement");
  const canvas = document.getElementById("cycleCanvasElement");
  const fallback = document.getElementById("cycleSvgFallback");

  const centerVideo = document.getElementById("centerCycleVideoElement");
  const centerCanvas = document.getElementById("centerCycleCanvasElement");

  function processCanvasFrame(vid, cvs) {
    if (!vid || !cvs || vid.paused || vid.ended) return;

    const width = vid.videoWidth || 160;
    const height = vid.videoHeight || 120;

    if (cvs.width !== width) cvs.width = width;
    if (cvs.height !== height) cvs.height = height;

    const ctx = cvs.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(vid, 0, 0, width, height);

    try {
      const frame = ctx.getImageData(0, 0, width, height);

      for (let y = 0; y < height; y++) {
        const isGroundLineRow = y > height * 0.72;
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = frame.data[idx + 0];
          const g = frame.data[idx + 1];
          const b = frame.data[idx + 2];

          const isWhite = r > 140 && g > 140 && b > 140;

          if (!isWhite || isGroundLineRow) {
            frame.data[idx + 3] = 0; // 100% Transparent background & ground line removed!
          } else {
            frame.data[idx + 0] = 255;
            frame.data[idx + 1] = 255;
            frame.data[idx + 2] = 255;
            frame.data[idx + 3] = 255;
          }
        }
      }

      ctx.putImageData(frame, 0, 0);
    } catch (e) {
      if (fallback && cvs === canvas) {
        canvas.classList.add("hidden");
        fallback.classList.remove("hidden");
      }
    }
  }

  function renderFrame() {
    processCanvasFrame(video, canvas);
    processCanvasFrame(centerVideo, centerCanvas);
    requestAnimationFrame(renderFrame);
  }

  if (video) video.play().catch(() => {});
  if (centerVideo) centerVideo.play().catch(() => {});
  renderFrame();
}

// -------------------------------------------------------------
// HISTORICAL ELECTION MAPS & DATA SWITCHER (2007, 2012, 2017, 2022)
// -------------------------------------------------------------
const historicalElectionData = {
  "2022": {
    year: "2022",
    badge: "2022 UP CONSTITUENCY MAP",
    headline: "2022 Uttar Pradesh Assembly Election",
    subtext: "Samajwadi Party secured 111 seats (Alliance 125 seats) with 32.06% Vote Share — a massive +10.24% vote surge!",
    image: "./Historical Election Data/2022.png",
    turnout: "60.79%",
    spSeats: "111 (Alliance 125)",
    spVoteShare: "32.06%",
    spSwing: "+10.24% Vote Swing Surge 🚩",
    winner: "BJP (255 Seats - 41.29%)",
    partyBreakdown: [
      { party: "BJP", seats: 255, voteShare: "41.29%", color: "bg-orange-500" },
      { party: "Samajwadi Party (SP)", seats: 111, voteShare: "32.06%", color: "bg-red-600", highlight: true },
      { party: "Apna Dal (S)", seats: 12, voteShare: "2.90%", color: "bg-blue-600" },
      { party: "RLD (SP Alliance)", seats: 8, voteShare: "2.85%", color: "bg-emerald-600" },
      { party: "NISHAD / SBSPA", seats: 12, voteShare: "2.80%", color: "bg-indigo-600" },
      { party: "INC (Congress)", seats: 2, voteShare: "2.33%", color: "bg-sky-500" },
      { party: "BSP", seats: 1, voteShare: "12.88%", color: "bg-purple-600" }
    ]
  },
  "2017": {
    year: "2017",
    badge: "2017 UP CONSTITUENCY MAP",
    headline: "2017 Uttar Pradesh Assembly Election",
    subtext: "Samajwadi Party won 47 seats with 21.82% Vote Share in a highly competitive 403-seat election cycle.",
    image: "./Historical Election Data/2017.png",
    turnout: "61.04%",
    spSeats: "47 Seats",
    spVoteShare: "21.82%",
    spSwing: "Key Opposition Base Maintained",
    winner: "BJP (312 Seats - 39.67%)",
    partyBreakdown: [
      { party: "BJP", seats: 312, voteShare: "39.67%", color: "bg-orange-500" },
      { party: "Samajwadi Party (SP)", seats: 47, voteShare: "21.82%", color: "bg-red-600", highlight: true },
      { party: "BSP", seats: 19, voteShare: "22.23%", color: "bg-purple-600" },
      { party: "Apna Dal (S)", seats: 9, voteShare: "0.98%", color: "bg-blue-600" },
      { party: "INC (Congress)", seats: 7, voteShare: "6.25%", color: "bg-sky-500" }
    ]
  },
  "2012": {
    year: "2012",
    badge: "2012 UP CONSTITUENCY MAP (SP LANDSLIDE VICTORY)",
    headline: "2012 Uttar Pradesh Assembly Election — SP Landslide Victory",
    subtext: "Samajwadi Party scored a historic full majority victory with 224 seats (29.13% Vote Share) under Shri Akhilesh Yadav ji!",
    image: "./Historical Election Data/2012.png",
    turnout: "59.40%",
    spSeats: "224 Seats (Full Majority)",
    spVoteShare: "29.13%",
    spSwing: "👑 Landslide Majority Government",
    winner: "Samajwadi Party 🚩 (224 Seats)",
    partyBreakdown: [
      { party: "Samajwadi Party (SP)", seats: 224, voteShare: "29.13%", color: "bg-red-600", highlight: true },
      { party: "BSP", seats: 80, voteShare: "25.91%", color: "bg-purple-600" },
      { party: "BJP", seats: 47, voteShare: "15.00%", color: "bg-orange-500" },
      { party: "INC (Congress)", seats: 28, voteShare: "11.65%", color: "bg-sky-500" },
      { party: "RLD", seats: 9, voteShare: "2.33%", color: "bg-emerald-600" }
    ]
  },
  "2007": {
    year: "2007",
    badge: "2007 UP CONSTITUENCY MAP",
    headline: "2007 Uttar Pradesh Assembly Election",
    subtext: "Samajwadi Party won 97 seats with 25.43% Vote Share, serving as the primary opposition force in UP.",
    image: "./Historical Election Data/2007.png",
    turnout: "45.96%",
    spSeats: "97 Seats",
    spVoteShare: "25.43%",
    spSwing: "Main Opposition Force (97 Seats)",
    winner: "BSP (206 Seats - 30.43%)",
    partyBreakdown: [
      { party: "BSP", seats: 206, voteShare: "30.43%", color: "bg-purple-600" },
      { party: "Samajwadi Party (SP)", seats: 97, voteShare: "25.43%", color: "bg-red-600", highlight: true },
      { party: "BJP", seats: 51, voteShare: "16.97%", color: "bg-orange-500" },
      { party: "INC (Congress)", seats: 22, voteShare: "8.64%", color: "bg-sky-500" },
      { party: "RLD", seats: 10, voteShare: "3.70%", color: "bg-emerald-600" }
    ]
  }
};

function switchHistoricalYear(year) {
  const data = historicalElectionData[year];
  if (!data) return;

  // Update Year Tab Buttons Active State
  document.querySelectorAll(".year-tab-btn").forEach((btn) => {
    btn.classList.remove(
      "active",
      "bg-[#2864dc]",
      "text-white",
      "shadow-md",
      "font-bold"
    );
    btn.classList.add("text-slate-600", "font-semibold", "hover:bg-white", "hover:text-slate-900");
  });

  const activeBtn = document.getElementById(`btn-year-${year}`);
  if (activeBtn) {
    activeBtn.classList.remove("text-slate-600", "font-semibold", "hover:bg-white", "hover:text-slate-900");
    activeBtn.classList.add(
      "active",
      "bg-[#2864dc]",
      "text-white",
      "shadow-md",
      "font-bold"
    );
  }

  // Update Map Image & Badges
  const mapImg = document.getElementById("hist-map-img");
  const mapBadge = document.getElementById("hist-map-badge");
  if (mapImg) mapImg.src = data.image;
  if (mapBadge) mapBadge.innerText = data.badge;

  // Update Titles & Stats
  const title = document.getElementById("hist-title");
  const desc = document.getElementById("hist-desc");
  const yearTag = document.getElementById("hist-year-tag");
  const spSeats = document.getElementById("hist-stat-sp-seats");
  const spSwing = document.getElementById("hist-stat-sp-swing");
  const spVoteShare = document.getElementById("hist-stat-sp-voteshare");
  const turnout = document.getElementById("hist-stat-turnout");
  const winner = document.getElementById("hist-stat-winner");

  if (title) title.innerText = data.headline;
  if (desc) desc.innerText = data.subtext;
  if (yearTag) yearTag.innerText = `${year} UP ELECTION (403 SEATS)`;
  if (spSeats) spSeats.innerText = data.spSeats;
  if (spSwing) spSwing.innerText = `▲ ${data.spSwing}`;
  if (spVoteShare) spVoteShare.innerText = data.spVoteShare;
  if (turnout) turnout.innerText = data.turnout;
  if (winner) winner.innerText = data.winner;

  // Render Party Tally Rows
  const tallyContainer = document.getElementById("hist-party-tally-container");
  if (tallyContainer) {
    tallyContainer.innerHTML = data.partyBreakdown
      .map((p) => {
        const pctWidth = Math.min(100, Math.max(6, (p.seats / 403) * 100));
        const borderClass = p.highlight
          ? "p-2.5 rounded-2xl bg-rose-50/60 border border-rose-100 shadow-sm"
          : "p-1.5";
        const textWeight = p.highlight ? "font-bold text-rose-600" : "font-semibold text-slate-700";
        const barGradient = p.highlight
          ? "bg-gradient-to-r from-rose-500 to-pink-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
          : p.party.includes("BJP")
          ? "bg-gradient-to-r from-amber-500 to-orange-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
          : p.color;

        return `
          <div class="${borderClass} space-y-1">
            <div class="flex justify-between text-xs ${textWeight}">
              <span>${p.highlight ? '🚩' : '•'} ${p.party}</span>
              <span>${p.seats} Seats <span class="text-slate-400 font-normal">(${p.voteShare})</span></span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div class="${barGradient} h-2.5 rounded-full transition-all duration-500" style="width: ${pctWidth}%"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }
}
