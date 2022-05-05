import React, { useState, useEffect } from 'react' 
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled, {css} from 'styled-components'
import { FlipInHorizontal, FlipOutHorizontal} from './Animations'

const Modal = props => {

    const { open, onClose, onBackdropClick} = props;
    const [animateshow, setAnimate] = useState(false)
    const [show, setShow] = useState(false);
    useEffect(() => {
       
      
          if(open == true) {
              setShow(true)
              setTimeout(() => {
                  setAnimate(true)

              },275)
          }
         else  {
              
              setAnimate(false)
              setTimeout(() => {
                  setShow(false)

              },275)
              
         }

       
       

    }, [open]);
    useEffect(() => {


        if (open == true) {
            setAnimate(true)
        }




    }, []);


    const handleExit = (onClose, event, param) => {
       
        //  setAnimate(false)
        //  setTimeout(() => {             
        //      onClose(event, param)

        //  }, 
        //  350);
        onClose(event, param)
       
       
    }
    const handleKeyDown = (e) => {
       
        if (e.key !== 'Escape') {
            return;
        }
        if (onClose) {
            handleExit(onClose, event, 'escapeButton')
            
        }
    }
    const handleBackdropClick = (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }

        if (onBackdropClick) {
            onBackdropClick(event);
        }

        if (onClose) {
            
            handleExit(onClose, event,'backdropClick')
           
            
        }

        
        
       
    };
    if (!show) {
        return null;
    }

    return (
        
            <Container 
                onKeyDown={handleKeyDown}
            >
            <Backdrop onClick={handleBackdropClick}/>
            <Content animateshow={animateshow} width={props.width}>
                    {props.children}
            </Content>
            </Container>
         

    )
}

const Containers = styled.div`  
  display : flex;
  z-index: 9998; 
  cursor:pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;  
  height: 100vh;  
  overflow: auto;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
  perspective:1300px;
    
 
`;
const Container = styled.div`
  position: fixed;
  z-index: 1300;
  right: 0px;
  bottom: 0px;
  top: 0px;
  left: 0px;
  display : flex;    
  align-items: center;
  justify-content: center;
   perspective:1300px;
`
const Backdrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: -1;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;

`
const Content = styled.div`
    display : flex;
    background-color: #FFF;
    min-width:  500px;
    min-height: 200px;
    transform-style: preserve-3d;	 
	transform: rotateY(-70deg);	
	transition: all 0.275s;
	opacity: 0;
    ${props => props.animateshow == true && css`
       	transform: rotateY(0deg);
	    opacity: 1;
    `}
    width: ${props => props.width || ''}            
 
`;


Modal.propType = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func
}


export default Modal;

// return React.createElement(Modal)