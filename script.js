  const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('lightbox-caption');
const counterText = document.getElementById('lightbox-counter');
let currentImageIndex = 0;

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentImageIndex = index;
    showImage();
  });
});

function showImage() {
  lightbox.style.display = 'flex';
  lightboxImg.src = galleryImages[currentImageIndex].src;
  captionText.innerHTML = galleryImages[currentImageIndex].alt;
  counterText.innerHTML = `${currentImageIndex + 1} / ${galleryImages.length}`;

  lightboxImg.style.animation = 'none';
  setTimeout(() => {
    lightboxImg.style.animation = 'fadeIn 0.4s ease-in-out';
  }, 10);
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function changeImage(direction) {
  currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
  showImage();
}

// 1. دعم الكيبورد (الأسهم والـ Escape)
document.addEventListener('keydown', (event) => {
  if (lightbox.style.display === 'flex') {
    if (event.key === 'ArrowRight') {
      changeImage(1);
    } else if (event.key === 'ArrowLeft') {
      changeImage(-1);
    } else if (event.key === 'Escape') {
      closeLightbox();
    }
  }
});

// 2. دعم السحب بالإصبع للموبايل والتابلت (Swipe)
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    changeImage(1); // سحب لليسار
  }
  if (touchEndX - touchStartX > 50) {
    changeImage(-1); // سحب لليمين
  }
}
