import React, {useMemo} from 'react';
import clsx from 'clsx';
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  RichText,
  URLInput,
  PanelColorSettings
} from '@wordpress/block-editor';

import { BlockEditProps } from '@wordpress/blocks';
import {
  PanelBody,
  Button,
  SelectControl,
  TextControl,
  RangeControl,
  ToggleControl,
  TabPanel,
  AlignmentMatrixControl
} from '@wordpress/components';
import useEmblaCarousel from 'embla-carousel-react';
import "./editor.scss";
import { BUTTON, ATTR, SLIDE, DEFAULT_BUTTON, BASE_SLIDE } from './type';
import usePosition from './usePosition';

type BlockProps = Omit<ATTR, "slides"> & {
  slides: SLIDE[];
};

const WURLInput = URLInput as React.FC<URLInput.Props>;
const WPanelColorSettings = PanelColorSettings as React.FC<PanelColorSettings.Props>;

export default function Edit({ attributes, setAttributes }: BlockEditProps<BlockProps>) {
  const { slides, showArrows, arrowSVG, showDots, slideWidthDesktop, slideWidthMobile, slideHeight, overlay, dotSVG, dotActiveSVG, sliderGap, autoPlay } = attributes;
  const pluginUrl = useMemo(() => window.emblaSliderData?.pluginUrl || '', [window.emblaSliderData]);
  const DEFAULT_SLIDE: SLIDE = { ...BASE_SLIDE,  background: `${pluginUrl}assets/placeholder.jpg`};

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const updateSlide = (index: number, newValues: Partial<SLIDE>) => {
    const updatedSlides = slides.map((slide, i) => (i === index ? { ...slide, ...newValues } : slide));
    setAttributes({ slides: updatedSlides });
  };

  const updateButton = (slideIndex: number, buttonIndex: number, newValues: Partial<BUTTON>) => {
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

  const addButton = (slideIndex: number) => {
    const updatedSlides = slides.map((slide, i) =>
      i === slideIndex ? { ...slide, buttons: [...slide.buttons, DEFAULT_BUTTON] } : slide
    ) as SLIDE[];
    setAttributes({ slides: updatedSlides });
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
    <div {...useBlockProps({ className: "slider" })}>
      <InspectorControls>
        <TabPanel 
          className="wtabs"
          activeClass="text-primary border-b"
          tabs={[
            {
              name: 'settings',
              title: 'Settings',
              className: 'settings-tab',
            },
            {
              name: 'slides',
              title: 'Slides',
              className: 'slides-tab',
            },
          ]}
        >
          {(tab) => (
            <>
              {tab.name === 'settings' && (
                <div className='px-4' title="Slider Settings">
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
                  <ToggleControl
                    label="Autoplay"
                    checked={autoPlay}
                    onChange={(value) => setAttributes({ autoPlay: value })}
                  />
                  <RangeControl
                    label="Gap (px)"
                    value={sliderGap}
                    onChange={(value) => setAttributes({ sliderGap: value })}
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
                </div>
              )}
              {tab.name === 'slides' && (
                <div title="Slides">
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
                        <AlignmentMatrixControl
                          value={slide.alignment}
                          onChange={(value) => updateSlide(index, { alignment: value })}
                        />
                        <MediaUpload
                          onSelect={(media) => updateSlide(index, { background: media.url })}
                          allowedTypes={['image']}
                          render={({ open }) => (
                            <Button onClick={open} isSecondary>
                              {slide.background ? 'Change Background' : 'Upload Background'}
                            </Button>
                          )}
                        />
                        <TextControl
                          label="Primary Text"
                          value={slide.heading.text}
                          onChange={(text) => updateSlide(index, { heading: { ...slide.heading, text } })}
                        />
                        <RangeControl
                          width="50%"
                          label="Mobile Text Size"
                          value={slide.heading.sizes[0]}
                          onChange={(size) => updateSlide(index, { heading: { ...slide.heading, sizes: [size || 20,slide.heading.sizes[1]] } })}
                          min={12}
                          max={120}
                        />
                        <RangeControl
                          width="50%"
                          label="Desktop Text Size"
                          value={slide.heading.sizes[1]}
                          onChange={(size) => updateSlide(index, { heading: { ...slide.heading, sizes: [slide.heading.sizes[0], size || 20] } })}
                          min={12}
                          max={120}
                        />
                        <SelectControl
                          label="Tag"
                          value={slide.heading.tag}
                          options={['h1', 'h2', 'h3', 'h4', 'h5', 'h6','p'].map(tag => ({ label: tag.toUpperCase(), value: tag }))}
                          onChange={(tag ) => updateSlide(index, { heading: { ...slide.heading, tag: tag as keyof HTMLElementTagNameMap } })}
                        />
                        <WPanelColorSettings
                          title={'Text Color'}
                          colorSettings={[
                            {
                              value: slide.heading.color,
                              onChange: (color) => updateSlide(index, { heading: { ...slide.heading, color: color || "#fff" } }),
                              label: 'Text Color',
                            },
                          ]}
                        />
                        <div className="mb-4">
                          <TextControl
                            label="Secondary Text"
                            value={slide.secondaryHeading.text}
                            onChange={(text) => updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, text } })}
                          />
                          <RangeControl
                            width="50%"
                            label="Mobile Secondary Text Size"
                            value={slide.secondaryHeading.sizes[1]}
                            onChange={(size) => updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, sizes: [size || 20,slide.secondaryHeading.sizes[1]] } })}
                            min={12}
                            max={120}
                          />
                          <RangeControl
                            width="50%"
                            label="Mobile Secondary Text Size"
                            value={slide.secondaryHeading.sizes[1]}
                            onChange={(size) => updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, sizes: [slide.secondaryHeading.sizes[0], size || 20] } })}
                            min={12}
                            max={120}
                          />
                          <SelectControl
                            label="Tag"
                            value={slide.secondaryHeading.tag}
                            options={['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].map(tag => ({ label: tag.toUpperCase(), value: tag }))}
                            onChange={(tag) => updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, tag: tag } })}
                          />
                          <WPanelColorSettings
                            title={'Heading Color'}
                            colorSettings={[
                              {
                                value: slide.secondaryHeading.color,
                                onChange: (color) => updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, color: color || "#fff" } }),
                                label: 'Heading Color',
                              },
                            ]}
                          />
                        </div>
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
                </div>
              )}
            </>
          )}
      </TabPanel>
      </InspectorControls>

      <div className="wnslide">
        <div className="wnslide__viewport" ref={emblaRef}>
          <div className={clsx("wnslide__container")}>
             {slides.map((slide, index) => (
              <div key={index} className={clsx("wnslide__slide",usePosition(slide.alignment))} style={{
                height: `${slideHeight || 68}vh`,
                 "--slideWidthDesktop": `${slideWidthDesktop}%`,
                 "--slideWidthMobile": `${slideWidthMobile}%`,
                backgroundImage: `url(${slide.background})`,
                marginInlineEnd: slides.length - 1 > index ? `${sliderGap}px` : ''
              } as React.CSSProperties}>
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
    </div>
  );
}
