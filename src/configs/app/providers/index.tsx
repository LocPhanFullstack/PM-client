"use client";

import StoreProvider from "@/src/app/redux";
import { ThemeProvider } from "../../libs";
import { combineComponents } from "../../utils/components";

const _AppProvider = combineComponents([ThemeProvider, StoreProvider]);

export function AppProvider(props: { children: React.ReactNode }) {
  return (
    <_AppProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {props.children}
    </_AppProvider>
  );
}
