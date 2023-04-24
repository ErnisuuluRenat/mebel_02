import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOptions = createAsyncThunk('options', async () => {
      const token = localStorage.getItem('token');

      const config = {
        headers : {
          Authorization: `Bearer ${token}`,
        }
      }
    
      const { data } = await axios.get(
        "http://46.8.43.42:8080/api/v1/authenticated/paper/all",config
      );
      return data;
});