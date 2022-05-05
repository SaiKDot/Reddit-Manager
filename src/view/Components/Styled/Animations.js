import { keyframes } from 'styled-components'
export const switchOn = keyframes`
  0% {
    transform: translateX(0) scale(1);
  }
  50% {
    transform: translateX(11px) scale(1.2);
  }
  100% {
    transform: translateX(22px) scale(1);
  }
`;
export const switchOff = keyframes`
  0% {
    transform: translateX(22px) scale(1);
  }
  50% {
    transform: translateX(11px) scale(1.2);
  }
  100% {
    transform: translateX(0) scale(1);
  }
`
export const slideFromRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`

export const FlipInHorizontal = keyframes`
  0% {
     transform: rotateY(-70deg);
     opacity: 0;
  }
  50% {
    transform: rotateY(-35deg);
    opacity: 0.75;
  }
  100% {
    transform: rotateY(0deg);
    opacity: 1
  }
`;
export const FlipOutHorizontal = keyframes`
 to {
    -webkit - transform: rotate3d(0, 0, 1, 180deg) scale3d(0.3, 0.3, 0.3);
    transform: rotate3d(0, 0, 1, 180deg) scale3d(0.3, 0.3, 0.3);
  }
`;
export const FadeIn = keyframes`
  0% { 
    opacity: 0;
    display:none 
  }
  25% {
     opacity:0.25; 
     display: block;
  }
  50% {
    opacity: 0.5; 
    display: block;
  }
  100% { 
    opacity: 1; 
    display:block
   }
`;
export const FadeOut = keyframes`
 0% {    
    opacity: 1 
    display:block
  }
  25% {
     opacity: 0.5; 
   
     display: block;
  }
  50% {
     opacity: 0.25; 
    display: block;
  }
  100% { 
    opacity: 0;
    display:none 
  }

`

 const Pulsing = keyframes`
 100% {
    opacity: 0;
    transform: scale(2.5);
  }
`
 



 