// ============================================
// 모바일 청첩장 JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initCountdown();
  initGallery();
  initAccountTabs();
  initCopyButtons();
});

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

function initGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryToggle = document.getElementById('gallery-toggle');
  let isExpanded = false;
  
  // 처음에 접힌 상태로 시작 (6장만 표시)
  galleryGrid.classList.add('collapsed');
  
  galleryImages.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="images/${image}" alt="갤러리 사진 ${index + 1}" loading="lazy">`;
    item.addEventListener('click', () => openModal(index));
    galleryGrid.appendChild(item);
  });
  
  // 더보기/접기 토글
  galleryToggle.addEventListener('click', function() {
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
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // 키보드 이벤트
  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });
  
  // 터치 스와이프
  let touchStartX = 0;
  let touchEndX = 0;
  
  modal.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  modal.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showNextImage();
      } else {
        showPrevImage();
      }
    }
  }
}

function openModal(index) {
  currentImageIndex = index;
  const modal = document.getElementById('gallery-modal');
  const modalImage = document.getElementById('modal-image');
  
  modalImage.src = `images/${galleryImages[currentImageIndex]}`;
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
  document.getElementById('modal-image').src = `images/${galleryImages[currentImageIndex]}`;
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  document.getElementById('modal-image').src = `images/${galleryImages[currentImageIndex]}`;
}

// ============================================
// 계좌번호 아코디언 기능
// ============================================
function initAccountTabs() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetId = this.dataset.target;
      const content = document.getElementById(targetId);
      
      // 토글 현재 아코디언
      this.classList.toggle('active');
      content.classList.toggle('active');
    });
  });
}

// ============================================
// 계좌번호 복사 기능 (계좌번호만 복사)
// ============================================
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const accountNumber = this.dataset.account;
      copyToClipboard(accountNumber);
    });
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
