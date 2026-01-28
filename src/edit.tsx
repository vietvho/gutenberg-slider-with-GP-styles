import React, { useMemo } from 'react';
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
import ButtonGroup from './components/ButtonGroups';
import {
  PanelBody,
  Button,
  SelectControl,
  TextControl,
  RangeControl,
  ToggleControl,
  TabPanel,
  FontSizePicker,
  AlignmentMatrixControl,
  PanelRow
} from '@wordpress/components';
import useEmblaCarousel from 'embla-carousel-react';
import "./editor.scss";
import { BUTTON, ATTR, SLIDE, DEFAULT_BUTTON, BASE_SLIDE } from './type';
import usePosition from './usePosition';
import { Icon } from './components/icon';
import { __ } from '@wordpress/i18n';
import { fontSizes } from './constant';
import { reducer } from './store/reducer';
import { addSlide, updateSlide, addButton, updateButton, removeButton, updateAttributes, Action } from './store/actions';

type BlockProps = Omit<ATTR, "slides"> & {
  slides: SLIDE[];
};

const WURLInput = URLInput as React.FC<URLInput.Props>;
const WPanelColorSettings = PanelColorSettings as React.FC<PanelColorSettings.Props>;

export default function Edit({ attributes, setAttributes }: BlockEditProps<BlockProps>) {
  const { slides, showArrows, arrowIcon, showDots, slideWidthDesktop, arrowStyle, slideWidthMobile, slideHeight, overlay, dotsIcon, sliderGap, autoPlay, roundedArrows } = attributes;
  const pluginUrl = useMemo(() => window.emblaSliderData?.pluginUrl || '', [window.emblaSliderData]);
  const DEFAULT_SLIDE: SLIDE = { ...BASE_SLIDE, background: `${pluginUrl}assets/placeholder.jpg` };

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const dispatch = (action: Action) => {
    const newAttributes = reducer(attributes, action);
    setAttributes(newAttributes);
  };

  return (
    <div {...useBlockProps({ className: "slider" })}>
      <InspectorControls>
        <TabPanel
          className="wtabs"
          activeClass="text-theme-primary border-b"
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
                  <PanelBody title={`Arrows`} key={"arrows-settings"} initialOpen={false}>
                    <br />
                    <ToggleControl
                      label="Show Arrows"
                      checked={showArrows}
                      onChange={() => dispatch(updateAttributes({ showArrows: !showArrows }))}
                    />
                    <div className="arrows flex gap-4 mb-4">
                      <ButtonGroup
                        options={[
                          { value: "ThinChevron", icon: <Icon name="ThinChevron" className='w-5 h-5' /> },
                          { value: "Chevron", icon: <Icon name="Chevron" className='w-5 h-5' /> },
                          { value: "ThinArrow", icon: <Icon name="ThinArrow" className='w-5 h-5' /> },
                          { value: "Arrow", icon: <Icon name="Arrow" className='w-5 h-5' /> },
                          { value: "Triangle", icon: <Icon name="Triangle" className='w-5 h-5' /> },
                          { value: "ThinTriangle", icon: <Icon name="ThinTriangle" className='w-5 h-5' /> },
                        ]}
                        value={arrowIcon}
                        onChange={(value) => dispatch(updateAttributes({ arrowIcon: value }))}
                      />
                    </div>
                    <ButtonGroup
                      className='mb-4'
                      options={[
                        { value: "fill", text: "Fill" },
                        { value: "outline", text: "Outline" },
                      ]}
                      value={arrowStyle}
                      onChange={(value) => dispatch(updateAttributes({ arrowStyle: value }))}
                    />
                    <ToggleControl
                      label="Rounded Arrows"
                      checked={roundedArrows}
                      onChange={() => dispatch(updateAttributes({ roundedArrows: !roundedArrows }))}
                    />
                  </PanelBody>
                  <PanelBody title={`Button Settings`} key={"button-settings"} initialOpen={false}>
                    <p className="description mb-0">
                      Button styles are inherited from the Theme Customizer. You can update the default button styling in <strong>Appearance {'>'} Customize {'>'} Colors {'>'} Buttons</strong>.
                    </p>
                  </PanelBody>
                  <PanelBody title={`Dots`} key={"dots-settings"} initialOpen={false}>
                    <br />
                    <ToggleControl
                      label="Show Dots"
                      checked={showDots}
                      onChange={() => dispatch(updateAttributes({ showDots: !showDots }))}
                    />

                    {showDots && (
                      <div className="arrows flex gap-4 mb-4">
                        <ButtonGroup
                          options={[
                            { value: "CircleFill", icon: <Icon name="CircleFill" className='w-5 h-5' /> },
                            { value: "CircleOutline", icon: <Icon name="CircleOutline" className='w-5 h-5' /> },
                            { value: "SquareFill", icon: <Icon name="SquareFill" className='w-5 h-5' /> },
                            { value: "RectangleFill", icon: <Icon name="RectangleFill" className='w-5 h-5' /> },

                          ]}
                          value={dotsIcon}
                          onChange={(value) => dispatch(updateAttributes({ dotsIcon: value }))}
                        />
                      </div>

                    )}
                  </PanelBody>
                  <PanelBody title={`Display Settings`} key={"display-settings"} initialOpen={false}>
                    <br />
                    <ToggleControl
                      label="Overlay"
                      checked={overlay}
                      onChange={(value) => dispatch(updateAttributes({ overlay: value }))}
                    />
                    <ToggleControl
                      label="Autoplay"
                      checked={autoPlay}
                      onChange={(value) => dispatch(updateAttributes({ autoPlay: value }))}
                    />
                  </PanelBody>
                  <PanelBody title={`Slider`} key={"slider-settings"} initialOpen={false}>
                    <br />
                    <RangeControl
                      label="Gap (px)"
                      value={sliderGap}
                      onChange={(value) => dispatch(updateAttributes({ sliderGap: value }))}
                      max={100}
                    />
                    <RangeControl
                      label="Slide Width (Desktop %)"
                      value={slideWidthDesktop}
                      onChange={(value) => dispatch(updateAttributes({ slideWidthDesktop: value }))}
                      min={15}
                      max={100}
                    />
                    <RangeControl
                      label="Slide Width (Mobile %)"
                      value={slideWidthMobile}
                      onChange={(value) => dispatch(updateAttributes({ slideWidthMobile: value }))}
                      min={15}
                      max={100}
                    />
                    <RangeControl
                      label="Slide Height"
                      value={slideHeight}
                      onChange={(value) => dispatch(updateAttributes({ slideHeight: value }))}
                      min={30}
                      max={100}
                    />
                  </PanelBody>
                </div>
              )}
              {tab.name === 'slides' && (
                <div title="Slides">
                  <Button className="mb-4" isPrimary onClick={() => dispatch(addSlide(DEFAULT_SLIDE))}>
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
                          onChange={(value) => dispatch(updateSlide(index, { alignment: value }))}
                        />
                        <MediaUpload
                          onSelect={(media) => dispatch(updateSlide(index, { background: media.url }))}
                          allowedTypes={['image']}
                          render={({ open }) => (
                            <Button onClick={open} isSecondary>
                              {slide.background ? 'Change Background' : 'Upload Background'}
                            </Button>
                          )}
                        />
                        <PanelBody title={`Primary Text`} key="primary-text-panel" initialOpen={false} >
                          <div className="flex gap-2">
                            <SelectControl
                              label="Tag"
                              value={slide.heading.tag}
                              options={['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].map(tag => ({ label: tag.toUpperCase(), value: tag }))}
                              onChange={(tag) => dispatch(updateSlide(index, { heading: { ...slide.heading, tag: tag as keyof HTMLElementTagNameMap } }))}
                            />
                            <WPanelColorSettings
                              className="custom-color-panel"
                              colorSettings={[
                                {
                                  value: slide.heading.color,
                                  onChange: (color) => dispatch(updateSlide(index, { heading: { ...slide.heading, color: color || "#fff" } })),
                                  label: 'Text Color',
                                },
                              ]}
                            />
                          </div>
                          <TextControl
                            label="Primary Text"
                            value={slide.heading.text}
                            onChange={(text) => dispatch(updateSlide(index, { heading: { ...slide.heading, text } }))}
                          />
                          <label>Desktop Size</label>
                          <FontSizePicker
                            withSlider={true}
                            fontSizes={fontSizes}
                            value={slide.heading.sizes[1]}
                            onChange={(size) => dispatch(updateSlide(index, { heading: { ...slide.heading, sizes: [slide.heading.sizes[0], size as number] } }))}
                          />

                          <RangeControl
                            width="50%"
                            label="Desktop Text Size"
                            value={slide.heading.sizes[1]}
                            onChange={(size) => dispatch(updateSlide(index, { heading: { ...slide.heading, sizes: [slide.heading.sizes[0], size || 20] } }))}
                            min={12}
                            max={120}
                          />
                          <RangeControl
                            width="50%"
                            label="Mobile Text Size"
                            value={slide.heading.sizes[0]}
                            onChange={(size) => dispatch(updateSlide(index, { heading: { ...slide.heading, sizes: [size || 20, slide.heading.sizes[1]] } }))}
                            min={12}
                            max={120}
                          />

                          <RangeControl
                            label="Gap after Primary Text (px)"
                            value={slide.gapPrimarySecondary || 5}
                            onChange={(value) => dispatch(updateSlide(index, { gapPrimarySecondary: value }))}
                            min={0}
                            max={100}
                          />
                        </PanelBody>
                        <PanelBody title={`Secondary Text`} key="secondary-text-panel" initialOpen={false} >
                          <div className="flex gap-2 mb-4">
                            <SelectControl
                              label="Tag"
                              value={slide.secondaryHeading.tag}
                              options={['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].map(tag => ({ label: tag.toUpperCase(), value: tag }))}
                              onChange={(tag) => dispatch(updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, tag: tag as keyof HTMLElementTagNameMap } }))}
                            />
                            <WPanelColorSettings
                              className="custom-color-panel"
                              colorSettings={[
                                {
                                  value: slide.secondaryHeading.color,
                                  onChange: (color) => dispatch(updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, color: color || "#fff" } })),
                                  label: 'Heading Color',
                                },
                              ]}
                            />
                          </div>
                          <TextControl
                            label="Secondary Text"
                            value={slide.secondaryHeading.text}
                            onChange={(text) => dispatch(updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, text } }))}
                          />
                          <RangeControl
                            width="50%"
                            label="Mobile Secondary Text Size"
                            value={slide.secondaryHeading.sizes[0]}
                            onChange={(size) => dispatch(updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, sizes: [size || 20, slide.secondaryHeading.sizes[1]] } }))}
                            min={12}
                            max={120}
                          />
                          <RangeControl
                            width="50%"
                            label="Desktop Secondary Text Size"
                            value={slide.secondaryHeading.sizes[1]}
                            onChange={(size) => dispatch(updateSlide(index, { secondaryHeading: { ...slide.secondaryHeading, sizes: [slide.secondaryHeading.sizes[0], size || 20] } }))}
                            min={12}
                            max={120}
                          />

                          <RangeControl
                            label="Gap after Secondary Text (px)"
                            value={slide.gapSecondaryButton || 5}
                            onChange={(value) => dispatch(updateSlide(index, { gapSecondaryButton: value }))}
                            min={0}
                            max={100}
                          />

                        </PanelBody>
                        <div>

                        </div>
                        {slide.buttons && slide.buttons.map((button, btnIndex) => (
                          <PanelBody title={`Button ${btnIndex + 1}`} key={btnIndex} initialOpen={false}>
                            <TextControl
                              label="Button Text"
                              value={button.text}
                              onChange={(text) => dispatch(updateButton(index, btnIndex, { text }))}
                            />
                            <WURLInput
                              value={button.link}
                              onChange={(newLink) => dispatch(updateButton(index, btnIndex, { link: newLink }))}
                              autoFocus
                            />

                            <SelectControl
                              label="Button Style"
                              value={button.style}
                              options={[{ label: 'Fill', value: 'fill' }, { label: 'Outline', value: 'outline' }]}
                              onChange={(style) => dispatch(updateButton(index, btnIndex, { style }))}
                            />
                            <Button isDestructive onClick={() => dispatch(removeButton(index, btnIndex))}>
                              Remove Button
                            </Button>
                          </PanelBody>
                        ))}

                      </div>
                      <Button isSecondary onClick={() => dispatch(addButton(index))}>Add Button</Button>
                    </PanelBody>
                  ))}
                </div>
              )}
            </>
          )}
        </TabPanel>
      </InspectorControls>

      <div className="wnslide relative">
        <div className="wnslide__viewport" ref={emblaRef}>
          <div className={clsx("wnslide__container")}>
            {slides.map((slide, index) => (
              <div key={index} className={clsx("wnslide__slide", usePosition(slide.alignment))} style={{
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
                    style={{ "--primaryDeskTextSize": `${slide.heading.sizes[1]}px`, "--primaryMobTextSize": `${slide.heading.sizes[0]}px`, color: slide.heading.color, marginBottom: `${slide.gapPrimarySecondary}px` } as React.CSSProperties}
                  />
                  {slide.secondaryHeading.text && <RichText.Content
                    className="wnslide__secondary__text"
                    tagName={slide.secondaryHeading.tag}
                    value={slide.secondaryHeading.text}
                    style={{ "--secondaryDeskTextSize": `${slide.secondaryHeading.sizes[1]}px`, "--secondaryMobTextSize": `${slide.secondaryHeading.sizes[0]}px`, color: slide.secondaryHeading.color, marginBottom: `${slide.gapSecondaryButton}px` } as React.CSSProperties}
                  />}
                  {slide.buttons &&
                    <div className="is-layout-flex wp-block-buttons-is-layout-flex">
                      {slide.buttons.map((button, btnIndex) => (
                        <div className="wp-block-button">
                          <a key={btnIndex} href={button.link} className={`button wp-block-button__link embla-btn ${button.style}`}>
                            {button.text}
                          </a>
                        </div>
                      ))}
                    </div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
