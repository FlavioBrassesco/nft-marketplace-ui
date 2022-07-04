import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import CoreContractService from "services/CoreContractService";

const coreContractService = new CoreContractService();

const coreContractsAdapter = createEntityAdapter();

const initialState = coreContractsAdapter.getInitialState({
  status: "idle",
  error: null,
});

// thunks
export const fetch = createAsyncThunk("coreContracts/fetch", async () => {
  const { data } = await coreContractService.getAll();
  return data;
});

export const update = createAsyncThunk(
  "coreContracts/update",
  async ({ id, key, address }) => {
    const { data } = await coreContractService.update({ id, key, address });
    return data;
  }
);

export const remove = createAsyncThunk("coreContracts/remove", async (id) => {
  const { status } = await coreContractService.delete(id);
  return id;
});

export const add = createAsyncThunk(
  "coreContracts/add",
  async ({ key, address }) => {
    const { data } = await coreContractService.add({ key, address });
    return data;
  }
);

const coreContractsSlice = createSlice({
  name: "coreContracts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.status = "success";
        coreContractsAdapter.setAll(state, action.payload);
      })
      .addCase(fetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.status = "success";
        coreContractsAdapter.upsertOne(state, action.payload);
      })
      .addCase(update.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.status = "success";
        coreContractsAdapter.addOne(state, action.payload);
      })
      .addCase(add.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.status = "success";
        coreContractsAdapter.removeOne(state, action.payload);
      })
      .addCase(remove.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { action1 } = coreContractsSlice.actions;

export const { selectAll, selectById, selectIds } =
  coreContractsAdapter.getSelectors((state) => state.coreContracts);

export default coreContractsSlice.reducer;
