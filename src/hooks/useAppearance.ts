import type { ShaderGradientBgProps } from "@/components/ShaderGradientBg";
import { Theme } from "@radix-ui/themes";
import { type ComponentProps, useState } from "react";

interface ThemeConfig {
  bgGradient: ShaderGradientBgProps["color"];
  appearance: "dark" | "light";
  accentColor: ComponentProps<typeof Theme>["accentColor"];
}

type Themes = {
  [key in ShaderGradientBgProps["color"]]: ThemeConfig;
};
const themes: Themes = {
  aurora: {
    bgGradient: "aurora",
    appearance: "dark",
    accentColor: "indigo",
  },
  red: {
    bgGradient: "red",
    appearance: "dark",
    accentColor: "crimson",
  },
  green: {
    bgGradient: "green",
    appearance: "dark",
    accentColor: "grass",
  },
};

const themesList = Object.keys(themes) as ShaderGradientBgProps["color"][];

const LOCALSTORAGE_KEY = "LC_theme";

const initializeSelectedTheme = () => {
  const selectedTheme = localStorage.getItem(
    LOCALSTORAGE_KEY
  ) as ShaderGradientBgProps["color"];
  return selectedTheme && Object.keys(themes).includes(selectedTheme)
    ? selectedTheme
    : "aurora";
};

const useAppearance = () => {
  const [selectedTheme, setSelectedTheme] = useState<
    ShaderGradientBgProps["color"]
  >(initializeSelectedTheme);

  const updatedSelectedTheme = (theme: ShaderGradientBgProps["color"]) => {
    const hasTheme = Object.keys(themes).includes(theme);
    if (!hasTheme) return;

    localStorage.setItem(LOCALSTORAGE_KEY, theme);
    setSelectedTheme(theme);
  };

  return {
    selectedTheme,
    updatedSelectedTheme,
    themesList,
    config: themes[selectedTheme],
  };
};

export { useAppearance };
export type { ThemeConfig };
