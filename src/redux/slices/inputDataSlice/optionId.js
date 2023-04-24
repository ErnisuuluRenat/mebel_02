import { createSlice } from "@reduxjs/toolkit";

export const optionSlice = createSlice({
      name: 'option',
      initialState: {
            id : 126
      },
      reducers : {
            changeId : (state,action) => {
                  state.id = action.payload
            }
      }
})

export const {changeId} = optionSlice.actions;
export default optionSlice.reducer;