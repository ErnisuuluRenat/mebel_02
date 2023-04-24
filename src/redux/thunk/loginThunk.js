import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('auth/login', async (formData) => {
      const response = await axios.post("http://46.8.43.42:8080/auth/login", formData);
      console.log(response.data);
      return response.data
})

const authSlice = createSlice({
      name : 'auth',
      initialState : {
            isAuthenticated: false,
            user : null,
            isLoading : false,
            isError : false,
            isSuccess: false,
            errorMessage : '',
            token: null,
      },

      reducers: {
            logout : (state,action) => {
                  state.isAuthenticated = false,
                  state.user = null,
                  localStorage.removeItem('token')
            }
      },
      extraReducers : (builder) => {
            builder
            .addCase(login.pending, (state) => {
                  state.isLoading = true
            }) 
            .addCase(login.fulfilled, (state, action) => {
                  if (action.payload['message'] === 'Incorrect credentials!') {
                        state.isError = true
                        state.isAuthenticated = false;
                        state.user = null;
                  } else {
                  state.isLoading = false;
                  state.isError = false;
                  state.isSuccess = true;
                  state.isAuthenticated = true;
                  state.user = action.payload;
                  localStorage.setItem('token', action.payload['jwt-token'])
                  }
                  
            })
            .addCase(login.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.isSuccess = false;
                  state.errorMessage = action.error.message;
                });
      }
});

export const {logout} = authSlice.actions

export default authSlice.reducer;