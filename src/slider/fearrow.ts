import { EmblaCarouselType } from "embla-carousel"
const addTogglePrevNextBtnsActive = (emblaApi: EmblaCarouselType, prevBtn? : HTMLElement | null, nextBtn?: HTMLElement | null) => {
  const togglePrevNextBtnsState = () => {
    if (emblaApi.canScrollPrev()) prevBtn?.removeAttribute('disabled')
    else prevBtn?.setAttribute('disabled', 'disabled')

    if (emblaApi.canScrollNext()) nextBtn?.removeAttribute('disabled')
    else nextBtn?.setAttribute('disabled', 'disabled')
  }

  emblaApi
    .on('select', togglePrevNextBtnsState)
    .on('init', togglePrevNextBtnsState)
    .on('reInit', togglePrevNextBtnsState)

  return () => {
    prevBtn?.removeAttribute('disabled')
    nextBtn?.removeAttribute('disabled')
  }
}

export const addPrevNextBtnsClickHandlers = (emblaApi : EmblaCarouselType, prevBtn? : HTMLElement | null , nextBtn? : HTMLElement | null) => {
  const scrollPrev = () => {
    emblaApi.scrollPrev()
  }
  const scrollNext = () => {
    emblaApi.scrollNext()
  }

  prevBtn?.addEventListener('click', scrollPrev, false)
  nextBtn?.addEventListener('click', scrollNext, false)

  const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
    emblaApi,
    prevBtn,
    nextBtn
  )

  return () => {
    removeTogglePrevNextBtnsActive()
    prevBtn?.removeEventListener('click', scrollPrev, false)
    nextBtn?.removeEventListener('click', scrollNext, false)
  }
}
