import React, { useEffect } from "react";
import "./table.scss";
import deleteIcon from "../../assets/delete.png";
import createIcon from "../../assets/create.png";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInput,
  updateInputs,
  addRow,
  deleteLastRow,
  updateFirstInput,
} from "../../redux/slices/inputDataSlice/inputDataSlice";
import { useQuery } from "react-query";
import axios from "axios";
import { changeId } from "../../redux/slices/inputDataSlice/optionId";

const fetchResult = async () => {
  const token = localStorage.getItem('token');

  const config = {
    headers : {
      Authorization: `Bearer ${token}`,
    }
  }

  const { data } = await axios.get(
    "http://46.8.43.42:8080/api/v1/authenticated/paper/all",config
  );
  return data;
};

const Table = ({ title, cas }) => {
  const inputs = useSelector((state) => state.inputs);
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useQuery("paper", fetchResult);


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

  const handleOptionChange = React.useCallback((e) => {
    const [width, height,id] = e.target.value.split(",");
    dispatch(changeId(id))
    dispatch(updateFirstInput({ x: Number(width), y: Number(height) }));
    
  });

  //function to check if it's not empty object

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
        <select onChange={(e) => handleOptionChange(e)}>
          {isLoading ? <option>loading...</option> : data.map((opt,i) => (
            <option key={opt.name} value={`${opt.width}, ${opt.height}, ${opt.id}`}>
              {opt.name}
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
              <tr key={i + inp.x}>
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
                    
                    onChange={(e) => handleInputChange(e.target.value, `y`, i)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={inp.quantity || ""}
                    
                    onChange={(e) =>
                      handleInputChange(e.target.value, `quantity`, i)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={inp.description || ""}
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
