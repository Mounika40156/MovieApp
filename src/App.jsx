import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Intro from './Components/Intro'
import SignUp from './Components/SignUp'
import DashBoard from './Components/DashBoard'
import SavedList from './Components/SavedList'
import MovieDetails from './Components/MovieDetails'
import MovieTrailer from './Components/MovieTrailer'
import FavoritesList from './Components/FavoritesList'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path = "/dashboard" element = {<DashBoard/>}/>
        <Route path = "/saved-list" element = {<SavedList/>}/>
        <Route path="/movie/:id" element={<MovieDetails />} /> 
        <Route path="/movie/trailer/:videoId" element={<MovieTrailer />} /> 
       <Route path = "/favorites" element = {<FavoritesList/>}/>
      </Routes>
    </>
  )
}

export default App
