import EmblaCarousel from "embla-carousel";

document.addEventListener("DOMContentLoaded", () => {
  const emblaNodes = [...document.querySelectorAll(".wnslider")] as HTMLElement[];
  emblaNodes.forEach(emblaNode  => {
    const embla = EmblaCarousel(emblaNode, { loop: true });
    const autoplay = () => {
      setInterval(() => {
        if (embla.canScrollNext()) {
          embla.scrollNext();
        } else {
          embla.scrollTo(0); // Go back to the first slide
        }
      }, 3000); // Change slides every 3 seconds
    };

    if (emblaNode.dataset.autoplay === "true"){
      autoplay(); // Start AutoPlay
    }
  });
});