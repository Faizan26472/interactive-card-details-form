import React, { useState } from "react";
import "./style.css";
import CardForm from "../CardForm";
import CardFront from "../CardFront";
import Cardback from "../CardBack";

export const Main = () => {

  return (
    <>
      <div className="main-container bg-no-repeat flex">
        <div className="left-container h-screen w-1/2">
          {/* <div className="m-30">
            <CardFront />
          </div>
          <div className="mx-50 my-100">
            <Cardback />
          </div> */}
        </div>
        <div className="right-container h-screen w-1/2 items-center justify-center">
          <CardForm />
        </div>
      </div>
    </>
  );
};

export default Main;
