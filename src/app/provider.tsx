"use client";

import { OverlayProvider } from "overlay-kit";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Provider({ children }: Props) {
  return <OverlayProvider>{children}</OverlayProvider>;
}
