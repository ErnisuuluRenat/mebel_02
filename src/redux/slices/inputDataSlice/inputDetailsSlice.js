import { createSlice } from "@reduxjs/toolkit";

export const inputDataSlice = createSlice({
  name: "details",
  initialState: [
    {
      x: 2750,
      y: 1830,
      quantity: 1,
      description: "",
    },
  ],

  reducers: {
    updateDetail: (state, action) => {
      const { index, name, value } = action.payload;
      const inputObject = state[index] || {};
      if (name === "description") {
        inputObject[name] = value;
      } else if (value >= 0) {
        inputObject[name] = value;
      }
      state[index] = inputObject;
    },
    updateDetails: (state, action) => {
      const newDetails = action.payload.map((input) => ({
        x: input.x || "",
        y: input.y || "",
        quantity: input.quantity || "",
        description: input.description || "",
      }));
      return newDetails;
    },
    addRowDetail: (state, action) => {
      state.push({});
    },
    deleteLastRowDetail: (state, action) => {
      state.pop();
    },
  },
});

export const {
  updateDetail,
  updateDetails,
  addRowDetail,
  deleteLastRowDetail,
} = inputDataSlice.actions;

export default inputDataSlice.reducer;
