import React,  {Children}from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'

export const StyledTextArea = props => {
  return   <Field1 {...props} />
}

export const StyledTextInput = props => {
  return   <Field2 {...props} />
}

export const StyledOutlineField = props => {
  return <Field3 {...props} />
  
}
//  {children && Children.map(children, child => {
//                     if (child.type === 'label') return child
//             })}
export const FieldGroup = (props) => {   
    const {children,width, labelWidth, labelAlign, fieldWidth } = props
    let label, fields = []

        Children.forEach(children, (child, i) => {
                if (child.type === 'label') {
                    label = child
                } else {
                    fields.push(child)
                }
        });
      
    return  (
        <Field4 width={width} labelWidth={labelWidth} align={labelAlign} fieldWidth = {fieldWidth}>
            {label &&  label  }
             { fields &&  
               <div className="field">
                    {fields}
                </div> }
           
            
            
        </Field4>
               
                  

            
       
    )
}

const Field4 = styled.div`
    display: flex; 
    flex-direction: row;
    margin: 0 0 3px 0; 
    padding: 0.2em;
    align-items: center; 
    width:  ${props => props.width ? props.width : '100%'}; 
    & >  label {        
        font-size: 0.9568em;       
        text-align: right; 
        margin: 0 11px 0 0;
        padding: 2px 0;        
        width: ${props => props.labelWidth ? props.labelWidth : '150px'};      
        justify-content: ${props => props.align === 'right' ? 'flex-end' : props.align === 'left' ? 'flex-start' : ''};
        
        
    }    
    & .field {             
        flex: 0 0 auto;  
        width: ${props => props.fieldWidth ? props.fieldWidth : 'auto'}
    }
     & .field >  :first-child {
        justify-content: flex-start !important;
    }
     
  
   
`
const Field3 = styled(OutlinedInput)`
        margin: 0 auto;        
        & .MuiOutlinedInput-input {
            padding: 10px 6px;
        }       
`

const Field2 = styled(TextField)`        
        margin: 0 auto;         
        border-radius: 4px;      
        & .MuiOutlinedInput-input {
            padding: 10px 6px;
        }        
`

const Field1 = styled(TextField)`
        width: 100%;
        margin: 0 auto;
        & .MuiOutlinedInput-multiline {
            padding: 10px 6px;
        }
        & .MuiFormHelperText-root {
            color: #3F51B5;
        }      

`

 