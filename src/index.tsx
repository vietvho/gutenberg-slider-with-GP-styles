import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
const blockAttributes = {
  slides: {
    type: "array",
    default: [],
  },
  showArrows: {
    type: "boolean",
    default: true,
  },
  arrowSVG: {
    type: "string",
    default: "",
  },
  dotSVG: {
    type: "string",
    default: "",
  },
  dotActiveSVG: {
    type: "string",
    default: "",
  },
  showDots: {
    type: "boolean",
    default: true,
  },
  overlay: {
    type: "boolean",
    default: false,
  },
  progressColor: {
    type: "string",
    default: "#ffffff",
  },
  slideWidthDesktop: {
    type: "number",
    default: 80,
  },
  slideWidthMobile: {
    type: "number",
    default: 100,
  },
  slideHeight: {
    type: "number",
    default: 50,
  },
};

export type  ATTR = {
  [K in keyof typeof blockAttributes]: (typeof blockAttributes[K]["default"]);
}; 

registerBlockType("custom/embla-slider", {
  title: "Embla Slider", 
  category: "media",
  attributes: blockAttributes as BlockConfiguration<ATTR>["attributes"] ,
  edit: Edit, 
  save: () => null, 
});

