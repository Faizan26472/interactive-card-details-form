import React from "react";
import "./style.css";
import logo from "../../assets/card-logo.svg";

export const CardFront = () => {
  return (
    <>
      <div className="card-front flex flex-col rounded-xl p-5 text-white absolute">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="number text-3xl flex justify-around relative top-20">
          <h1>0000</h1>
          <h1>0000</h1>
          <h1>0000</h1>
          <h1>0000</h1>
        </div>
        <div className="flex justify-between relative top-25">
          <h1>Faizan Ashraf</h1>
          <h1>00/00</h1>
        </div>
      </div>
    </>
  );
};

export default CardFront;
