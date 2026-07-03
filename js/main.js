// ============================================
// 모바일 청첩장 JavaScript
// 모든 동적 콘텐츠는 config.js의 CONFIG에서 렌더링
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initFromConfig();
  initCountdown();
  initGallery();
  initAccordion();
  initCopyButtons();

  // 폰트 로드 완료 후 화면 표시 (FOUT 방지)
  document.fonts.ready.then(() => {
    document.body.classList.add('ready');
  });
});

// ============================================
// CONFIG → HTML 렌더링
// ============================================
function initFromConfig() {
  const { wedding, groom, bride, greeting, location, accounts } = CONFIG;

  // 성 제거 (이태선 → 태선)
  const groomGivenName = groom.name.slice(1);
  const brideGivenName = bride.name.slice(1);

  // 메인 섹션
  document.querySelector('.groom-name').textContent = groomGivenName;
  document.querySelector('.bride-name').textContent = brideGivenName;
  document.querySelector('.main-date').textContent = wedding.dateText;
  document.querySelector('.main-venue').textContent = `${wedding.venue} ${wedding.hall}`;

  // 인사말 섹션
  document.querySelector('.greeting-title').textContent = greeting.title;
  const greetingEl = document.querySelector('.greeting-message');
  greetingEl.innerHTML = greeting.message
    .split('\n\n')
    .map(para => para.split('\n').map(line => `<p>${line}</p>`).join(''))
    .join('<br>');

  // 소개 섹션 (커플 정보)
  renderCoupleInfo(groom, bride);

  // 달력 섹션
  document.querySelector('.calendar-date-text').textContent = wedding.dateText;
  renderCalendar(wedding.date);

  // 오시는 길 섹션
  document.querySelector('.venue-name').textContent = wedding.venue;
  document.querySelector('.hall-name').textContent = wedding.hall;
  document.querySelector('.address').textContent = wedding.address;
  document.getElementById('map-link').href = wedding.mapUrl;
  document.getElementById('kakao-map-btn').href = wedding.mapUrl;
  document.getElementById('naver-map-btn').href = wedding.naverMapUrl;
  renderTransportInfo(location);

  // 계좌 섹션
  renderAccounts(accounts);

  // 푸터
  document.getElementById('footer-names').textContent = `${groomGivenName} ♥ ${brideGivenName}`;
  const d = wedding.date;
  document.getElementById('footer-date').textContent = `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
}

// ============================================
// 소개 섹션 렌더링
// ============================================
const PHONE_ICON_SVG = `<svg class="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
</svg>`;

function renderCoupleInfo(groom, bride) {
  const container = document.getElementById('couple-info');

  const renderPerson = (person, type) => {
    const relation = type === 'groom' ? '의 아들' : '의 딸';
    const parentNames = [];

    if (person.father) {
      parentNames.push(person.fatherDeceased ? `故 ${person.father}` : person.father);
    }
    if (person.mother) {
      parentNames.push(person.motherDeceased ? `故 ${person.mother}` : person.mother);
    }

    return `
      <div class="person-info ${type}-info">
        <p class="parents">${parentNames.join(' · ')}<span class="relation">${relation}</span></p>
        <p class="person-name">${person.name}</p>
        <a href="tel:${person.phone}" class="phone-link">${PHONE_ICON_SVG}</a>
      </div>`;
  };

  container.innerHTML = renderPerson(groom, 'groom') + renderPerson(bride, 'bride');
}

// ============================================
// 달력 동적 생성
// ============================================
function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const weddingDay = date.getDate();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  document.getElementById('calendar-month').textContent = `${month + 1}월`;

  let html = '';

  // 첫째 날 이전 빈 칸
  for (let i = 0; i < firstDayOfWeek; i++) {
    html += '<span></span>';
  }

  // 날짜
  for (let day = 1; day <= lastDate; day++) {
    const dayOfWeek = (firstDayOfWeek + day - 1) % 7;
    const classes = [];

    if (dayOfWeek === 0) classes.push('sunday');
    if (dayOfWeek === 6) classes.push('saturday');
    if (day === weddingDay) classes.push('wedding-day');

    html += `<span class="${classes.join(' ')}">${day}</span>`;
  }

  document.getElementById('calendar-days').innerHTML = html;
}

// ============================================
// 교통정보 렌더링
// ============================================
function renderTransportInfo(location) {
  const items = [
    { icon: '🚇', label: '지하철', text: location.subway },
    { icon: '🚗', label: '주차', text: location.parking },
    { icon: '🚌', label: '셔틀버스', text: location.shuttle }
  ];

  const container = document.getElementById('transport-info');
  container.innerHTML = items.map(item => `
    <div class="transport-item">
      <span class="transport-icon">${item.icon}</span>
      <div class="transport-text">
        <strong>${item.label}</strong>
        <p>${item.text}</p>
      </div>
    </div>`).join('');
}

// ============================================
// 계좌 카드 렌더링
// ============================================
function renderAccounts(accounts) {
  const container = document.getElementById('account-accordion');

  const renderGroup = (title, items, id) => {
    const cards = items.map(item => `
      <div class="account-card">
        <div class="account-card-header">
          <span class="account-relation">${item.relation}</span>
          <span class="account-holder">${item.holder}</span>
        </div>
        <div class="account-card-body">
          <span class="account-bank">${item.bank}</span>
          <span class="account-number">${item.number}</span>
          <button class="copy-btn" data-account="${item.number}">복사</button>
        </div>
      </div>`).join('');

    return `
      <div class="accordion-group">
        <button class="accordion-header" data-target="${id}">
          <span class="accordion-title">${title}</span>
          <span class="accordion-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </span>
        </button>
        <div class="accordion-content" id="${id}">
          ${cards}
        </div>
      </div>`;
  };

  container.innerHTML =
    renderGroup('신랑측 계좌번호', accounts.groom, 'groom-accounts') +
    renderGroup('신부측 계좌번호', accounts.bride, 'bride-accounts');
}

// ============================================
// 카운트다운 기능
// ============================================
function initCountdown() {
  const weddingDate = CONFIG.wedding.date;

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '0';
      document.getElementById('hours').textContent = '0';
      document.getElementById('minutes').textContent = '0';
      document.getElementById('seconds').textContent = '0';
      document.getElementById('dday-text').textContent = 'D-Day';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('dday-text').textContent = `D-${days}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============================================
// 갤러리 기능
// ============================================
let currentImageIndex = 0;
const galleryImages = CONFIG.gallery;

function getGalleryImagePath(image) {
  return `images/${image}`;
}

function getGalleryThumbnailPath(image) {
  const thumbnailName = image.replace(/\.[^.]+$/, '.png');
  return `thumbnail/${thumbnailName}`;
}

function initGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryToggle = document.getElementById('gallery-toggle');
  let isExpanded = false;

  galleryGrid.classList.add('collapsed');

  galleryImages.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${getGalleryThumbnailPath(image)}" alt="갤러리 사진 ${index + 1}" loading="lazy" decoding="async">`;
    item.addEventListener('click', () => openModal(index));
    galleryGrid.appendChild(item);
  });

  galleryToggle.addEventListener('click', () => {
    isExpanded = !isExpanded;
    if (isExpanded) {
      galleryGrid.classList.remove('collapsed');
      galleryToggle.textContent = '접기';
    } else {
      galleryGrid.classList.add('collapsed');
      galleryToggle.textContent = '더 보기';
    }
  });

  // 모달 이벤트
  const modal = document.getElementById('gallery-modal');
  const closeBtn = document.getElementById('modal-close');
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');

  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });

  // 터치 스와이프
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showNextImage();
      else showPrevImage();
    }
  });
}

function openModal(index) {
  currentImageIndex = index;
  const modal = document.getElementById('gallery-modal');
  const modalImage = document.getElementById('modal-image');
  modalImage.src = getGalleryImagePath(galleryImages[currentImageIndex]);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('gallery-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById('modal-image').src = getGalleryImagePath(galleryImages[currentImageIndex]);
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  document.getElementById('modal-image').src = getGalleryImagePath(galleryImages[currentImageIndex]);
}

// ============================================
// 아코디언 기능 (이벤트 위임)
// ============================================
function initAccordion() {
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;

    const targetId = header.dataset.target;
    const content = document.getElementById(targetId);

    header.classList.toggle('active');
    content.classList.toggle('active');
  });
}

// ============================================
// 계좌번호 복사 기능 (이벤트 위임)
// ============================================
function initCopyButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    copyToClipboard(btn.dataset.account);
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast();
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand('copy');
    showToast();
  } catch (err) {
    alert('계좌번호를 복사할 수 없습니다. 직접 복사해주세요.\n\n' + text);
  }

  document.body.removeChild(textArea);
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}
