import "./App.css";
import { MainPage } from "./pages/main/MainPage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/main/Login/Login";

function App() {
  //for Table component

  // const [inputs, setInputs] = React.useState([
  //   { x: 2750, y: 1830, quantity: 1, note: "" },
  // ]);

  // const handleInputChange = (inputValue, inputName, index) => {
  //   setInputs((prevInputs) => {
  //     const newInputs = [...prevInputs];
  //     const inputObject = newInputs[index] || {};
  //     inputObject[inputName] = inputValue;
  //     newInputs[index] = inputObject;
  //     return newInputs;
  //   });
  // };

  // const addRow = () => {
  //   setInputs((prevInputs) => [...prevInputs, {}]);
  // };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainPage />
            </>
          }
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
