import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadTokenFromStorage = () => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      return token;
    }

export const login = createAsyncThunk('auth/login', async (formData) => {
      const response = await axios.post("http://46.8.43.42:8080/auth/login", formData);
      return response.data
})

const authSlice = createSlice({
      name : 'auth',
      initialState : {
            isAuthenticated: !!loadTokenFromStorage(),
            user : null,
            isLoading : false,
            isError : false,
            isSuccess: false,
            errorMessage : '',
            token: loadTokenFromStorage(),
      },

      reducers: {
            logout : (state) => {
                  state.isAuthenticated = false;
                  state.user = null;
                  localStorage.removeItem('token');
                  delete axios.defaults.headers.common.Authorization;
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
                  state.token = action.payload['jwt-token'];
                  localStorage.setItem('token', state.token);
                  axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
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