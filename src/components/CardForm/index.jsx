import React, { useState } from "react";
import "./style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CardFront from "../CardFront";
import FormComplete from "../FormComplete";

const validateCardNumber = (value) => {
  if (!/^\d{13,19}$/.test(value))
    return "Card number must be between 13 to 19 digits";

  let sum = 0;
  let shouldDouble = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0 ? undefined : "Invalid card number";
};

const validate = (values) => {
  const errors = {};

  // Cardholder Name
  if (!values.name) {
    errors.name = "Cardholder name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
    errors.name = "Only letters allowed";
  }

  // Card Number
  if (!values.cardnumber) {
    errors.cardnumber = "Card number is required";
  } else {
    const cardError = validateCardNumber(values.cardnumber);
    if (cardError) errors.cardnumber = cardError;
  }

  // Expiry Month
  if (!values.month) {
    errors.month = "Month is required";
  } else if (!/^(0[1-9]|1[0-2])$/.test(values.month)) {
    errors.month = "Invalid month (01-12)";
  }

  // Expiry Year
  if (!values.year) {
    errors.year = "Year is required";
  } else if (!/^\d{2}$/.test(values.year)) {
    errors.year = "Invalid year (YY)";
  } else {
    const currentYear = new Date().getFullYear() % 100;
    if (parseInt(values.year) < currentYear) {
      errors.year = "Card has expired";
    }
  }

  // CVV
  if (!values.cvv) {
    errors.cvv = "CVV is required";
  } else if (!/^\d{3,4}$/.test(values.cvv)) {
    errors.cvv = "Invalid CVV (3-4 digits)";
  }

  return errors;
};

export const CardForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = () => {
    setIsSubmit(!isSubmit)
  }
  return (
    <>
      {isSubmit ? (
        <FormComplete />
      ) : (
        <Formik
          initialValues={{
            name: "",
            cardnumber: "",
            month: "",
            year: "",
            cvv: "",
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <div className="card-form-container flex h-screen">
              <Form className="card-form w-[400px] flex flex-col gap-3 m-auto">
                <div className="name-container flex flex-col">
                  <label htmlFor="">CARDHOLDER NAME</label>
                  <Field
                    type="text"
                    name="name"
                    className="card-input w-[400px] p-2 rounded border-gray-200 border-2 focus:outline-none focus:border-gray-500 hover:border-gray-500 duration-300"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    style={{ color: "red" }}
                  />
                  {/* <input
                type="text"
                placeholder="e.g. Faizan Ashraf"
                className="card-input w-[400px] p-2 rounded border-gray-200 border-2 focus:outline-none focus:border-gray-500 hover:border-gray-500 duration-300"
              /> */}
                </div>
                <div className="number-container flex flex-col">
                  <label htmlFor="">CARD NUMBER</label>
                  <Field
                    type="text"
                    name="cardnumber"
                    className="card-input w-[400px] p-2 rounded border-gray-200 border-2 focus:outline-none focus:border-gray-500 hover:border-gray-500 duration-300"
                  />
                  <ErrorMessage
                    name="cardnumber"
                    component="div"
                    style={{ color: "red" }}
                  />
                  {/* <input
                  type="text"
                  placeholder="e.g. 1234 5678 9123 0000"
                  className="card-input w-[400px] p-2 rounded border-gray-200 border-2 focus:outline-none focus:border-gray-500 hover:border-gray-500 duration-300"
                /> */}
                </div>
                <div className="details-container flex flex-col">
                  <label>EXP. DATE (MM / YY) & CVV</label>
                  <div className="flex justify-between">
                    <div>
                      <Field
                        type="text"
                        name="month"
                        placeholder="MM"
                        className="card-input w-24 p-2 rounded border-gray-200 border-2 focus:outline-none focus:border-gray-500 hover:border-gray-500 duration-300"
                      />
                      <ErrorMessage
                        name="month"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="year"
                        placeholder="YY"
                        className="card-input w-24 p-2 rounded border-gray-200 border-2 focus:outline-none focus:border-gray-500 hover:border-gray-500 duration-300"
                      />
                      <ErrorMessage
                        name="year"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        className="card-input w-44 p-2 rounded border-gray-200 border-2 focus:outline-none focus:border-gray-500 hover:border-gray-500 duration-300"
                      />
                      <ErrorMessage
                        name="cvv"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="card-button p-2 text-white rounded hover:cursor-pointer"
                  disabled={isSubmitting}
                  onClick={isSubmitting? handleSubmit : null}
                >
                  Confirm
                </button>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default CardForm;
