import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Icon from './Icon'  

 
const Header = (props) => {
  //  const dispatch = useDispatch()
  const handleClick = (id) => {
      console.log(id)
   }  
 
  function clickHandle(e) {
      var node = e.currentTarget      
       var x = $(node)
      $(underlineRef.current).stop().animate({
        'width': x.width(),
        'left' : x.position().left
     }, 200);
  }
  return (
    <Head>
     
    </Head>
  )
}

const HeaderIcon  = ({item}) => {
    return (
     <IconContainer  >
       <IconContent>
         {item.disabled == false ? <Icon type={item.image} /> : <Icon type={item.image_disabled} />}

         <IconText disabled={item.disabled}>{item.text}</IconText>
       </IconContent>
     </IconContainer>
   )
}

const AddTask = ( {disabled,  ...props }) => {
  
  const dispatch = useDispatch()
  return (
    <IconContainer
      {...props}
    
      onClick={() => dispatch(toggleTaskModal())}
    >
      <IconContent>
        {disabled == false ? <Icon type={'Add'} /> : ''}
        {/* {item.disabled == false ? <Icon type={'Add'} /> : <Icon type={item.image_disabled} />} */}

        <IconText disabled={disabled}>Add Url</IconText>
      </IconContent>
    </IconContainer>
  )
}
const ResumeButton = ({disabled ,...props}) => {
  
   return (
    <IconContainer {...props}>
       
      <IconContent>
        {disabled == false ? <Icon type={'Resume'} /> : <Icon type={'Resume_D'} />}       

        <IconText disabled={disabled}>Resume</IconText>
      </IconContent>
    </IconContainer>
  )
}

const StopButton = ({ disabled, ...props }) => {
  return (
    <IconContainer {...props}>
      
      <IconContent>
        {disabled == false ? <Icon type={'Stop_D'} /> : <Icon type={'Stop'} />}

        <IconText disabled={disabled}>Stop</IconText>
      </IconContent>
    </IconContainer>
  )
}
const CancelButton = ({disabled ,...props}) => {
    return (
      <IconContainer {...props}>
          
        <IconContent>
          {disabled == false ? <Icon type={'Cancel'} /> : <Icon type={'Cancel_D'} />}

          <IconText disabled={disabled}>Stop</IconText>
        </IconContent>
      </IconContainer>
    )
}
const DeleteButton = ({disabled,...props}) => {
    return (
      <IconContainer {...props}>
         
        <IconContent>
          {disabled == false ? <Icon type={'Delete'} /> : <Icon type={'Delete_D'} />}

          <IconText disabled={disabled}>Stop</IconText>
        </IconContent>
      </IconContainer>
    )
}

const DeleteAll = ({disabled,...props}) => {
     return (
      <IconContainer {...props}>
          
        <IconContent>
          {disabled == false ? <Icon type={'DeleteAll'} /> : <Icon type={'DeleteAll_D'} />}

          <IconText disabled={disabled}>Stop</IconText>
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

const StyledIcon = ({disabled,img,img_D,text,id}) => {
  
   return (
     <IconContainer
       disabled={disabled}
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
