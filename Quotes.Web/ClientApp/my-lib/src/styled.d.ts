import 'styled-components';
import { defaultTheme } from './styles/theme';

// Rozšíření typu pro defaultní téma ve styled-components
declare module 'styled-components' {
  type Theme = typeof defaultTheme;
  export interface DefaultTheme extends Theme {}
}