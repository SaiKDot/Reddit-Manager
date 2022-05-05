import React, { useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
// import { switchOn, switchOff} from './Animations'
const CheckBox = (props) => {
   
    
    const value  =   props.value ? props.value : '';  
    const {
        checked,
        borderColor,
        borderRadius,
        borderStyle,
        borderWidth,
        checkbox,
        className,       
        containerClassName,
        containerStyle,
        label,
        labelClassName,
        labelStyle,
        name,
        onChange,
        reference,
        right,
        size,
        style,       
        icon,
    } = props;
    const [check, setCheck] = useState(checked);


    const toggle = (e) => {        
        e.preventDefault()     
        setCheck(!check)
        onChange && onChange(!check)
    };

    // useEffect(() => {
    //     console.log('checkbox')
    // }, []);

    useEffect(() => {
        setCheck(checked)
    }, [checked]);

    
    return (
       
            <CheckBoxWrapper
                
            >
            
                <CheckBoxInput 
                ref={reference}
                id={props.id || 'custom-check-box-ad3'} 
                type='checkbox'
                checked={check}
                onChange={toggle}
                value={value}
                
                />
            {(right && label && (
                <LabelSpan className={labelClassName} style={labelStyle}>
                    {label}
              </LabelSpan>
            )) ||
                null}
                <CheckBoxLabel 
                onClick={e => toggle(e)}
                htmlFor={props.id || 'custom-check-box-ad3'}
               
                />                   
                 
           
                
            {(!right && label && (
              <LabelSpan className={labelClassName}  >
                    {label}
              </LabelSpan>
            )) ||
                null}
            </CheckBoxWrapper>
        
    );
};

const switchOn = keyframes`
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
const switchOff = keyframes`
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
const slideFromRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`

const CheckBoxWrapper = styled.div`
    flex-flow: row wrap;
    align-items: center;
    margin: 7px 0px;   
    align-content: flex-start;
    align-items: center;
    display: inline-flex;
`;
const Ball = styled.div`
    border-radius: 50%;     
    width: 18px;
    height: 18px;
    margin: 3px 2px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0,0,0,0.2);
    align-items: center;
    justify-content: center;    
    animation-name: ${switchOff};
    animation-duration: 0.2s;     
    animation-timing-function: linear;
    animation-fill-mode: forwards;
`;
const LabelSpan = styled.span`
    flex-shrink: 0;
    display: inline-flex;
    font-size: 0.85em;
`
const CheckBoxLabel = styled.label`
    background-color: #d0d0d0;
    border-radius: 50px;
    cursor: pointer;
    display: inline-flex;
    margin: 0 10px 0;
    width: 42px;
    height: 26px;
    flex-shrink: 0;   
    &::after {
        position:absolute;
        content: "";
        border-radius: 50%;     
        width: 18px;
        height: 18px;
        margin: 3px 0px;
        background: #ffffff;
        box-shadow: 1px 3px 3px 1px rgba(0,0,0,0.2);
        align-items: center;
        justify-content: center;
        animation-name: ${switchOff};
            animation-duration: 0.2s;     
            animation-timing-function: linear;
            animation-fill-mode: forwards;
             
    }
  
`;
const CheckBoxInput = styled.input`
  opacity: 0;
  z-index: -1; 
  display: none; 
  transition: all 0.2s linear;
  &:checked ~ ${CheckBoxLabel} {
    background: #00a65a;
    &::after {
            animation-name: ${switchOn};
            animation-duration: 0.2s;     
            animation-timing-function: linear;
            animation-fill-mode: forwards;            
    }
  }
  
`;

CheckBox.defaultProps = {
  checked: false,
  
}

 
CheckBox.propType = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
}

 

export default CheckBox;