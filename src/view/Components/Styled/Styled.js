import styled,{css} from 'styled-components';

 

const FormRow = styled.div` 
    margin-bottom: 1rem;
    margin: 0px 0px 10px 0px;
    width: ${props => props.width ? props.width : 'auto'};
    ${props => props.role == 'row' && css`
          display: flex;
          flex-wrap: wrap;             
    `}

`
const Label =  styled.label`
        font-size:  14px;       
        align-self: center;      
        ${props => props.col && css`
            position: relative;
            width: 100%;            

        `}
          flex: ${props => props.col ? getFlex(props.col) :'none' };
          max-width: ${props  => getMaxWidth(props.col)};
          text-align: ${props => props.left ? 'left': 'right'};
          padding: 0 5px;
`
const FormControl = styled.div`
      flex: ${props => props.col ? getFlex(props.col) :'none' };
      max-width: ${props  => getMaxWidth(props.col)};
`
function getFlex(col) {
  if(col < 1 || col > 12) {
    return `0 0 auto`
  }
  return `0 0 ${((col/12) * 100).toFixed(6)}%`
}
function getMaxWidth(col) {
  if(col < 1 || col > 12) {
    return `100%`
  }
  return `${((col/12) * 100).toFixed(6)}%`
}
 
 

export {
  
  FormRow,
  Label,
  FormControl
};