import { configureStore } from "@reduxjs/toolkit";
import inputsReducer from "../slices/inputDataSlice/inputDataSlice";
import detailsReducer from "../slices/inputDataSlice/inputDetailsSlice";

export default configureStore({
  reducer: {
    inputs: inputsReducer,
    details: detailsReducer,
  },
});
