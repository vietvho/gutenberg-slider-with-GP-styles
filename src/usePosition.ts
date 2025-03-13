import { AlignmentProps } from "./type";
export default function usePosition(position : AlignmentProps) {
  const positionMap = {
    center: "items-center justify-center",
    "top left": "items-start justify-start",
    "top center": "items-start justify-center text-center",
    "top right": "items-start justify-end text-right",
    "center left": "items-center justify-start",
    "center center": "items-center justify-center text-center",
    "center right": "items-center justify-end text-right",
    "bottom left": "items-end justify-start",
    "bottom center": "items-end justify-center text-center",
    "bottom right": "items-end justify-end text-right",
  };
  return positionMap[position];
}