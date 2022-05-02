import React, {Fragment} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home';
import Player from './components/pages/Player';

import PlayerState from './context/player/PlayerState';
import './App.scss';

const App = () => {
  return (
    <PlayerState>
      <BrowserRouter>
        <Fragment>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/player' element={<Player/>}/>
            </Routes>
          </div>
        </Fragment>
      </BrowserRouter>
    </PlayerState>
  );
};

export default App;
