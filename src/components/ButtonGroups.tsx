import React from "react";
import { Button, Flex } from "@wordpress/components";

type IconToggleGroupProps = {
  options: { value: string; icon?: JSX.Element ; text?: string }[];
  value: string;
  onChange: (value: string) => void;
};

const ButtonGroup = ({ options, value = "ThinChevron", onChange }: IconToggleGroupProps) => {
  return (
    <Flex>
      {options.map((option) => (
        <button
          className={`flex items-center justify-center border-theme-primary text-sm cursor-pointer ${value === option.value ? "bg-theme-primary outline-theme-primary text-white outline-offset-2" : "text-theme-primary bg-transparent"}`}
          key={option.value}
          onClick={() => onChange(option.value)}
        >
          {option.icon}
          {option.text}
        </button>
      ))}
    </Flex>
  );
};

export default ButtonGroup;
