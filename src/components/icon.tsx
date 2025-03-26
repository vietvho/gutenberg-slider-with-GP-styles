import ThinChevron from "../slider/arrows/thinChevron";
import MediumChevron from "../slider/arrows/mediumChevron";
import ThinArrow from "../slider/arrows/thinArrow";
import MediumArrow from "../slider/arrows/mediumArrow";
import ThinTriangle from "../slider/arrows/thinTriangle";
import MediumTriangle from "../slider/arrows/mediumTriangle";
import React, { ReactElement } from "react";

const Icons: Record<string, ReactElement> = {
  ThinChevron: <ThinChevron/>,
  Chevron: <MediumChevron/>,
  ThinArrow: <ThinArrow/>,
  Arrow: <MediumArrow/>,
  ThinTriangle: <ThinTriangle/>,
  Triangle: <MediumTriangle/>
};

export const Icon = ({ name, ...props }: { name: keyof typeof Icons } & {className?:string}) => {
  const Component = Icons[name];
  return Component ? Component : null; 
};