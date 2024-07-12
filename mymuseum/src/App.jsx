
import Header from "./Components/Header";
import RandomArtworkDisplay from "./Components/randomArtworkDisplay"
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/navBar";
import './App.css'
import RouteError from './routeError';

import BrowsePage from "./Components/NewFolder/browsePage";
import SingleMetArtPage from "./Components/NewFolder/singleArtworkPage";

import SingleHarvardArtPage from "./Components/NewFolder/singleArtworkPageHarvard";


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
                  <Route path="/met/:art_id" element={<div className='singleArtPage'><SingleMetArtPage /></div>} />
                  <Route path="/harvard/:art_id" element={<div className='singleArtPage'><SingleHarvardArtPage /></div>} />
              <Route path='/*' element={<RouteError message={"Path doesn't exist!"} />} />
          </Routes>
          </div>
    </>
  )
}

export default App
