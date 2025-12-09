// ...existing code...
import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';
import type { Theme } from './theme';
import { GlobalStyles } from './global';

// Kontext drží aktuální (sloučené) téma
const ThemeContext = createContext<Theme>(defaultTheme);

interface ThemeProviderProps {
  // umožnit předat jen částečné přepsání
  theme?: Partial<Theme>;
  children: React.ReactNode;
}

// jednoduché (kontrolované) sloučení - zachová nested objekty jako colors/typography/...
function mergeThemes(base: Theme, patch?: Partial<Theme>): Theme {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    colors: { ...base.colors, ...(patch.colors || {}) },
    fonts: { ...base.fonts, ...(patch.fonts || {}) },
    spacing: { ...base.spacing, ...(patch.spacing || {}) },
    typography: { ...base.typography, ...(patch.typography || {}) },
  } as Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme: themePatch, children }) => {
  const mergedTheme = mergeThemes(defaultTheme, themePatch);

  return (
    // provider pro useTheme hook
    <ThemeContext.Provider value={mergedTheme}>
      <StyledThemeProvider theme={mergedTheme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook pro přístup k aktuálnímu (sloučenému) tématu
export const useTheme = (): Theme => {
  return useContext(ThemeContext);
};