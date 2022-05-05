import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { Transition } from 'react-transition-group'
import Button from '@mui/material/Button'
import { StyledTextArea as UrlField } from '../Styled/StyledTextComponents'
import { StyledTextInput as RenameField } from '../Styled/StyledTextComponents'
import { StyledOutlineField } from '../Styled/StyledTextComponents'
import { FieldGroup } from '../Styled/StyledTextComponents'
import { FormRow, Label, FormControl } from '../Styled/Styled'
import ForderSelect from '../Styled/FolderSelect'
import Switch from '../Styled/CheckBox'
import NiftyModal from '../Styled/NiftyModal'
import MTButton from '../Styled/MTButton'
import Margin from '../Styled/Margin'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  toggleTaskModal,
  clearAdvancedInputs,
  getDirectory,
  refererChange,
  newNameInput,
  cookieChange,
  proxyChange,
  changeDirectory,
  dirInput,
  cancelTask,
} from   '../../Actions'

 
const NewTaskModal = props => {

    const show = useSelector((state) => state.ui.showTaskModal)
    const name = useSelector((state) => state.ui.name)
    const forms = useSelector((state) => state.forms.downloadTask)
    const [advanced, setAdvanced] = useState(false)
    const [folderHovered, setHovered] = useState(false)
    const toggleAdvanced = useCallback(() => setAdvanced(!advanced))
    const toggleHover = useCallback(() => setHovered(!folderHovered))
    const dispatch = useDispatch()

    // useEffect(() => {
    //   if (advanced == false) dispatch(clearAdvancedInputs())
    // }, [advanced])

    const handleClose = () => {
      dispatch(toggleTaskModal())
    }
 

   return (
     <NiftyModal open={show} onClose={handleClose} width="65%">
       <FormContainer>
         <h4 style={{ margin: '5px' }}>New Download</h4>
         
           <UrlField
             fullWidth
             label="Input URLs"
             multiline
             rows={6}
             variant="outlined"
             helpertext="Seperate urls by hitting enter"
           />
           <Margin margin={20} />
           <FormRow role="row" width="45%">
             <Label col={3} left>
               Rename:
             </Label>
             <FormControl col={9}>
               <RenameField
                 fullWidth
                 variant="outlined"
                 onChange={(e) => dispatch(newNameInput(e.target.value))}
               />
             </FormControl>
           </FormRow>
           <FormRow role="row" width="45%">
             <Label col={3} left>
               Location:{' '}
             </Label>
             <FormControl col={9}>
               <ForderSelect
                 value={forms.directory || ''}
                 onChange={(e) => dispatch(changeDirectory(e.target.value))}
                 folderbuttonClick={() => dispatch(getDirectory())}
                 width="500px"
                 labelWidth="80px"
                 labelAlign="left"
                 textAlign="left"
               />
             </FormControl>
           </FormRow>

           <FormControl fullWidth>
             <Switch label="Advanced Options" onChange={toggleAdvanced} />
           </FormControl>

           <CSSTransition
             in={advanced}
             timeout={250}
             classNames="alert"
             apear
             unmountOnExit
             onExited={() => setAdvanced(false)}
           >
             <AdvancedOptions forms={forms} />
           </CSSTransition>

           <div style={{ display: 'flex', flexDirection: 'row' }}>
             <MTButton
               cancebuttonl={1}
               dark
               onClick={() => dispatch(cancelTask())}
             >
               Cancel
             </MTButton>
             <MTButton dark onClick={() => console.log('but')}>
               Add
             </MTButton>
           </div>
         
       </FormContainer>
     </NiftyModal>
   )
}

const AdvancedOptions = (props) => {
  const { forms } = props
  return (
    <Container>
      <FormRow role="row" width="50%">
        <Label col={3} left>
          User-Agent :
        </Label>
        <FormControl col={9}>
          <StyledOutlineField
            fullWidth
            type="text"
            onChange={(e) => dispatch(cookieChange(e.target.value))}
            value={forms.cookie}
          />
        </FormControl>
      </FormRow>
      <FormRow role="row" width="50%">
        <Label col={3} left>
          Referer :
        </Label>
        <FormControl col={9}>
          <StyledOutlineField
            fullWidth
            type="text"
            onChange={(e) => dispatch(refererChange(e.target.value))}
            value={forms.referer}
          />
        </FormControl>
      </FormRow>
      <FormRow role="row" width="50%">
        <Label col={3} left>
          Cookies :
        </Label>
        <FormControl col={9}>
          <StyledOutlineField
            fullWidth
            multiline
            type="text"
            onChange={(e) => dispatch(cookieChange(e.target.value))}
            value={forms.cookie}
          />
        </FormControl>
      </FormRow>
      <FormRow role="row" width="50%">
        <Label col={3} left>
          Proxy :
        </Label>
        <FormControl col={9}>
          <StyledOutlineField
            fullWidth
            onChange={(e) => dispatch(proxyChange(e.target.value))}
            value={forms.proxy}
            placeholder="[http://][USER:PASSWORD@]HOST[:PORT]"
            rows={3}
          />
        </FormControl>
      </FormRow>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
`
const FormContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  height: fit-content !important;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 2%;
  background-color: ${({ theme }) => theme.modal_container};
  &:focus {
    outline: none;
  }
  & > .MuiTextField-root {
    margin-bottom: 10px;
  }
`

const AdvancedContainer = styled.div`
  animation-duration: 0.4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  display: none;
  opacity: 0;

  ${(props) =>
    props.reveal == true &&
    css`
      animation-name: ${FadeIn};
    `}
`

export default NewTaskModal
