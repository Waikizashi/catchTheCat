import Layout from './components/Layout/Layout.js';
import { StateContext } from './context/stateContext.js';
import { useState, useEffect } from 'react';

import s from './App.module.css';

import './css/font.css'

function App() {
  const [pussyRender, setRemder] = useState(false)
  const [hisState, setHisState] = useState(true)
  const [mode, setMode] = useState('veryEasy')
  const [Area, setArea] = useState({height: 0, width: 0})
  const [Score, setScore] = useState(0)


  
  const setAreaPlace = (place) =>{
    setArea(place)
  }

  const changeScore = (value)=>{
    setScore(Score + value)
  }

  const pussyHandle = () =>{
    setRemder(!pussyRender)
  }

  const hisHandle = () =>{
    setHisState(!hisState)
  }
  
  const modeHandle = (mode) =>{
    setMode(mode)
  }

  return (
    <StateContext.Provider value={{
      hiScreenState:hisState,
      gameMode:mode,
      score:Score,
      render:pussyRender,
      area: Area,
      onSetAreaPlace: setAreaPlace,
      onchangeScore:changeScore,
      onPussyHandle:pussyHandle,
      onSetMode:modeHandle,
      onSetHisState: hisHandle
    }}>
      <div className={s.App}>
        <Layout></Layout>
      </div>
    </StateContext.Provider>
  );
}

export default App;
