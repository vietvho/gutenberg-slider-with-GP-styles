import { registerBlockType } from '@wordpress/blocks';
import { useState, useEffect } from '@wordpress/element';
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  RichText,
  PanelColorSettings,
  URLInput
} from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  SelectControl,
  TextControl,
  RangeControl,
  ToggleControl,
  TextareaControl,
  ColorPicker
} from '@wordpress/components';
import useEmblaCarousel from 'embla-carousel-react';
import "./editor.scss";

const DEFAULT_BUTTON = {
  text: 'Learn More',
  link: '#',
  style: 'fill'
};
const pluginUrl = window.emblaSliderData?.pluginUrl || '';
const DEFAULT_SLIDE = {
  background: `${pluginUrl}assets/placeholder.jpg`,
  heading: 'Slide Title',
  headingSize: 24,
  headingTag: 'h2',
  headingColor: '#ffffff',
  buttons: [DEFAULT_BUTTON],
  accordionContent: 'Additional slide details...'
};

registerBlockType('custom/embla-slider', {
  attributes: {
    slides: { type: 'array', default: [DEFAULT_SLIDE] },
    showArrows: { type: 'boolean', default: true },
    arrowSVG: { type: 'string', default: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg>' },
    showProgress: { type: 'boolean', default: true },
    progressColor: { type: 'string', default: '#000' },
    slideWidthDesktop: { type: 'number', default: 80 },
    slideWidthMobile: { type: 'number', default: 90 },
    slideHeight: {type: 'number', default: 80}
  },

  edit: ({ attributes, setAttributes }) => {
    const { slides, showArrows, arrowSVG, showProgress, progressColor, slideWidthDesktop, slideWidthMobile, slideHeight } = attributes;
    const [emblaRef, emblaApi] = useEmblaCarousel();

    const updateSlide = (index, newValues) => {
      const updatedSlides = slides.map((slide, i) => (i === index ? { ...slide, ...newValues } : slide));
      setAttributes({ slides: updatedSlides });
    };

    const updateButton = (slideIndex, buttonIndex, newValues) => {
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

    const addButton = (slideIndex) => {
      const updatedSlides = slides.map((slide, i) =>
        i === slideIndex ? { ...slide, buttons: [...slide.buttons, DEFAULT_BUTTON] } : slide
      );
      setAttributes({ slides: updatedSlides });
    };

    const removeButton = (slideIndex, buttonIndex) => {
      const updatedSlides = slides.map((slide, i) => {
        if (i === slideIndex) {
          const updatedButtons = slide.buttons.filter((_, j) => j !== buttonIndex);
          return { ...slide, buttons: updatedButtons };
        }
        return slide;
      });
      setAttributes({ slides: updatedSlides });
    };

    return (
      <div className="slider" {...useBlockProps()}>
        <InspectorControls>
          <PanelBody title="Slider Settings">
            <ToggleControl
              label="Show Arrows"
              checked={showArrows}
              onChange={() => setAttributes({ showArrows: !showArrows })}
            />
            <TextareaControl
              label="Arrow SVG"
              value={arrowSVG}
              onChange={(value) => setAttributes({ arrowSVG: value })}
            />
            <ToggleControl
              label="Show Progress Bar"
              checked={showProgress}
              onChange={() => setAttributes({ showProgress: !showProgress })}
            />
            {showProgress && (
              <ColorPicker
                color={progressColor}
                onChangeComplete={(color) => setAttributes({ progressColor: color.hex })}
              />
            )}
            <RangeControl
              label="Slide Width (Desktop %)"
              value={slideWidthDesktop}
              onChange={(value) => setAttributes({ slideWidthDesktop: value })}
              min={50}
              max={100}
            />
            <RangeControl
              label="Slide Width (Mobile %)"
              value={slideWidthMobile}
              onChange={(value) => setAttributes({ slideWidthMobile: value })}
              min={50}
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
            <Button isPrimary onClick={() => setAttributes({ slides: [...slides, DEFAULT_SLIDE] })}>
              Add Slide
            </Button>
            {slides.map((slide, index) => (
              <PanelBody title={`Slide ${index + 1}`} key={index} initialOpen={false}>
                <div onClick={()=> {
                  if (emblaApi) {
                    emblaApi.scrollTo(index);
                  }
                }}>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => updateSlide(index, { background: media.url })}
                    allowedTypes={['image']}
                    render={({ open }) => (
                      <Button onClick={open} isSecondary>
                        {slide.background ? 'Change Background' : 'Upload Background'}
                      </Button>
                    )}
                  />
                </MediaUploadCheck>
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
                <PanelColorSettings
                  title="Heading Color"
                  colorSettings={[{
                    value: slide.headingColor,
                    onChange: (color) => updateSlide(index, { headingColor: color }),
                    label: 'Heading Color'
                  }]}
                />
                {slide.buttons.map((button, btnIndex) => (
                  <PanelBody title={`Button ${btnIndex + 1}`} key={btnIndex} initialOpen={false}>
                    <TextControl
                      label="Button Text"
                      value={button.text}
                      onChange={(text) => updateButton(index, btnIndex, { text })}
                    />
                    <URLInput
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
                  backgroundImage: `url(${slide.background})` }}>
                  <RichText.Content
                    tagName={slide.headingTag}
                    value={slide.heading}
                    style={{ fontSize: `${slide.headingSize}px`, color: slide.headingColor }}
                  />
                  {slide.buttons.map((button, btnIndex) => (
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
});
