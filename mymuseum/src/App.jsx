
import Header from "./Components/Header";
import RandomArtworkDisplay from "./Components/randomArtworkDisplay"
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/navBar";
import './App.css'
import RouteError from './routeError';

import BrowsePage from "./Components/NewFolder/browsePage";


function App() {
 

  return (
      <>
    <div>
          <div>
              <Header />
              <Navbar />
          </div>
          
          <Routes>
              <Route path="/" element={<div className='ArtworkCarousel'><RandomArtworkDisplay /></div>} />
              <Route path="/browse" element={<div className='browsePage'><BrowsePage /></div>} />
              <Route path='/*' element={<RouteError message={"Path doesn't exist!"} />} />
          </Routes>
          </div>
    </>
  )
}

export default App
