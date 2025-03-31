import React from "react";
import { Rect, SVG } from "@wordpress/components";
export default function RectangleFill(){
  return (
    <SVG width="20" height="10" viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
      <Rect x="0" y="0" width="20" height="10" fill="currentColor" />
    </SVG>
  )
}
