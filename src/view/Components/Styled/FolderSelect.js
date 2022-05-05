import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes  from 'prop-types'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

 
import FolderIcon from '../../images/folder_16px.svg'

const FolderSelect = props => {
   
    const { onChange, value, label, helpertext, width, folderbuttonClick, labelWidth, labelAlign, textAlign, fieldWidth} = props    
    const [folderHovered, setHovered] = useState(false)
    const toggleHover = () => {
        setHovered(!folderHovered)
    }
   
    return (     
        <FieldGroup   width={width}  fieldWidth={fieldWidth}  labelAlign={labelAlign} textAlign={textAlign}   labelWidth={labelWidth}>
            {label &&
             <label className="label">{label}</label>
            }
           
            <div className="field">
                <StyledField
                    type="text"
                    fullWidth                    
                    value= {value}
                    onChange= {onChange}
                    startAdornment={
                        <FolderButton position="start"
                            onClick={folderbuttonClick}
                        >
                            <FolderIcon
                                onMouseEnter={toggleHover}
                                onMouseLeave={toggleHover}
                                fill={folderHovered ? '#00a65a' : '#333'} />

                        </FolderButton>}


                />
                {helpertext && <FormHelperText>{helpertext}</FormHelperText> }
                
            </div>
        </FieldGroup>
 
    )
}

const FieldGroup = styled.div`
    display: flex; 
    flex-direction: row;
    margin: 0 0 10px 0; 
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    align-items: center; 
    width:  ${props => props.width ? props.width : '100%'}; 
    & >  label {        
        font-size: 0.9568em;       
        text-align:  ${props => props.textAlign ? props.textAlign : 'left'};
        margin: 0 11px 0 0;
        padding: 2px 0;        
        width: ${props => props.labelWidth ? props.labelWidth : '150px'};            
        justify-content: ${props => props.labelAlign === 'right' ? 'flex-end' : props.labelAlign === 'left' ? 'flex-start' : ''};
        
        
    }    
    & .field {             
        flex: 0 0 auto;
        width:  100%
    }
     & .field >  :first-child {
        justify-content: flex-start !important;
    }
     
 
   
`
const StyledField = styled(OutlinedInput)`
        margin: 0 auto;        
        & .MuiOutlinedInput-input {
            padding: 10px 6px;
        }       
`
const FolderButton = styled(InputAdornment)`
    cursor: pointer;
    &:hover {
        background: #595959;
    }
`
 
FolderSelect.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    inputClassName: PropTypes.string,
    inputRef: PropTypes.func,
    inputStyle: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    folderbuttonClick: PropTypes.func,               // onChange handler: function(event) {}
    placeholder: PropTypes.string,
    style: PropTypes.object,                   // css styles for the outer element
    value: PropTypes.any.isRequired,


}
export default FolderSelect