// Frontend Script (embla-frontend.js)
import emblaCarousel from 'embla-carousel';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.embla').forEach((slider) => {
    const emblaNode = slider.querySelector('.embla__viewport');
    if (emblaNode) {
      emblaCarousel(emblaNode);
    }
  });
});