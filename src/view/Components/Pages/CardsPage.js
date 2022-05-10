import React, { useEffect } from 'react'
import styled from 'styled-components'
import _ from 'underscore'
import { useSelector, useDispatch } from 'react-redux'
 
 

const CardsPage  = props => {

    const links = useSelector((state) => state.app.saved_posts)

    useEffect(() => {
      
    }, [links])

  const iterateObject = () => {
    
   const mapped = Object.keys(links).map((el, i) => (
     <Card subreddit={el} key={i} length={el.length}></Card>
   ))
   return mapped
  }

  return <CardList>{iterateObject()}</CardList>
}

const Card = ({ subreddit, length=1 }) => {
  return (
    
      <StyleCard>
        <div className="card_image">
          <div> {length}</div>
        </div>
        <div className="card_title title-white">
          <p>{subreddit}</p>
        </div>
      </StyleCard>
    
  )
}

const CardList = styled.div`
  
  width: 100vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding : 20px;
`
const StyleCard = styled.div`
  margin: 15px auto;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.25), -2px -2px 2px 4px rgba(0,0,0,0.22);
  cursor: pointer;
  transition: 0.4s;
  & > .card_image {
    width: inherit;
    height: inherit;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
      width: inherit;
      height: inherit;
      border-radius: 20px;
      object-fit: cover;
    }
    & > div {
      font-size: 15px;
      font-weight: bold;
      font-size: 30px;
    }
  }
  & .card_title {
    text-align: center;
    border-radius: 0px 0px 40px 40px;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 13px;
    margin-top: -40px;
    height: 20px;
    color: #333;
  }
  &:hover {
    transform: scale(0.9, 0.9);
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
      -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
  }
`

export default CardsPage