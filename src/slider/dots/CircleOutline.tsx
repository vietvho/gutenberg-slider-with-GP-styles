import React from "react";
import { Circle, SVG } from "@wordpress/components";
export default function CircleOutline(){
  return (
    <SVG width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="2" />
    </SVG>
    
  )
}
