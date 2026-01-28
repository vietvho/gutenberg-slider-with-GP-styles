import { SLIDE, BUTTON, ATTR } from '../type';
import * as types from './types';

export interface Action {
    type: string;
    [key: string]: any;
}

export const addSlide = (slide: SLIDE) => ({
    type: types.ADD_SLIDE,
    slide,
});

export const updateSlide = (index: number, slide: Partial<SLIDE>) => ({
    type: types.UPDATE_SLIDE,
    index,
    slide,
});

export const addButton = (slideIndex: number) => ({
    type: types.ADD_BUTTON,
    slideIndex,
});

export const updateButton = (slideIndex: number, buttonIndex: number, button: Partial<BUTTON>) => ({
    type: types.UPDATE_BUTTON,
    slideIndex,
    buttonIndex,
    button,
});

export const removeButton = (slideIndex: number, buttonIndex: number) => ({
    type: types.REMOVE_BUTTON,
    slideIndex,
    buttonIndex,
});

export const updateAttributes = (attributes: Partial<ATTR>) => ({
    type: types.SET_ATTRIBUTES,
    attributes,
});
