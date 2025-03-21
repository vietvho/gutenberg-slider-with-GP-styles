import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import Save from './save';
import {  ATTR, blockAttributes } from './type';
registerBlockType("custom/embla-slider", {
  title: "Embla Slider", 
  category: "media",
  attributes: blockAttributes as BlockConfiguration<ATTR>["attributes"] ,
  edit: Edit, 
  save: Save, 
});

