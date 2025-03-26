import EmblaCarousel from "embla-carousel";

document.addEventListener("DOMContentLoaded", () => {
  const wnslideNodes = document.querySelectorAll(".wnslide");
  console.log(wnslideNodes); // Check if it now logs elements

  wnslideNodes.forEach((wnslideNode) => {
    const wnslidePrev = wnslideNode.querySelector(".wnslide__prev") as HTMLButtonElement;
    const wnslideNext = wnslideNode.querySelector(".wnslide__next") as HTMLButtonElement;
    const wnslideViewport = wnslideNode.querySelector(".wnslide__viewport") as HTMLElement;

    if (!wnslideViewport) return;

    const wnslideApi = EmblaCarousel(wnslideViewport, { loop: false });

    const updateButtons = () => {
      wnslidePrev.disabled = !wnslideApi.canScrollPrev();
      wnslideNext.disabled = !wnslideApi.canScrollNext();
    };

    wnslideApi.on("select", updateButtons);
    updateButtons();

    wnslidePrev.addEventListener("click", () => wnslideApi.scrollPrev());
    wnslideNext.addEventListener("click", () => wnslideApi.scrollNext());
  });
});
