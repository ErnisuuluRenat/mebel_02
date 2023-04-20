import React from "react";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import "./SendData.scss";
import { useSelector } from "react-redux";

const convertInputsToData = (inputs) => {
  const newSheet = inputs
    .map((input) => {
      if (Object.keys(input).length !== 0) {
        const { x, y, quantity, description } = input;
        if (x === 0 || y === 0) {
          return null;
        }
        return {
          x: Number(x),
          y: Number(y),
          quantity: Number(quantity),
          description: String(description),
        };
      } else {
        return null;
      }
    })
    .filter((input) => input !== null && (input.x !== 0 || input.y !== 0));
  return newSheet;
};

const convertDetailsToData = (details) => {
  const newDetail = details
    .map((detail) => {
      if (Object.keys(detail).length !== 0) {
        const { x, y, quantity, description } = detail;
        if (x === 0 || y === 0) {
          return null;
        }
        return {
          width: Number(x),
          height: Number(y),
          quantity: Number(quantity),
          description: String(description),
        };
      } else {
        return null;
      }
    })
    .filter(
      (input) => input !== null && (input.width !== 0 || input.height !== 0)
    );
  return newDetail;
};

export const SendData = () => {
  const [sendSheet, sendSetSheet] = React.useState();
  const [sendDetails, sendSetDetails] = React.useState();

  const inputs = useSelector((state) => state.inputs);
  const details = useSelector((state) => state.details);

  React.useEffect(() => {
    const newSheet = convertInputsToData(inputs);
    sendSetSheet(newSheet);
  }, [inputs]);
  console.log(sendSheet);

  React.useEffect(() => {
    const newDetail = convertDetailsToData(details);
    sendSetDetails(newDetail);
  }, [details]);
  console.log(sendDetails);

  // convertInputsToData(inputs);
  return (
    <div className="sendData">
      <Link to={"/canvas"}>Отправить данные</Link>
    </div>
  );
};
