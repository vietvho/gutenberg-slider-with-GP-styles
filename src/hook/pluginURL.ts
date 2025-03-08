import { useMemo } from "react";

export const usePluginUrl = () => {
  return useMemo(() => window.emblaSliderData?.pluginUrl || '', []);
};
