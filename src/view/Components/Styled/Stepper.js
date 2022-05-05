import React, { useState, useEffect, useRef } from 'react'
import styled, {css} from 'styled-components'


const Stepper = props => {

    const { intial, 
        onIncrement, 
        onDecrement, 
        showInfinite,
        onChange,
        value,
        suffix
    } = props
    const max = props.max || 999999
    const min = props.min || 0
    const step = props.step || 1;

    const [count, setCount] = useState(intial||0);
    const counterEl = useRef(null)
    useEffect(()=> {
        console.log('Stepper');
    },[])
    const handleIncrement = () => {
        if (onIncrement) {
            onIncrement()
        }
        else {
            if (count == '∞') {
                setCount(0 + step)
            }
            else if(count < max) {
               
                setCount(count + step)
               
            }          
            
        }       
        
    }
    const handleDecrement = () => {        
        if (onDecrement) {
            onDecrement()
        }
        else {
             if(count > min) {
                 setCount(count - step)
                 console.log(count);
            }
            else if(showInfinite) {
                 setCount('∞')
            }
        }        
    }
    const handleChange = (val) => {
     
        if(onChange) {
            onChange()
        }
        else {
            console.log(typeof val)
            if (!isNaN(val) ) {
                setCount(val)
            }
        }
    }
    const handleMouseDown = () => {

    }
    return (
        <FormRow>
            {props.label && 
                 <label>{props.label} :</label>
            }
           
            <SpinnerContainer styles={props.style} suffix={suffix}>
               
                <SpinnerInput autoFocus
                    type="text"
                    min={min || 0}
                    max={max || 999999 }
                    step={step || 1}
                    ref={counterEl}                     
                    value={value || count}                    
                    onChange={(e) => handleChange(e.target.value)}
                    prefix="$"
                />
                <Controls>
                    <ControlButton type="button" 
                    spinner-button="up" 
                    title="add 1"
                    onClick={handleIncrement}
                    onMouseDown={handleMouseDown}
                    >+</ControlButton>
                    <ControlButton type="button" 
                    spinner-button="down" 
                    title="subtract 1"
                    onClick={handleDecrement}
                    >-</ControlButton>
                </Controls>
            </SpinnerContainer>
        </FormRow>
    
    )
}
const Container = styled.div`
    display:flex;
    margin: 1%;
    position: relative;     
    width: ${props => props.styles ? props.styles.width : '36%' };
`
const FormRow = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: .5em;
   >label {
         padding: .5em 1em .5em 0;
         font-size: 0.85em;       
    }
    
`
const SpinnerContainer = styled.div` 
  display:flex;
  width: 100%;
  position: relative;
  flex: 1;
  align-items: center;  
  ${props => props.suffix  && css`
    &::after {

        content: '${props.suffix}';
        position: absolute;
        font-size: 0.85em;
        right: 4.5em;
        transition: all .05s ease-in-out;
    }
    `}
`
const SpinnerInput = styled.input`
   flex: 3.6;
   width: 100%; 
   padding: 1em 4em 0.8em 1em;
   -moz-appearance: textfield;
   &:focus {
        border-color: #3f51b5;
        border-width: 2px;
        border-style: solid;
        outline: none;
        box-shadow: 0px 0px 1px #0000004d;
    }
    
`
const Controls = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex; 
  flex-direction: column;
  width: 3em;  
`
const ControlButton = styled.button`
  --fluent1: #ddd;
  --fluent2: #b7b7b7;
  --fluent3: #eee;
  --fluent4: #e1e1e1;
  --shadow1: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  --shadow2: inset 0 3px 5px rgb(0 0 0 / 51%);
    flex: 1;
    width: 100%;
    background: var(--fluent3);
    box-shadow: var(--shadow1);
    border: 1px solid #999999;
    transition: 0.2s linear;
    position: relative;
    outline:none;
    &:nth-child(1) {
         
        margin-bottom: -1px;
    }
    &:focus{
        background-color: var(--fluent2);
    }
    &:hover {
        outline: none;
        border-color: black;
        background-color: var(--fluent4);
        color: #333;
        position: relative;
        z-index: 1;
    }
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-shadow: var(--shadow2);
        opacity: 0;
        transition: opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    &:active:after {
        opacity: 1;
    }
    
`
export default Stepper