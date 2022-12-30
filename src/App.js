import Layout from './components/Layout/Layout.js';
import { StateContext } from './context/stateContext.js';
import { useState } from 'react';

import s from './App.module.css';

import './css/font.css'

function App() {
  const [pussyRender, setRender] = useState(false)
  const [hisState, setHisState] = useState(true)
  const [mode, setMode] = useState('veryEasy')
  const [Area, setArea] = useState({height: 0, width: 0})
  const [Score, setScore] = useState(0)
  const [gameSatus, setStatus] = useState(false)


  


  
  const setGameStatus = (value) =>{
    if(value !== undefined){
      setStatus(value)
    }
    else{
      setStatus(!gameSatus)
    }
    setScore(0)
  }
 
  const setAreaPlace = (place) =>{
    setArea(place)
  }

  const changeScore = (value)=>{
    setScore(Score + value)
  }

  const pussyHandle = (value) =>{

    if(value !== undefined){
      setRender(value)
    }
    else{
      setRender(!pussyRender)
    }
  }

  const hisHandle = (value) =>{
    if(value !== undefined){
      setHisState(value)
    }
    else{
      setHisState(!hisState)
    }
  }
  
  const modeHandle = (mode) =>{
    setMode(mode)
  }


  console.log('App')

  return (
    <StateContext.Provider value={{
      hiScreenState:hisState,
      gameMode:mode,
      score:Score,
      render:pussyRender,
      area: Area,
      status: gameSatus,
      onSetStatus: setGameStatus,
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
