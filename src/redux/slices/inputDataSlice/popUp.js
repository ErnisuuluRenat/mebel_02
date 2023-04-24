import { createSlice } from "@reduxjs/toolkit";

const popUpSlice = createSlice({
      name : 'popup',
      initialState: {
            showPopUp : false,
      },
      reducers : {
            showPop : (state) => {
                  state.showPopUp = true
            },
            closePop : (state) => {
                  state.showPopUp = false
            }
      }
})

export const {showPop, closePop} = popUpSlice.actions;
export default popUpSlice.reducer