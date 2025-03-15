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
  sizes: number[];
  tag: keyof HTMLElementTagNameMap;
  color: string,
}

export type AlignmentProps = "center" | "top left" | "top center" | "top right" | "center left" | "center center" | "center right" | "bottom left" | "bottom center" | "bottom right";

export type SLIDE = {
  alignment: AlignmentProps;
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
import BackgroundUrl from "../assets/placeholder.jpg";
export const BASE_SLIDE: SLIDE = {
  alignment: "bottom left",
  background: BackgroundUrl,
  heading: {
    text: 'Primary Text',
    sizes: [40,86],
    tag: 'h2',
    color: '#fff'
  },
  secondaryHeading: {
    text: 'Secondary Text',
    sizes: [16,16],
    tag: 'h2',
    color: '#fff'
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
  autoPlay: {
    type: "boolean",
    default: false,
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
    default: true,
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
    default: 68,
  },
};

export type ATTR = {
  [K in keyof typeof blockAttributes]: (typeof blockAttributes[K]["default"]);
}; 

