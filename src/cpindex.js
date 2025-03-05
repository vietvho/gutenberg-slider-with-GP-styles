import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, RichText, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Button, SelectControl, RangeControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import useEmblaCarousel from "embla-carousel-react"; 
import '@wordpress/core-data';

registerBlockType('custom/embla-slider', {
  title: 'Embla Slider',
  icon: 'images-alt2',
  category: 'design',
  attributes: {
    slides: {
      type: 'array',
      default: [],
    },
    showArrows: {
      type: 'boolean',
      default: true,
    },
    arrowSVG: {
      type: 'string',
      default: '',
    },
    showProgress: {
      type: 'boolean',
      default: true,
    },
    progressBarStyle: {
      type: 'object',
      default: { height: '4px', backgroundColor: '#000' },
    },
    overlay: {
      type: 'boolean',
      default: false,
    },
    slideWidthDesktop: {
      type: 'number',
      default: 80,
    },
    slideWidthMobile: {
      type: 'number',
      default: 100,
    },
    autoplay: {
      type: 'boolean',
      default: false,
    },
  },
  edit: ({ attributes, setAttributes }) => {
    const { slides, showArrows, arrowSVG, showProgress, progressBarStyle, overlay, slideWidthDesktop, slideWidthMobile, autoplay } = attributes;
    const [emblaRef, embla] = useEmblaCarousel({ loop: attributes.autoplay });
    return (
      <div {...useBlockProps()}>
        <InspectorControls>
          <PanelBody title="Slider Settings">
            <ToggleControl
              label="Show Arrows"
              checked={showArrows}
              onChange={(value) => setAttributes({ showArrows: value })}
            />
            <TextControl
              label="Arrow SVG"
              value={arrowSVG}
              onChange={(value) => setAttributes({ arrowSVG: value })}
            />
            <ToggleControl
              label="Show Progress"
              checked={showProgress}
              onChange={(value) => setAttributes({ showProgress: value })}
            />
            <ToggleControl
              label="Overlay"
              checked={overlay}
              onChange={(value) => setAttributes({ overlay: value })}
            />
            <RangeControl
              label="Slide Width (Desktop)"
              value={slideWidthDesktop}
              onChange={(value) => setAttributes({ slideWidthDesktop: value })}
              min={50}
              max={100}
            />
            <RangeControl
              label="Slide Width (Mobile)"
              value={slideWidthMobile}
              onChange={(value) => setAttributes({ slideWidthMobile: value })}
              min={50}
              max={100}
            />
            <ToggleControl
              label="Autoplay"
              checked={autoplay}
              onChange={(value) => setAttributes({ autoplay: value })}
            />
          </PanelBody>
          <PanelBody title="Progress Bar Style">
            <TextControl
              label="Height"
              value={progressBarStyle.height}
              onChange={(value) => setAttributes({ progressBarStyle: { ...progressBarStyle, height: value } })}
            />
            <TextControl
              label="Background Color"
              value={progressBarStyle.backgroundColor}
              onChange={(value) => setAttributes({ progressBarStyle: { ...progressBarStyle, backgroundColor: value } })}
            />
          </PanelBody>
        </InspectorControls>
        <div ref={emblaRef} options={{ loop: autoplay }}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div key={index} className="embla__slide" style={{ width: `${slideWidthDesktop}%` }}>
                <RichText
                  tagName={slide.headingTag}
                  value={slide.headingText}
                  onChange={(value) => {
                    const newSlides = [...slides];
                    newSlides[index].headingText = value;
                    setAttributes({ slides: newSlides });
                  }}
                  placeholder="Heading"
                />
                <RichText
                  tagName="p"
                  value={slide.text}
                  onChange={(value) => {
                    const newSlides = [...slides];
                    newSlides[index].text = value;
                    setAttributes({ slides: newSlides });
                  }}
                  placeholder="Text"
                />
                <MediaUpload
                  onSelect={(media) => {
                    const newSlides = [...slides];
                    newSlides[index].backgroundImage = media.url;
                    setAttributes({ slides: newSlides });
                  }}
                  allowedTypes={['image']}
                  render={({ open }) => (
                    <Button onClick={open}>Select Background Image</Button>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        <Button onClick={() => setAttributes({ slides: [...slides, { headingText: '', text: '', backgroundImage: '' }] })}>
          Add Slide
        </Button>
      </div>
    );
  },
  save: ({ attributes }) => {
    const { slides, showArrows, arrowSVG, showProgress, progressBarStyle, overlay, slideWidthDesktop, autoplay } = attributes;
    const [emblaRef, embla] = useEmblaCarousel({ loop: attributes.autoplay });

    return (
      <div {...useBlockProps.save()}>
        <div options={{ loop: autoplay }}>
          <div ref={emblaRef} className="embla__container">
            {slides.map((slide, index) => (
              <div key={index} className="embla__slide" style={{ width: `${slideWidthDesktop}%` }}>
                <h2>{slide.headingText}</h2>
                <p>{slide.text}</p>
                {slide.backgroundImage && <img src={slide.backgroundImage} alt="Slide Background" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
