export type TypographyVariant = {
  fontSize: string;
  fontWeight: number;
};

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    light: string;
    background: string;
    text: string;
    surface?: string;
    buttonText?: string;
    buttonColor?: string;
    inputBorder?: string;
    hover?: string;
    textDisabled?: string;
    error?: string;
  };
  fonts: {
    main: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    boxShadow?: string;
    boxShadowHover?: string;
  };
  typography: Record<string, TypographyVariant>;
};

export const defaultTheme: Theme = {
  colors: {
    primary: '#202020',//dark grey
    secondary: '#DCCCFF', //perwinkle
    light: '#838383ff', //light grey
    background: '#F6F2FF',//magnolia
    text: '#202020', //dark grey
    surface: '#F6F2FF', //magnolia
    buttonText: '#F6F2FF', //magnolia
    hover: 'rgba(0, 0, 0, 0.04)',
    textDisabled: 'rgba(0, 0, 0, 0.4)',
    inputBorder: '#A08AF5',
    error: '#E63946',
  },
  fonts: {
    main: 'Poppins',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  shadows: {
    sm: '4px 4px 8px #d9d9d9, -4px -4px 8px #ffffff',
    md: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
    lg: '12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff',
    boxShadow:
      'none ', /*0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(255, 255, 255, 0.25) */
    boxShadowHover:
      '0px 4px 4px rgba(255, 255, 255, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  typography: {
    h1: { fontSize: '48px', fontWeight: 600 },
    h2: { fontSize: '36px', fontWeight: 600 },
    h3: { fontSize: '28px', fontWeight: 600 },
    textExtraLarge: { fontSize: '32px', fontWeight: 600 },
    textLarge: { fontSize: '20px', fontWeight: 600 },
    textSmall: { fontSize: '16px', fontWeight: 400 },
    extraSmall: { fontSize: '12px', fontWeight: 400 },
    pageFooter: { fontSize: '15px', fontWeight: 400 },
    titlePageFooter: { fontSize: '28px', fontWeight: 600 },
  },
};

export const lightTheme = defaultTheme;

export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#F6F2FF',
    secondary: '#DCCCFF',
    light: '#A3A3A3ff',
    background: '#202020',
    surface: '#202020',
    text: '#F6F2FF',
    buttonText: '#202020',
    hover: 'rgba(255, 255, 255, 0.08)',
    textDisabled: 'rgba(255, 255, 255, 0.5)',
  },
  shadows: {
    sm: '4px 4px 8px #1c1c1c, -4px -4px 8px #242424',
    md: '8px 8px 16px #1c1c1c, -8px -8px 16px #242424',
    lg: '12px 12px 24px #1c1c1c, -12px -12px 24px #242424',
    boxShadow: 'none'/*8px 8px 16px #1c1c1c, -8px -8px 16px #242424 */,
  },
};