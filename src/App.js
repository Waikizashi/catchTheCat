import Layout from './components/Layout/Layout.js';
import { StateContext} from './context/stateContext.js';
import { useState, useEffect, useRef  } from 'react';
import getRandomInt from './mechanic/getRandomInt.js';
import PussyConf from './mechanic/Cat.js';


import s from './App.module.css';

import './styles/font.css'


const rules = require('./data/lvlDescr.json');

const keys = [
  'pussyRender',
              'hisState',
              'mode',
              'area',
              'Score',
              'modifier',
              'targets',
              'gameSatus',
              'pause',
              'finish',
              'lvlTime'
              ]


function App() {


  //console.log('gameSatus', JSON.parse(localStorage.getItem('gameSatus')))
  const appRef = useRef(null)

  const [pussyRender, setRender] = useState(false)
  const [hisState, setHisState] = useState(true)
  const [mode, setMode] = useState('relax')
  const [area, setArea] = useState({height: 0, width: 0})
  const [Score, setScore] = useState(0)
  const [modifier, setModifier] = useState(1)
  const [targets, setTargets] = useState([])
  const [gameSatus, setStatus] = useState(false)
  const [pause, setPause] = useState(false)
  const [finish, setFiish] = useState(false)
  const [win, setWin] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [lvlDescr, setLvlDescr] = useState(rules)
  const [lvlTime, setLvlTime] = useState(45)

  useEffect(()=>{
    console.log('Status from local',gameSatus)
    localStorage.setItem('gameSatus', gameSatus)
    console.log('Status from storage',JSON.parse(localStorage.getItem('gameSatus')))
  },[gameSatus])

  const handleSetWin = (value)=>{
    setWin(value)
    localStorage.setItem('win', win);
  }
  const handleSetFinish = (value)=>{
    setFiish(value)
    localStorage.setItem('finish', finish);
  }

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

      //targets.push(conf)
      //setTargets(targets.push(conf))
    }}
    else if (value === null){
      return
    }
    else{
      setTargets([])
    }
    localStorage.setItem('targets', JSON.stringify(targets));

  }

  useEffect(()=>{
    
    //console.log(localStorage)
    keys.forEach(key => {
      if(localStorage.getItem(key) !== null)        
        {
          switch(key){
            case 'pussyRender':              
            setRender(localStorage.getItem(key));
              break;
            case 'hisState':
             // console.log(JSON.parse(localStorage.getItem(key)))              
            setHisState(true);
              break;
            case 'mode':              
            setMode(localStorage.getItem(key));
              break;
            case 'area':              
            setArea(localStorage.getItem(key));
              break;
            case 'Score':              
            setScore(parseInt(localStorage.getItem(key)));
              break;
            case 'modifier':              
            setModifier(parseInt(localStorage.getItem(key)));
              break;
            case 'targets': 
            //console.log(JSON.parse(localStorage.getItem(key)))             
            setTargets(JSON.parse(localStorage.getItem(key)));
              break;
            case 'gameSatus':        
            //console.log(JSON.parse(localStorage.getItem(key)))      
            setStatus(JSON.parse(localStorage.getItem(key)));
              break;
            case 'pause':              
            setPause(JSON.parse(localStorage.getItem(key)));
              break;
            case 'win':              
            setPause(localStorage.getItem(key));
              break;
            case 'finish':              
            setLvlTime(localStorage.getItem(key));
              break;
            case 'lvlTime':              
            setLvlTime(parseInt(localStorage.getItem(key)));
                break;
            default: break;
          }          
        }
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
  

  const setTime = (gameMode) =>{
    if(gameMode === 0){
      setLvlTime(45)
    }
    else {
      setLvlTime(lvlDescr['modes'][gameMode].time)
      //console.log(lvlDescr['modes'][gameMode].time)
    }
    localStorage.setItem('lvlTime', lvlTime);
    //console.log(localStorage)
  }

  const setUpModifier = (value) =>{
    
    setModifier(value)
    localStorage.setItem('modifier', modifier);
    //console.log(modifier)
  }

  const setGameStatus = (value) =>{
    if(value !== undefined){
      setStatus(value)
      //localStorage.setItem('gameSatus', JSON.parse(value));
    }
    else{
      //localStorage.setItem('gameSatus', JSON.parse(!gameSatus));
      setStatus(!gameSatus)
      changeScore(0)
    }
    
  }
 
  const setAreaPlace = (place) =>{
    //console.log("set AREA:", place)
    setArea(place)
    //console.log("####:", Area)
  }

  const changeScore = async (value)=>{
    if(value === 0){
      await setScore(0)
      localStorage.setItem('Score', 0);
    }
    else{
      localStorage.setItem('Score', Score + value);
      setScore(Score + value)
      }
      
  }

  const pussyHandle = (value = undefined) =>{

    if(value !== undefined){
      setRender(value)
    }
    else{
      setRender(!pussyRender)
    }
    localStorage.setItem('pussyRender', pussyRender);
  }

  const hisHandle = async (value) =>{
    if(value !== 0){
      setHisState(value)
      localStorage.setItem('hisState', value);
      //console.log(localStorage.getItem('hisState'))
    }
    else if(value === 0){
      await setHisState(!hisState)
      localStorage.setItem('hisState', `${hisState}`);
      //console.log('#####',hs)
      //console.log('%%%%%', localStorage.getItem('hisState'))
      
    }
    
  }
  
  const modeHandle = (mode) =>{
    setMode(mode)
    //console.log(mode)
    
  }


  const setPauseState = (value = undefined)=>{
    if(value === undefined){
      setPause(!pause)
      localStorage.setItem('pause', pause);
    }else{
      setPause(value)
      localStorage.setItem('pause', value);
    }
  }

  //console.log('App')

  return (
    <StateContext.Provider value={{
      lvlTime:lvlTime,
      lvlConf:lvlDescr,
      hiScreenState:hisState,
      gameMode:mode,
      score:Score,
      render:pussyRender,
      area: area,
      status: gameSatus,
      Modifier:modifier,
      targets:targets,
      pause: pause,
      finish:finish,
      win:win,
      onSetWin:handleSetWin,
      onSetFinish:handleSetFinish,
      onChangeTime: setLvlTime,
      onSetPause: setPauseState,
      onSetLvlTime:setTime,
      onSetTargets:onSetTargets,
      onSetUpModifier: setUpModifier,
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
