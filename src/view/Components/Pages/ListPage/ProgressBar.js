import React from 'react'
import styled from 'styled-components'

const ProgressBar = (props) => {
  return (
    <Bar viewBox="0 0 100 4" preserveAspectRatio="none">
      <path d="M 0,2 L 100,2" fillOpacity="0" className="progress-BG"></path>
      
      <path
        d="M 0,2 L 100,2"
        strokeWidth="4"
        fillOpacity="0"
        className="progress-Seeker"
      ></path>
    </Bar>
  )
}

const Bar = styled.svg`
  width: 100%;
  height: 100%;
  & .progress-BG {
    stroke: #eee;
    stroke-width: 4;
  }
  & .progress-Seeker {
    stroke=  ${(props) => (props.color ? props.color : '#04AA6D')}
    stroke-dasharray: 100, 100;
    stroke-dashoffset: ${(props) => (props.offset ? props.offest : '100')}
  }
`
export default ProgressBar;