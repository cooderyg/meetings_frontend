"use client";

import { OverlayProvider } from "overlay-kit";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Provider({ children }: Props) {
  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
    <OverlayProvider>{children}</OverlayProvider>
    // </ThemeProvider>
  );
}
