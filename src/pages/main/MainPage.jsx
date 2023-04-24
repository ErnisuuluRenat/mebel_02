import React from "react";
import Table from "../../components/Table/Table";
import Details from "../../components/Details/Details";
import { SendData } from "../../components/SendData/SendData";
import { PopUp } from "../../components/popUp/PopUp";
import { useSelector,useDispatch } from "react-redux";

export const MainPage = () => {
  const statePopUp = useSelector((state) => state.popup.showPopUp) 
  
  return (
    <>
      <div className="container">
        <Table title={"Материалы"} cas={"cas"} />
        <Details />
        <SendData />
        {statePopUp && <PopUp></PopUp>}
      </div>
    </>
  );
};
