import "./App.css";
import { MainPage } from "./pages/main/MainPage";
import { Routes, Route,} from "react-router-dom";
import Login from "./pages/Login/Login";
import Archive from "./pages/Archieve/Archive";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";
import Navbar from "./components/Navbar/Navbar";
import Result from "./pages/Result/Result";

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<RequireAuth><MainPage /></RequireAuth>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/archive" element={<RequireAuth><Archive/></RequireAuth>}></Route>
        <Route path="/result/:id" element={<RequireAuth><Result/></RequireAuth>}></Route>
      </Routes>
    </div>
  );
}

export default App;
