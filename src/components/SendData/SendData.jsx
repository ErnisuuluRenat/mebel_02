import React from "react";
import { useMutation } from "react-query";
import "./SendData.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showPop } from "../../redux/slices/inputDataSlice/popUp";


const convertInputsToData = (inputs) => {
  const newSheet = inputs
    .map((input) => {
      if (Object.keys(input).length !== 0) {
        const { x, y, quantity, description } = input;
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
    .filter((input) => input !== null && (input.width !== 0 || input.height !== 0));
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

// const createSheetData = async (data) => {
//   const token = localStorage.getItem('token');
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   return axios.post("http://46.8.43.42:8080/api/v1/authenticated/detail/save/4", data, config);
// };

const createDetailsData = async (data,id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`http://46.8.43.42:8080/api/v1/authenticated/result/make/${id}`, data, config);
};

//post items

export const SendData = () => {
  const [sendDetails, sendSetDetails] = React.useState();
  const dispatch = useDispatch()

  const details = useSelector((state) => state.details);
  const id = useSelector((state) => state.optionId.id)

  React.useEffect(() => {
    const newDetail = (convertDetailsToData(details));
    sendSetDetails(newDetail);
  }, [details]);


  const mutationDetail = useMutation((newDetail) => createDetailsData(newDetail,id), {
    onSuccess : () => {
      dispatch(showPop())
    }
  });

  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();
 
    mutationDetail.mutate(sendDetails);
  });

 
  return (
    <div className="sendData">
      {sendDetails && (
  <>
    <button type="submit" onClick={(e) => handleSubmit(e)}>
      Отправить данные
    </button>
  </>
)}
    </div>
  );
};
