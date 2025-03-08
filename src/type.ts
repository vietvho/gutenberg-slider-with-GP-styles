declare global {
  interface Window {
    emblaSliderData?: {
      pluginUrl: string
    }
  }
}

export type BUTTON = {
  text: string,
  link: string,
  style: 'fill' | 'outline'
}
type Heading = {
  text: string;
  size: number;
  tag: keyof HTMLElementTagNameMap;
  color: string,
}

export type SLIDE = {
  background: string,
  heading: Heading,
  secondaryHeading: Heading,
  buttons: BUTTON[],
  accordionContent: 'Additional slide details...'
}

export const DEFAULT_BUTTON: BUTTON = {
  text: 'Learn More',
  link: '#',
  style: 'fill'
};

export const BASE_SLIDE: SLIDE = {
  background: '',
  heading: {
    text: 'Primary Text',
    size: 20,
    tag: 'h2',
    color: '#000'
  },
  secondaryHeading: {
    text: 'Secondary Text',
    size: 60,
    tag: 'h2',
    color: '#000'
  },
  buttons: [DEFAULT_BUTTON],
  accordionContent: 'Additional slide details...'
};

export const blockAttributes = {
  slides: {
    type: "array",
    default: [BASE_SLIDE],
  },
  showArrows: {
    type: "boolean",
    default: true,
  },
  sliderGap: {
    type: "number",
    default: 15
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

export type ATTR = {
  [K in keyof typeof blockAttributes]: (typeof blockAttributes[K]["default"]);
}; 

