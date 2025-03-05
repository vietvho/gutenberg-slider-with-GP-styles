import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const DEFAULT_SLIDE = { background: '', heading: 'Slide Title' };

export default function Edit({ attributes, setAttributes }) {
  const { slides } = attributes;
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  // Scroll to the selected slide whenever it changes
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(selectedSlide);
  }, [selectedSlide, emblaApi]);

  const updateSlide = (index, newValues) => {
    const updatedSlides = slides.map((slide, i) => (i === index ? { ...slide, ...newValues } : slide));
    setAttributes({ slides: updatedSlides });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Slides">
          {slides.map((slide, index) => (
            <Button
              key={index}
              isPrimary={index === selectedSlide}
              onClick={() => setSelectedSlide(index)}
              style={{ marginBottom: '5px', display: 'block' }}
            >
              Edit Slide {index + 1}
            </Button>
          ))}
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps()} className="embla" ref={emblaRef}>
        <div className="embla__viewport">
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="embla__slide"
                style={{
                  backgroundImage: `url(${slide.background})`,
                  border: index === selectedSlide ? '2px solid blue' : 'none'
                }}
              >
                <h2>{slide.heading}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
