import { ATTR, DEFAULT_BUTTON } from '../type';
import * as types from './types';
import { Action } from './actions';

export const reducer = (state: ATTR, action: Action): ATTR => {
    switch (action.type) {
        case types.ADD_SLIDE:
            return {
                ...state,
                slides: [...state.slides, action.slide],
            };
        case types.UPDATE_SLIDE:
            return {
                ...state,
                slides: state.slides.map((slide, i) =>
                    i === action.index ? { ...slide, ...action.slide } : slide
                ),
            };
        case types.ADD_BUTTON:
            return {
                ...state,
                slides: state.slides.map((slide, i) =>
                    i === action.slideIndex
                        ? { ...slide, buttons: [...slide.buttons, DEFAULT_BUTTON] }
                        : slide
                ),
            };
        case types.UPDATE_BUTTON:
            return {
                ...state,
                slides: state.slides.map((slide, i) => {
                    if (i === action.slideIndex) {
                        const updatedButtons = slide.buttons.map((button, j) =>
                            j === action.buttonIndex ? { ...button, ...action.button } : button
                        );
                        return { ...slide, buttons: updatedButtons };
                    }
                    return slide;
                }),
            };
        case types.REMOVE_BUTTON:
            return {
                ...state,
                slides: state.slides.map((slide, i) => {
                    if (i === action.slideIndex) {
                        const updatedButtons = slide.buttons.filter((_, j) => j !== action.buttonIndex);
                        return { ...slide, buttons: updatedButtons };
                    }
                    return slide;
                }),
            };
        case types.SET_ATTRIBUTES:
            return {
                ...state,
                ...action.attributes,
            };
        default:
            return state;
    }
};
