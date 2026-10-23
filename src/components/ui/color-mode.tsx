
import { IconButton, useColorMode } from "@chakra-ui/react";
import { LuSun, LuMoon } from "react-icons/lu";

export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDark = colorMode === "dark";

  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      variant="ghost"
      icon={isDark ? <LuSun /> : <LuMoon />}
    />
  );
}
