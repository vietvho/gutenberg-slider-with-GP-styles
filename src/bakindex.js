import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, BlockControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl, RangeControl, ColorPicker, Button as WPButton, SelectControl, ToolbarGroup, ToolbarButton, ToolbarDropdownMenu } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import EmblaCarousel from 'embla-carousel-react';
import './editor.scss';
import './style.scss';

registerBlockType('custom/embla-slider', {
  title: 'Embla Slider',
  icon: 'images-alt2',
  category: 'design',
  attributes: {
    slides: { type: 'array', default: [] },
    showArrows: { type: 'boolean', default: true },
    arrowSVG: { type: 'string', default: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg>' },
    showProgress: { type: 'boolean', default: true },
    progressColor: { type: 'string', default: '#000' },
    slideWidthDesktop: { type: 'number', default: 80 },
    slideWidthMobile: { type: 'number', default: 90 },
  },
  edit: ({ attributes, setAttributes }) => {
    const { slides, showArrows, arrowSVG, showProgress, progressColor, slideWidthDesktop, slideWidthMobile } = attributes;
    const emblaRef = useRef(null);
    const [embla, setEmbla] = useState(null);
    const [progress, setProgress] = useState(0);
    const [selectedSlide, setSelectedSlide] = useState({id:null,control: null});

    useEffect(() => {
      if (embla) {
        const updateProgress = () => setProgress(embla.scrollProgress());
        embla.on('scroll', updateProgress);
        updateProgress();
      }
    }, [embla]);

    const updateSlide = (index, key, value) => {
      const newSlides = [...slides];
      newSlides[index][key] = value;
      setAttributes({ slides: newSlides });
    };

    return (
      <div {...useBlockProps()}>
        <InspectorControls>
          <PanelBody title="Slider Settings">
            <ToggleControl
              label="Show Arrows"
              checked={showArrows}
              onChange={() => setAttributes({ showArrows: !showArrows })}
            />
            <TextControl
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
          </PanelBody>
          <PanelBody title="Slides">
            {slides.map((slide, index) => (
              <PanelBody title={`Slide ${index + 1}`} initialOpen={false} key={index}>
                <BlockControls>
                  <ToolbarGroup>
                    <ToolbarDropdownMenu
                      icon="editor-textcolor"
                      label="Heading Size"
                      controls={[
                        { title: 'XS', onClick: () => updateSlide(index, 'textSize', 'xs') },
                        { title: 'SM', onClick: () => updateSlide(index, 'textSize', 'sm') },
                        { title: 'MD', onClick: () => updateSlide(index, 'textSize', 'md') },
                        { title: 'LG', onClick: () => updateSlide(index, 'textSize', 'lg') },
                        { title: 'XL', onClick: () => updateSlide(index, 'textSize', 'xl') },
                      ]}
                    />
                    <ToolbarDropdownMenu
                      icon="heading"
                      label="Heading Tag"
                      controls={[
                        { title: 'H1', onClick: () => updateSlide(index, 'headingTag', 'h1') },
                        { title: 'H2', onClick: () => updateSlide(index, 'headingTag', 'h2') },
                        { title: 'H3', onClick: () => updateSlide(index, 'headingTag', 'h3') },
                        { title: 'H4', onClick: () => updateSlide(index, 'headingTag', 'h4') },
                        { title: 'H5', onClick: () => updateSlide(index, 'headingTag', 'h5') },
                        { title: 'H6', onClick: () => updateSlide(index, 'headingTag', 'h6') },
                      ]}
                    />
                  </ToolbarGroup>
                </BlockControls>
                <TextControl
                  label="Title"
                  value={slide.title}
                  onChange={(value) => updateSlide(index, 'title', value)}
                />
                <BlockControls>
                  <ToolbarGroup>
                    <ToolbarButton
                      isPressed={slide.buttonStyle === 'fill'}
                      onClick={() => updateSlide(index, 'buttonStyle', 'fill')}
                    >
                      Fill
                    </ToolbarButton>
                    <ToolbarButton
                      isPressed={slide.buttonStyle === 'outline'}
                      onClick={() => updateSlide(index, 'buttonStyle', 'outline')}
                    >
                      Outline
                    </ToolbarButton>
                  </ToolbarGroup>
                </BlockControls>
                <TextControl
                  label="Button Text"
                  value={slide.buttonText}
                  onChange={(value) => updateSlide(index, 'buttonText', value)}
                />
                <TextControl
                  label="Button Link"
                  value={slide.buttonLink}
                  onChange={(value) => updateSlide(index, 'buttonLink', value)}
                />
              </PanelBody>
            ))}
            <WPButton isPrimary onClick={() => setAttributes({ slides: [...slides, { title: '', textSize: 'md', headingTag: 'h2', buttonText: '', buttonLink: '', buttonStyle: 'fill' }] })}>
              Add Slide
            </WPButton>
          </PanelBody>
        </InspectorControls>
      </div>
    );
  }
});
