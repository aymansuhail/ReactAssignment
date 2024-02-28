// leadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLeadsContent = createAsyncThunk('/leads/content', async () => {
  const response = await axios.get('http://127.0.0.1:8090/api/collections/Drivers/records', {});
  return response.data.items;
});

export const addNewLeadAsync = createAsyncThunk('leads/addNewLead', async (newLeadObj) => {
  const response = await axios.post('http://127.0.0.1:8090/api/collections/Drivers/records', newLeadObj);
  return response.data;
});
export const deleteLeadAsync = createAsyncThunk('leads/deleteLead', async (leadId) => {
  await axios.delete(`http://127.0.0.1:8090/api/collections/Drivers/records/${leadId}`);
  return leadId; // Return the deleted lead ID to use in the reducer
});

export const leadsSlice = createSlice({
  name: 'leads',
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewLead: (state, action) => {
      let { newLeadObj } = action.payload;
      state.leads = [...state.leads, newLeadObj];
    },

    deleteLead: (state, action) => {
      let { index } = action.payload;
      state.leads.splice(index, 1);
    },
  },

  extraReducers: {
    [getLeadsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeadsContent.fulfilled]: (state, action) => {
      state.leads = action.payload;
      state.isLoading = false;
    },
    [getLeadsContent.rejected]: (state) => {
      state.isLoading = false;
    },
    [addNewLeadAsync.fulfilled]: (state, action) => {
      state.leads = [...state.leads, action.payload];
    },
    [deleteLeadAsync.fulfilled]: (state, action) => {
      // Remove the deleted lead from the state
      const deletedLeadId = action.payload;
      state.leads = state.leads.filter((lead) => lead.id !== deletedLeadId);
    },
  },
});


export const { addNewLead, deleteLead } = leadsSlice.actions;

export default leadsSlice.reducer;
