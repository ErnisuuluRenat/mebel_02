import React from "react";
import { useMutation } from "react-query";
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

//post items

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

  //post data

  const createSheetData = async (data) => {
    const response = await fetch("http://46.8.43.42//api/v1/open/save/paper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create data");
    }
    return response.json();
  };

  const createDetailsData = async (data) => {
    const response = await fetch("http://46.8.43.42//api/v1/open/detail/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to detail data");
    }
    return response.json();
  };

  const { mutate: mutateSheet, isLoading: isLoadingSheet } =
    useMutation(createSheetData);
  const { mutate: mutateDetails, isLoading: isLoadingDetails } =
    useMutation(createDetailsData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const sheetData = { sheet: sendSheet };
    const detailsData = { details: sendDetails };
    mutateSheet(sheetData);
    mutateDetails(detailsData);
  };

  // convertInputsToData(inputs);
  return (
    <div className="sendData">
      {sendSheet && sendDetails && (
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          {isLoadingSheet && isLoadingDetails ? "Sending..." : "Send Data"}
        </button>
      )}
    </div>
  );
};
