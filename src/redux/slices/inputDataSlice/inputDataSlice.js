import { createSlice } from "@reduxjs/toolkit";

export const inputDataSlice = createSlice({
  name: "inputs",
  initialState: [
    {
      x: 2750,
      y: 1830,
      quantity: 1,
      description: "",
    },
  ],

  reducers: {
    updateInput: (state, action) => {
      const { index, name, value } = action.payload;
      const inputObject = state[index] || {};
      if (name === "description") {
        inputObject[name] = value;
      } else if (value >= 0) {
        inputObject[name] = value;
      }
      state[index] = inputObject;
    },
    updateInputs: (state, action) => {
      const newInputs = action.payload.map((input) => ({
        x: input.x || "",
        y: input.y || "",
        quantity: input.quantity || "",
        description: input. description || "",
      }));
      return newInputs;
    },
    addRow: (state, action) => {
      state.push({});
    },
    deleteLastRow: (state, action) => {
      state.pop();
    },
    updateFirstInput: (state, action) => {
      state[0].x = action.payload.x;
      state[0].y = action.payload.y;
    },
  },
});

export const {
  updateInput,
  updateInputs,
  addRow,
  deleteLastRow,
  updateFirstInput,
} = inputDataSlice.actions;

export default inputDataSlice.reducer;
