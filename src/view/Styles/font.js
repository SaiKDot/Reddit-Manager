import { createGlobalStyle } from 'styled-components'
import FontAwesome from './fonts/fontawesome-webfont.woff'
export default createGlobalStyle`
    @font-face {
       font-family: 'FontAwesome';
        src: url(${FontAwesome});
        font-display: block;
        
    }
`
  