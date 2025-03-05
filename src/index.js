import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  RichText,
  PanelColorSettings
} from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  SelectControl,
  TextControl,
  RangeControl
} from '@wordpress/components';
import useEmblaCarousel from 'embla-carousel-react';
import "./editor.scss";
const pluginUrl = window.emblaSliderData?.pluginUrl || '';
const DEFAULT_SLIDE = {
  background: `${pluginUrl}assets/placeholder.jpg`, 
  heading: 'Slide Title',
  headingSize: 24,
  headingTag: 'h2',
  headingColor: '#ffffff',
  buttonText: 'Learn More',
  buttonLink: '#',
  buttonStyle: 'fill',
  accordionContent: 'Additional slide details...'
};

registerBlockType('custom/embla-slider', {
  attributes: {
    slides: { type: 'array', default: [DEFAULT_SLIDE] }
  },

  edit: ({ attributes, setAttributes }) => {
    const { slides } = attributes;
    const [emblaRef, emblaApi ] = useEmblaCarousel();

    const updateSlide = (index, newValues) => {
      const updatedSlides = slides.map((slide, i) => (i === index ? { ...slide, ...newValues } : slide));
      setAttributes({ slides: updatedSlides });
    };

    const removeSlide = (index) => {
      const updatedSlides = slides.filter((_, i) => i !== index);
      setAttributes({ slides: updatedSlides });
    };

    const addSlide = () => {
      const newSlides = [...slides, DEFAULT_SLIDE];
      setAttributes({ slides: newSlides });

    
      setTimeout(() => {
        if (emblaApi) {
          emblaApi.scrollTo(newSlides.length - 1); 
        }
      }, 100);
    };

    return (
      <div className="slider" {...useBlockProps()}>
        <InspectorControls>
          <Button  onClick={addSlide}>
            Add Slide
          </Button>
          {slides.map((slide, index) => (
            <PanelBody title={`Slide ${index + 1}`} key={index} initialOpen={index === slides.length - 1} >
              <div onClick={() => {
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
              <TextControl
                label="Button Text"
                value={slide.buttonText}
                onChange={(text) => updateSlide(index, { buttonText: text })}
              />
              <TextControl
                label="Button Link"
                value={slide.buttonLink}
                onChange={(link) => updateSlide(index, { buttonLink: link })}
              />
              {slides.length > 1 && (
                <Button isDestructive onClick={() => removeSlide(index)} style={{ marginTop: '10px', display: 'block' }}>
                  Remove Slide
                </Button>
              )}
              </div>
            </PanelBody>
          ))}
        </InspectorControls>
       

        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((slide, index) => (
                <div key={index} className="embla__slide" style={{ backgroundImage: `url(${slide.background})` }} onClick={() => {
                  if (emblaApi) {
                    emblaApi.scrollTo(index)
                  }
                }
                }>
                  <RichText.Content
                    tagName={slide.headingTag}
                    value={slide.heading}
                    style={{ fontSize: `${slide.headingSize}px`, color: slide.headingColor }}
                  />
                  <a href={slide.buttonLink} className={`embla-btn ${slide.buttonStyle}`}>
                    {slide.buttonText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  save: ({ attributes }) => {
    const { slides } = attributes;
    return (
      <div className="embla">
        <div className="embla__viewport">
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div key={index} className="embla__slide" style={{ backgroundImage: `url(${slide.background})` }}>
                <RichText.Content
                  tagName={slide.headingTag}
                  value={slide.heading}
                  style={{ fontSize: `${slide.headingSize}px`, color: slide.headingColor }}
                />
                <a href={slide.buttonLink} className={`embla-btn ${slide.buttonStyle}`}>
                  {slide.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
});