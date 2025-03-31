import React from "react";
import { Button, Flex } from "@wordpress/components";
import clsx from "clsx";

type IconToggleGroupProps = {
  options: { value: string; icon?: JSX.Element ; text?: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const ButtonGroup = ({ options, value = "ThinChevron", onChange, className }: IconToggleGroupProps) => {
  return (
    <Flex className={clsx("!justify-start", className)}>
      {options.map((option) => (
        <button
          className={`flex items-center justify-center border-theme-primary text-sm cursor-pointer min-h-7 ${value === option.value ? "bg-theme-primary outline-theme-primary text-white outline-offset-2" : "text-theme-primary bg-transparent"}`}
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
