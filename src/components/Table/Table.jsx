import React, { useEffect } from "react";
import "./table.scss";
import deleteIcon from "../../assets/delete.png";
import createIcon from "../../assets/create.png";
import { options } from "../../../listOfMaterialData";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInput,
  updateInputs,
  addRow,
  deleteLastRow,
  updateFirstInput,
} from "../../redux/slices/inputDataSlice/inputDataSlice";

const Table = ({ title, cas }) => {
  const inputs = useSelector((state) => state.inputs);
  const dispatch = useDispatch();

  const handleInputChange = React.useCallback(
    (inputValue, inputName, index) => {
      dispatch(updateInput({ index, name: inputName, value: inputValue }));
    }
  );
  //states

  const tnames = ["№", "X", "Y", "Кол-во", "Примечание"];
  const [arrayOfInputs, setArrayOfInputs] = React.useState([
    { x: 2750, y: 1830, quantity: 1, note: "" },
    1,
    2,
    3,
  ]);

  React.useEffect(() => {
    dispatch(updateInputs(arrayOfInputs));
  }, [arrayOfInputs]);

  const handleOptionChange = React.useCallback((value) => {
    const [x, y] = value.split(",");
    dispatch(updateFirstInput({ x: Number(x), y: Number(y) }));
  });

  //function to check if it's not empty object

  console.log(inputs);

  return (
    <div className="table">
      <h1>{title}</h1>
      <div className="icons_container">
        <div className="icon__create">
          <img
            className="createIcon"
            src={createIcon}
            alt=""
            onClick={() => dispatch(addRow())}
          />
        </div>
        <div className="icon__delete">
          <img
            className="deleteIcon"
            src={deleteIcon}
            alt=""
            onClick={() => dispatch(deleteLastRow())}
          />
        </div>
        <select onChange={(e) => handleOptionChange(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.label} value={`${opt.valueX}, ${opt.valueY}`}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <table className={cas}>
        <thead>
          <tr>
            {tnames.map((tname) => (
              <th key={tname}>{tname}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputs.map((inp, i) => (
            <>
              <tr key={i}>
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

export default Table;
