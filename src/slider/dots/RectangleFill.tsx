import React from "react";
import { Rect, SVG } from "@wordpress/components";
export default function RectangleFill(){
  return (
    <SVG width="20" height="5" viewBox="0 0 20 5" xmlns="http://www.w3.org/2000/svg">
      <Rect x="0" y="0" width="20" height="5" fill="currentColor" />
    </SVG>
  )
}
