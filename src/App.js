import Layout from './components/Layout/Layout.js';
import { StateContext} from './context/stateContext.js';
import { useState, useEffect, useRef  } from 'react';
import getRandomInt from './mechanic/getRandomInt.js';
import PussyConf from './mechanic/Cat.js';


import s from './App.module.css';

import './css/font.css'


const rules = require('./data/lvlDescr.json');

const keys = ['score','time']


function App() {
  const [pussyRender, setRender] = useState(false)
  const [hisState, setHisState] = useState(true)
  const [finModalState, setFinModalState] = useState(false)
  const [mode, setMode] = useState('relax')
  const [area, setArea] = useState({height: 0, width: 0})
  const [Score, setScore] = useState(0)
  const [modifier, setModifier] = useState(1)
  const [targets, setTargets] = useState([])
  const [gameSatus, setStatus] = useState(false)
  const [jumps, setJumps] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [lvlDescr, setLvlDescr] = useState(rules)
  const [lvlTime, setLvlTime] = useState(45)

  //console.log(lvlDescr)

  function generateRandomKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  const setTypes = () =>{
    let type = 0
    if(mode === 'relax'|| mode === 'medium'){
      type = true
    }
    if(mode === 'easy' || mode === 'hard' || mode === 'extreme'){
      if(getRandomInt(1,2) === 1){
        type = true
        //console.log(type)
      }
      else{
        type = false
        //console.log(type)
      }
      
    }
    return type
  }
 
    //let targets = []
  const onSetTargets = (value) =>{
    let badType = 0
    if(value === true){
      for (let i = 0; i < modifier; i++) {
        
      const conf = new PussyConf([
        generateRandomKey(),
        getRandomInt(area.height*0.1, area.height-area.height*0.15) + 'px',
        getRandomInt(area.height*0.1, area.height-area.height*0.15) + 'px',
        area.width*0.1 + 'px',setTypes()])
      
      
      //console.log(jump)
      if(conf.type === false){
        badType +=1
        if((badType > modifier/2) ){
          conf.type = true
        }
      }
      else if(modifier === 1){
        conf.type = true
      }

      let tmp = targets
      tmp.push(conf)
      setTargets(tmp)


      tmp = jumps
      tmp[conf.id] = null
      setJumps(tmp)
      //targets.push(conf)
      //setTargets(targets.push(conf))
    }}
    else if (value === null){
      
    }
    else{
      setTargets([])
    }
  }


  const appRef = useRef(null)


  // min-width: 248px;
  // min-height: 312px;

  useEffect(()=>{
    keys.forEach(key => {
      if(localStorage.getItem(key) === null ||
       localStorage.getItem(key).length === 0)
        {setScore(parseInt(localStorage.getItem(key)))}
    });  
   },[])

  useEffect(() => {
    if(window.innerHeight < window.innerWidth){ 
      appRef.current.style.minHeight = '312px'
      appRef.current.style.minWidth = '512px'
    }
    else{
      appRef.current.style.minHeight = '600px'
      appRef.current.style.minWidth = '248px'
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerHeight, window.innerWidth])
  

  const resetTimer = (gameMode) =>{
    setLvlTime(lvlDescr['modes'][gameMode].time)
    console.log(lvlDescr['modes'][gameMode].time)
  }

  const setUpModifier = (value) =>{
    
    setModifier(value)
    console.log(modifier)
  }

  const setGameStatus = (value) =>{
    if(value !== undefined){
      setStatus(value)
    }
    else{
      setStatus(!gameSatus)
      setScore(0)
    }
  }
 
  const setfinalModalState = (value) =>{
    //console.log("####:", place)
    setFinModalState(value)
    //console.log("####:", Area)
  }
  const setAreaPlace = (place) =>{
    //console.log("set AREA:", place)
    setArea(place)
    //console.log("####:", Area)
  }

  const changeScore = (value)=>{
    if(value === 0){
      setScore(0)
      localStorage.setItem('score', Score);
    }
    else{
      setScore(Score + value)
      localStorage.setItem('score', Score);}
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


  //console.log('App')

  return (
    <StateContext.Provider value={{
      lvlTime:lvlTime,
      lvlConf:lvlDescr,
      hiScreenState:hisState,
      gameMode:mode,
      jmp:jumps,
      score:Score,
      render:pussyRender,
      area: area,
      status: gameSatus,
      finModalState: finModalState,
      Modifier:modifier,
      targets:targets,
      onSetLvlTime:resetTimer,
      onSetTargets:onSetTargets,
      onSetUpModifier: setUpModifier,
      onSetFinModalState: setfinalModalState,
      onSetStatus: setGameStatus,
      onSetAreaPlace: setAreaPlace,
      onchangeScore:changeScore,
      onPussyHandle:pussyHandle,
      onSetMode:modeHandle,
      onSetHisState: hisHandle
    }}>
      <div ref={appRef} className={s.App}>
        <Layout></Layout>
      </div>
    </StateContext.Provider>
  );
}

export default App;
