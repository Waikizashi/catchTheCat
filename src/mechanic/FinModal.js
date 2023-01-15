import cn from "classnames";
import { StateContext } from "../context/stateContext";
import { useContext } from "react";
import s from "./FinModal.module.css";

function FinModal({ isOpen}) {

const {finModalState, area} = useContext(StateContext)

const closeModal = () =>{
  isOpen && isOpen(false)
}

  return (
    <div
    style={{top: area.height/3+'px'}}
      className={cn(s.modal, {
        [s.open]: finModalState,
      })}
    >
      <div className={s.modalContent}>
        <p className={s.modalText}>You won!</p>
        <button className={s.closeModalButton} onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default FinModal;