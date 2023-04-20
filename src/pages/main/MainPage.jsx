import React from "react";
import Table from "../../components/Table/Table";
import Details from "../../components/Details/Details";
import { SendData } from "../../components/SendData/SendData";
import Navbar from "../../components/Navbar/Navbar";

export const MainPage = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Table title={"Материалы"} cas={"cas"} />
        <Details />
        <SendData />
      </div>
    </>
  );
};
