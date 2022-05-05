import React from 'react'
import styled from 'styled-components'

const AppButton = props => {

  return  (
    <StyledButton>
      <div>{props.children}</div>
    </StyledButton>
  )
}


const StyledButton = styled.a`
  display: inline-block;
  font-weight: normal;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 1.42857143;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 2px;
  border-radius: 3px;
  position: relative;
  padding: 15px 5px;
  margin: 0 0 10px 10px;
  min-width: 80px;
  height: 35px;
  text-align: center;
  color: #666;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  font-size: 12px;
  & > div {
    &:before {
      content: '\f044';
      box-sizing: border-box;
      font-family: FontAwesome;
    }
  }
  &:hover {
    background: #f4f4f4;
    color: #444;
    border-color: #aaa;
  }

  &:focus {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
  &:active {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
`

export default AppButton