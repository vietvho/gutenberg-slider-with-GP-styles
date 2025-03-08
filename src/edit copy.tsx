import React, { useMemo } from 'react';

import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  RichText,
  URLInput
} from '@wordpress/block-editor';

import { BlockEditProps } from '@wordpress/blocks';
import {
  PanelBody,
  Button,
  SelectControl,
  TextControl,
  RangeControl,
  ToggleControl,
} from '@wordpress/components';
import useEmblaCarousel from 'embla-carousel-react';
import "./editor.scss";
const DEFAULT_BUTTON:BUTTON = {
  text: 'Learn More',
  link: '#',
  style: 'fill'
} ;

declare global {
  interface Window {
    emblaSliderData?: {
      pluginUrl: string
    }
  }
}

type BUTTON = {
  text: string,
  link: string,
  style: 'fill' | 'outline'
}

type SLIDE = {
  background: string,
  heading: string,
  headingSize: number,
  headingTag: keyof HTMLElementTagNameMap ,
  headingColor: string,
  buttons: BUTTON[],
  accordionContent: 'Additional slide details...'
}
import { ATTR } from '.';
type BlockProps = Omit<ATTR, "slides"> & {
  slides: SLIDE[];
};

const WURLInput = URLInput as React.FC<URLInput.Props>;

