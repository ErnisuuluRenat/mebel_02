import React from "react";
import './popUp.scss'
import { useDispatch } from "react-redux";
import { closePop } from "../../redux/slices/inputDataSlice/popUp";

export const PopUp = () => {
  const dispatch = useDispatch();

  return (
      <div className="popup-container">    
       <div className="popup-body">      
       <h1>Данные успешно отправлены!</h1>      
       <button onClick={() => dispatch(closePop())}>Close X</button>    
        </div>    
        </div>
  )
}
