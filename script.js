const galleryImages = document.querySelectorAll('.gallary img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
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

}

function closelightbox() {
  lightbox.style.display = 'none';
}

function changeImage(direction) {
  currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
  showImage();
}
document.addEventListener('keydown', (event) => {
  if (lightbox.style.display === 'flex') {
    if (event.key === 'ArrowRight') {
      changeImage(1);
    } else if (event.key === 'ArrowLeft') {
      changeImage(-1);
    } else if (event.key === 'Escape') {
      closelightbox();
    }
  }
});
