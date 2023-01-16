import cn from "classnames";
import { StateContext } from "../context/stateContext";
import { useContext, useState, useEffect } from "react";
import s from "./FinModal.module.css";

function FinModal() {
const {
  finModalState,
  win,
  onSetWin,
  finish,
  onSetFinish,
   area,
    score,
     onSetMode,
      onPussyHandle,
       onSetHisState,
         onSetTargets,
           onSetStatus,
             onchangeScore,
               onSetLvlTime,lvlTime} = useContext(StateContext)


  const [isOpen, setOpen] = useState(finModalState)


  useEffect(()=>{
    setOpen(finish)

  },[finish])

const closeModal = async () =>{
  
    onSetWin(false)
    onSetFinish(false)
    onSetMode('relax')
    onPussyHandle(false)
    onSetHisState(true)
    onSetTargets(false)
    onSetStatus(false)
    onchangeScore(0)
    onSetLvlTime(0)


    await localStorage.clear();
    try {
      const cache = await caches.open('my-cache');
      await cache.delete('/path/to/resource');
      //console.log('Cache deleted');
      } catch (error) {
        console.log(error);
      }
    window.location.reload()
}

  return (
    <div className={cn(s.ground,{
      [s.open]: isOpen,
    })}>
    <div className={s.background}>f</div>
      <div
    style={{top: area.height/3+'px'}}
      className={cn(s.modal, {
        [s.win]: win,
        [s.lose]: !win
      })}
    >
      <div className={s.modalContent}>
        <p className={s.modalText}>{win ? ' You won! ^_^' : 'You lose :('}</p>
        <p className={s.modalText}>Total Score: {score.toString()}</p>
        <p className={s.modalText}>Total Time: 
        {Math.floor(lvlTime/60) ? Math.floor(lvlTime/60) : 0}:{(lvlTime%60) ? (lvlTime%60) : 0}
        </p>
        
        <button className={s.closeModalButton} onClick={closeModal}>Close</button>
      </div>
    </div>
    </div>
  );
}

export default FinModal;