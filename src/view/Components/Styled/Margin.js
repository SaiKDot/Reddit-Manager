import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Margin = props => {
    return(
        <M margin={props.margin}/>
    )
}

const M = styled.div`
    margin-top: ${props => props.margin+'px' || '5px'};
    margin-bottom: ${props => props.margin+'px' || '5px'};
`
Margin.propType = {
    margin: PropTypes.number
}


export default Margin