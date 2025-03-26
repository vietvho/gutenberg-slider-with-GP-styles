import EmblaCarousel from "embla-carousel";
import { addPrevNextBtnsClickHandlers } from "./fearrow";
import { addDotBtnsAndClickHandlers } from "./fedots";

document.addEventListener("DOMContentLoaded", () => {
    const emblaNodes = [...document.querySelectorAll(".wnslider")] as HTMLElement[];
   
    emblaNodes.forEach(emblaNode => {

    const OPTIONS = {}

    const prevBtnNode = emblaNode.querySelector<HTMLElement>('.wnslider__button--prev')
    const nextBtnNode = emblaNode.querySelector<HTMLElement>('.wnslider__button--next')
    const dotsNode = emblaNode.querySelector<HTMLElement>('.wnslider__dots')

    const emblaApi = EmblaCarousel(emblaNode, OPTIONS)

    emblaApi.on('destroy', () => addPrevNextBtnsClickHandlers(
      emblaApi,
      prevBtnNode,
      nextBtnNode
    ));
    emblaApi.on('destroy', () => addDotBtnsAndClickHandlers(
      emblaApi,
      dotsNode
    ))

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

    if (emblaNode.dataset.autoplay === "true") {
      autoplay(); // Start AutoPlay
    }
  });
});
