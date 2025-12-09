import { createGlobalStyle } from 'styled-components';
import PoppinsRegular from '../assets/fonts/Poppins-Regular.ttf';
import PoppinsSemiBold from '../assets/fonts/Poppins-SemiBold.ttf';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsSemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  /* Přidejte další @font-face pravidla pro jiné váhy a styly (bold, italic, atd.) podle potřeby */
`;