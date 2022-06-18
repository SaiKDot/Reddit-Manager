import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
// import Icon from './Icon'  
import Back_ from  '../../images/back_arrow.svg'

 
const Header = (props) => {
  //  const dispatch = useDispatch()
  const handleClick = (id) => {
      console.log(id)
   }  
 
  function clickHandle(e) {
 
  }
  return (
    <Head>
        <BackButton/>
    </Head>
  )
}

const BackButton = ({disabled =  false, img}) => {
 return (
   <IconContainer
    right = {true}
   >
     <IconContent>
       <Back_ />
     </IconContent>
   </IconContainer>
 )
}
const StyledIcon = ({img}) => {
  
   return (
     <IconContainer        
       onClick={() => {
         console.log('button clicked')
       }}
     >
       <IconContent>
         {disabled == false ? img : img_D}

         <IconText disabled={disabled}>{text}</IconText>
       </IconContent>
     </IconContainer>
   )
} 
const Head = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  box-shadow: 0px 0px 9px 3px rgba(41, 41, 41, 0.25);
  background-color: #fff;
  box-shadow: 0 2px 6px rgb(0 0 0 / 23%);
  position: relative;
  z-index: 10;
`
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #d6d6d6;
  }
  margin-left: auto;

  user-select: none;
`
const IconContent = styled.div`
  height: 75%;
  width: 100%;
  vertical-align: middle;
  display: flex;
  align-items: center;
  & svg {
    width: 20px;
    height: 20px;
  }
  flex-direction: column;
  & svg {
    width: 20px;
    height: 20px;
  }
`
// const Icon = styled.a`
//   width: 40px;
//   height: 40px;
  
//   justify-content: center;

//   display: flex;
  
//   align-items: center;
//   cursor: pointer;
 
//   &:hover {
//     background-color: ${({ theme }) => theme.link_color_hover2};
//     color: ${({ theme }) => theme.link_color_active};
//   }  
// `
const IconText = styled.span`
  text-align: center;
  font-size: 12px;
  color: ${(props) => (props.disabled ? '#555' : '#333')};
  font-weight: 600;
`
const Pulsar = styled.div`
  display: block;
  position: absolute;
  background-image: radial-gradient(
    ellipse closest-side at center,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  border-radius: 100%;
  transform: scale(0);
  pointer-events: none;
  z-index: 3;
  ${({animateshow}) => animateshow == true && css`
      transform: rotateY(0deg);
      opacity: 1;
  `}
`
const MenuUnderline = styled.div`
  background-color: #000;
  position: absolute;
  height: 3px;
  left: 0;
  bottom: 0;
`
export default Header
