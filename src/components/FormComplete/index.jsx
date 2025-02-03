import React, { useState } from "react";
import logo from "../../assets/icon-complete.svg";
import CardForm from "../CardForm";
import "./style.css"

export const FormComplete = () => {
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = () => {
    setIsComplete(!isComplete);
  };
  return (
    <>
      {isComplete ? (
        <CardForm />
      ) : (
        <div className="card-form-container flex h-screen">
          <div className="card-form w-[400px] flex flex-col items-center gap-5 m-auto">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div>
              <h1 className="text-3xl">THANK YOU!</h1>
            </div>
            <div>
              <p>We've added your card details</p>
            </div>
            <div>
              <button
                type="submit"
                className="card-button p-2 text-white rounded hover:cursor-pointer w-[300px]"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default FormComplete;
