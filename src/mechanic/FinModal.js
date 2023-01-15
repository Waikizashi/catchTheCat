import cn from "classnames";
import { StateContext } from "../context/stateContext";
import { useContext } from "react";
import s from "./FinModal.module.css";

function FinModal({isOpen, win = true}) {

const {finModalState, area, score} = useContext(StateContext)

const closeModal = () =>{
  isOpen && isOpen(false)
}

  return (
    <div
    style={{top: area.height/3+'px'}}
      className={cn(s.modal, {
        [s.open]: finModalState,
        [s.win]: win,
        [s.lose]: !win
      })}
    >
      <div className={s.modalContent}>
        <p className={s.modalText}>{win ? ` You won! ^_^` : `You lose :(`}</p>
        <p className={s.modalText}>Total Score: {score}</p>
        <p className={s.modalText}>Total Time: {`00:00`}</p>
        
        <button className={s.closeModalButton} onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default FinModal;