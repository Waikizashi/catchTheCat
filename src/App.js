import Layout from './components/Layout/Layout.js';
import { StateContext } from './context/stateContext.js';
import { useState } from 'react';

import s from './App.module.css';

import './css/font.css'

function App() {
  const [hisState, setHisState] = useState(true)
  const [mode, setMode] = useState('medium')

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
