import { configureStore } from "@reduxjs/toolkit";
import inputsReducer from "../slices/inputDataSlice/inputDataSlice";
import detailsReducer from "../slices/inputDataSlice/inputDetailsSlice";
import authReducer from "../thunk/loginThunk";
import optionReducer from '../slices/inputDataSlice/optionId'
import popUpReducer from "../slices/inputDataSlice/popUp";

export default configureStore({
  reducer: {
    inputs: inputsReducer,
    details: detailsReducer,
    auth : authReducer,
    optionId : optionReducer,
    popup : popUpReducer,
  },
});
