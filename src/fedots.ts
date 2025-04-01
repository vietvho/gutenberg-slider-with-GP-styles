import { EmblaCarouselType } from 'embla-carousel'

export const addDotBtnsAndClickHandlers = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement
): (() => void) => {
  let dotNodes: HTMLElement[] = []
  console.log(dotsNode);
  const addDotBtnsWithClickHandlers = (): void => {
    const scrollTo = (index: number): void => {
      emblaApi.scrollTo(index)
    }

    dotNodes = Array.from(dotsNode.querySelectorAll('.wnslide__dot'));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false)
    })
  }

  const toggleDotBtnsActive = (): void => {
    const previous = emblaApi.previousScrollSnap()
    const selected = emblaApi.selectedScrollSnap()
    dotNodes[previous].classList.remove('is-active')
    dotNodes[selected].classList.add('is-active')
  }

  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reInit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive)

  return (): void => {
    dotsNode.innerHTML = ''
  }
}