export default function Edit({ attributes, setAttributes }: BlockEditProps<BlockProps>) {
  const { slides, showArrows, arrowSVG, showDots, slideWidthDesktop, slideWidthMobile, slideHeight, overlay, dotSVG, dotActiveSVG, sliderGap } = attributes;

  const pluginUrl = useMemo(() => window.emblaSliderData?.pluginUrl || '', [window.emblaSliderData]);

  const DEFAULT_SLIDE: SLIDE = {
    background: `${pluginUrl}assets/placeholder.jpg`,
    heading: 'Slide Title',
    headingSize: 24,
    headingTag: 'h2',
    headingColor: '#ffffff',
    buttons: [DEFAULT_BUTTON],
    accordionContent: 'Additional slide details...'
  };
    const [emblaRef, emblaApi] = useEmblaCarousel();

    const updateSlide = (index: number, newValues : Partial<SLIDE>) => {
      const updatedSlides = slides.map((slide, i) => (i === index ? { ...slide, ...newValues } : slide));
      setAttributes({ slides: updatedSlides });
    };

    const updateButton = (slideIndex: number, buttonIndex:number, newValues: Partial<BUTTON>) => {
      const updatedSlides = slides.map((slide, i) => {
        if (i === slideIndex) {
          const updatedButtons = slide.buttons.map((button, j) =>
            j === buttonIndex ? { ...button, ...newValues } : button
          );
          return { ...slide, buttons: updatedButtons };
        }
        return slide;
      });
      setAttributes({ slides: updatedSlides });
    };

    const addButton = (slideIndex:number) => {
      const updatedSlides = slides.map((slide, i) =>
        i === slideIndex ? { ...slide, buttons: [...slide.buttons, DEFAULT_BUTTON] } : slide
      ) as SLIDE[];
      setAttributes({  slides: updatedSlides });
    };

    const removeButton = (slideIndex: number, buttonIndex: number) => {
      const updatedSlides = slides.map((slide, i) => {
        if (i === slideIndex) {
          const updatedButtons = slide.buttons ? slide.buttons.filter((_, j) => j !== buttonIndex) : slide.buttons;
          return { ...slide, buttons: updatedButtons };
        }
        return slide;
      });
      setAttributes({ slides: updatedSlides });
    };

    return (
      <div {...useBlockProps({className :"slider"})}>
        <InspectorControls>
          <PanelBody title="Slider Settings">
            <ToggleControl
              label="Show Arrows"
              checked={showArrows}
              onChange={() => setAttributes({ ...attributes, showArrows: !showArrows })}
            />
            <div className="arrows flex gap-4 mb-4">
             
              <MediaUpload
                onSelect={(media) => setAttributes({ arrowSVG: media.url })}
                allowedTypes={['image']}
                render={({ open }) => (
                  <Button onClick={open} isSecondary>
                    {arrowSVG ? 'Change Arrow Icon' : 'Upload Arrow'}
                  </Button>
                )}
              />
            </div>
         
            <ToggleControl
              label="Show Dots"
              checked={showDots}
              onChange={() => setAttributes({ showDots: !showDots })}
            />
            {showDots && (
              <div className="arrows flex gap-4 mb-4">

                <MediaUpload
                  onSelect={(media) => setAttributes({ dotSVG: media.url })}
                  allowedTypes={['image']}
                  render={({ open }) => (
                    <Button onClick={open} isSecondary>
                      {arrowSVG ? 'Dot Icon' : 'Upload Dot Icon'}
                    </Button>
                  )}
                />
                <MediaUpload
                  onSelect={(media) => setAttributes({ dotActiveSVG: media.url })}
                  allowedTypes={['image']}
                  render={({ open }) => (
                    <Button onClick={open} isSecondary>
                      {dotActiveSVG ? 'Change Active Dot Icon' : 'Upload Active Dot Icon'}
                    </Button>
                  )}
                />
              </div>

            )}

            <ToggleControl
              label="Overlay"
              checked={overlay}
              onChange={(value) => setAttributes({ overlay: value })}
            />
            <RangeControl
              label="Gap (px)"
              value={sliderGap}
              onChange={(value) => setAttributes({ sliderGap: value })}
              min={15}
              max={100}
            />
            <RangeControl
              label="Slide Width (Desktop %)"
              value={slideWidthDesktop}
              onChange={(value) => setAttributes({ slideWidthDesktop: value })}
              min={15}
              max={100}
            />
            <RangeControl
              label="Slide Width (Mobile %)"
              value={slideWidthMobile}
              onChange={(value) => setAttributes({ slideWidthMobile: value })}
              min={15}
              max={100}
            />
            <RangeControl
              label="Slide Height"
              value={slideHeight}
              onChange={(value) => setAttributes({ slideHeight: value })}
              min={30}
              max={100}
            />
          </PanelBody>
          <PanelBody title="Slides">
            <Button className="mb-4" isPrimary onClick={() => setAttributes({ slides: [...slides, DEFAULT_SLIDE] })}>
              Add Slide
            </Button>
            {slides.map((slide, index) => (
              <PanelBody title={`Slide ${index + 1}`} key={index} initialOpen={false}>
                <div onClick={() => {
                  if (emblaApi) {
                    emblaApi.scrollTo(index);
                  }
                }}>
                    <MediaUpload
                      onSelect={(media) => updateSlide(index, { background: media.url   })}
                      allowedTypes={['image']}
                      render={({ open }) => (
                        <Button onClick={open} isSecondary>
                          {slide.background ? 'Change Background' : 'Upload Background'}
                        </Button>
                      )}
                    />
                  <TextControl
                    label="Heading Text"
                    value={slide.heading}
                    onChange={(text) => updateSlide(index, { heading: text })}
                  />
                  <RangeControl
                    label="Heading Font Size"
                    value={slide.headingSize}
                    onChange={(size) => updateSlide(index, { headingSize: size })}
                    min={12}
                    max={48}
                  />
                  <SelectControl
                    label="Heading Tag"
                    value={slide.headingTag}
                    options={['h1', 'h2', 'h3', 'h4'].map(tag => ({ label: tag.toUpperCase(), value: tag }))}
                    onChange={(tag) => updateSlide(index, { headingTag: tag })}
                  />
                  <div>
                 
                  </div>
                  {slide.buttons && slide.buttons.map((button, btnIndex) => (
                    <PanelBody title={`Button ${btnIndex + 1}`} key={btnIndex} initialOpen={false}>
                      <TextControl
                        label="Button Text"
                        value={button.text}
                        onChange={(text) => updateButton(index, btnIndex, { text })}
                      />
                      <WURLInput
                        value={button.link}
                        onChange={(newLink) => updateButton(index, btnIndex, { link: newLink })}
                        autoFocus
                      />
                      
                      <SelectControl
                        label="Button Style"
                        value={button.style}
                        options={[{ label: 'Fill', value: 'fill' }, { label: 'Outline', value: 'outline' }]}
                        onChange={(style) => updateButton(index, btnIndex, { style })}
                      />
                      <Button isDestructive onClick={() => removeButton(index, btnIndex)}>
                        Remove Button
                      </Button>
                    </PanelBody>
                  ))}

                </div>
                <Button isSecondary onClick={() => addButton(index)}>Add Button</Button>
              </PanelBody>
            ))}
          </PanelBody>

        </InspectorControls>

        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((slide, index) => (
                <div key={index} className="embla__slide" style={{
                  height: `${slideHeight || 50}vh`,
                  flex: `0 0 ${slideWidthDesktop}%`,
                  backgroundImage: `url(${slide.background})`,
                  marginInlineEnd: slides.length - 1 > index ? `${sliderGap}px` : ''
                }}>
                  <RichText.Content
                    tagName={slide.headingTag}
                    value={slide.heading}
                    style={{ fontSize: `${slide.headingSize}px`, color: slide.headingColor }}
                  />
                  {slide.buttons && slide.buttons.map((button, btnIndex) => (
                    <a key={btnIndex} href={button.link} className={`embla-btn ${button.style}`}>
                      {button.text}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
