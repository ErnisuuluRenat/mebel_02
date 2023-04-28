import React, { useEffect } from "react";
import "./Details.scss";
import deleteIcon from "../../assets/delete.png";
import createIcon from "../../assets/create.png";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDetail,
  updateDetails,
  addRowDetail,
  deleteLastRowDetail,
} from "../../redux/slices/inputDataSlice/inputDetailsSlice";

const Details = () => {
  const tnames = ["№", "X", "Y", "Кол-во", "Примечание"];
  const [arrayOfInputs, setArrayOfInputs] = React.useState([
    { x: "", y: "", quantity: "", note: "" },
    1,
    2,
    3,
  ]);
  // const [inputs, setInputs] = React.useState([
  //   { x: 2750, y: 1830, quantity: 1, note: "" },
  // ]);
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();

  const handleInputChange = React.useCallback(
    (inputValue, inputName, index) => {
      dispatch(updateDetail({ index, name: inputName, value: inputValue }));
    }
  );

  // const handleInputChange = (inputValue, inputName, index) => {
  //   setInputs((prevInputs) => {
  //     const newInputs = [...prevInputs];
  //     const inputObject = newInputs[index] || {};
  //     inputObject[inputName] = inputValue;
  //     newInputs[index] = inputObject;
  //     return newInputs;
  //   });
  // };

  React.useEffect(() => {
    // const newInputs = arrayOfInputs.map((input) => ({
    //   x: input.x || "",
    //   y: input.y || "",
    //   quantity: input.quantity || "",
    //   note: input.note || "",
    // }));
    // setInputs(newInputs);

    dispatch(updateDetails(arrayOfInputs));
  }, [arrayOfInputs]);

  return (
    <div className="details">
      <h1>Детали</h1>
      <div className="icons_container">
        <div className="icon__create">
          <img
            className="createIcon"
            src={createIcon}
            alt=""
            onClick={() => dispatch(addRowDetail())}
          />
        </div>
        <div className="icon__delete">
          <img
            className="deleteIcon"
            src={deleteIcon}
            alt=""
            onClick={() => dispatch(deleteLastRowDetail())}
          />
        </div>
      </div>

      <table className={"cos"}>
        <thead>
          <tr>
            {tnames.map((tname) => (
              <th key={tname}>{tname}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {details.map((inp, i) => (
            <>
              <tr key={i + 1000 * 0.15}>
                <td className="numeric">{i + 1}</td>
                <td>
                  <input
                    type="number"
                    value={inp.x || ""}
                    onChange={(e) => handleInputChange(e.target.value, "x", i)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={inp.y || ""}
                    name={"y"}
                    onChange={(e) => handleInputChange(e.target.value, `y`, i)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={inp.quantity || ""}
                    name={"quantity"}
                    onChange={(e) =>
                      handleInputChange(e.target.value, `quantity`, i)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={inp.description || ""}
                    name={"description"}
                    onChange={(e) =>
                      handleInputChange(e.target.value, `description`, i)
                    }
                  />
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Details;
