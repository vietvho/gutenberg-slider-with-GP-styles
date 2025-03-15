import React from 'react';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import clsx from 'clsx';
import usePosition from './usePosition';
import { ATTR, SLIDE } from './type';
import { BlockSaveProps } from '@wordpress/blocks';
type BlockProps = Omit<ATTR, "slides"> & {
  slides: SLIDE[];
};
import "./frontend.scss";
// import useEmblaCarousel from 'embla-carousel-react';

export default function Save({ attributes }: BlockSaveProps<BlockProps>) {
  const { slides, showArrows, arrowSVG, showDots, slideWidthDesktop, slideWidthMobile, slideHeight, overlay, dotSVG, dotActiveSVG, sliderGap } = attributes;
  // const [emblaR/ef, emblaApi] = useEmblaCarousel();

  return (
      <div {...useBlockProps.save()} >
      <div data-autoplay={attributes.autoPlay} className="wnslider" >
          <div className={clsx("wnslide__container")}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={clsx("wnslide__slide", usePosition(slide.alignment))}
                style={{
                  height: `${slideHeight || 68}vh`,
                  "--slideWidthDesktop": `${slideWidthDesktop}%`,
                  "--slideWidthMobile": `${slideWidthMobile}%`,
                  backgroundImage: `url(${slide.background})`,
                  marginInlineEnd: slides.length - 1 > index ? `${sliderGap}px` : ''
                } as React.CSSProperties}
              >
                {overlay && <div className="wnslide__overlay" />}
  
                <div className="wnslide__slide__container relative">
                  <RichText.Content
                    className="wnslide__primary__text mb-0"
                    tagName={slide.heading.tag}
                    value={slide.heading.text}
                    style={{ "--primaryDeskTextSize": `${slide.heading.sizes[1]}px`, "--primaryMobTextSize": `${slide.heading.sizes[0]}px`, color: slide.heading.color } as React.CSSProperties}
                  />
                  <RichText.Content
                    className="wnslide__secondary__text"
                    tagName={slide.secondaryHeading.tag}
                    value={slide.secondaryHeading.text}
                    style={{ "--secondaryDeskTextSize": `${slide.secondaryHeading.sizes[1]}px`, "--secondaryMobTextSize": `${slide.secondaryHeading.sizes[0]}px`, color: slide.secondaryHeading.color } as React.CSSProperties}
                  />
                  {slide.buttons && slide.buttons.map((button, btnIndex) => (
                    <a key={btnIndex} href={button.link} className={`button wp-block-button embla-btn ${button.style}`}>
                      {button.text}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
