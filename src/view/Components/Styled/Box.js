import styled, {css} from 'styled-components'

const Box  = styled.div(props => ({
  background: props.background,
  display :`${props.display ? props.display : 'flex' }`,
  flexDirection: `${props.flexDirection ? props.flexDirection : 'column' }`,
  height: props.height,
  width:  props.height,
  padding: props.padding,
  paddingRight: props.paddingRight,
  paddingLeft: props.paddingLeft,
  paddingTop: props.paddingTop,
  paddingBottom: props.paddingBottom,
  margin: props.margin,
  marginRight: props.marginRight,
  marginLeft: props.marginLeft,
  marginTop: props.marginTop,
  marginBottom: props.marginBottom,
}));


export default Box;