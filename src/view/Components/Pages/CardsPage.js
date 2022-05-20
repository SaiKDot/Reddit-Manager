import React, { useEffect } from 'react'
import styled from 'styled-components'
import _ from 'underscore'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {sortCardsBy} from '../../actions'

const CardsPage  = props => {

    const posts = useSelector((state) => state.app.saved_posts)
    const history = useHistory()
    const navigate = useNavigate()
    useEffect(() => {
      console.log(posts)
    }, [posts])

  const iterateObject = () => {
    // <Card subreddit={el} key={i} length={el.length}></Card>
    const mapped = Object.keys(posts).map((el, i) =>
      Object.entries(posts[el]).map((val, i) => (
        <Card subreddit={val[0]}
              key={i} 
              length={val[1].length} 
              onClick={() => cardClick(val[0],  val[1]) }>

        </Card>
      ))
    )
   return mapped
  }
  const cardClick = (sub,posts) => {   
    navigate({
      pathname: '/list',      
      state: {
        sub: sub,
        posts: posts,
      },
    })
  }
  const sortClick = (e, sort) => {
    e.preventDefault()
    dispatch(sortCardsBy(sort))
  }

  return (
    <>
  <nav id="sort-nav">
    <ul>
      <li><a href="#" onClick={(e) => sortClick(e, 'rank')}>Sort by Posts</a></li>
      <li><a href="#"onClick={(e) => sortClick(e, 'alpha')}>Alphabetic</a></li>
      {/* <li><a href="#">Menu 2</a></li> */}
    </ul>
  </nav>
  <CardList> {iterateObject()} </CardList>
  </>
  )
}

const Card = ({ subreddit, length=1 , onClick}) => {
  return (
    
      <StyleCard onClick={()=> onClick()}>
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
  height: auto;
  flex: 0 1 auto;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25),
    -2px -2px 2px 2px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: 0.4s;
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
    float: left;
  }
  & > .card_image {
    width: 100%;
    height: 100%;
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
    box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.25),
      -5px -5px 15px 10px rgba(0, 0, 0, 0.22);
  }
`

export default CardsPage