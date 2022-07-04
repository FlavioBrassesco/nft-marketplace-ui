import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  marketplaces: [],
  tokens: [],
  fundsTransferredLog: [],
  treasuryAddress: "",
  pendingRevenue: "",
  error: null,
};

const coreContractsSlice = createSlice({
  name: "salesService",
  initialState,
  reducers: {
    setMarketplaces(state, action) {
      state.marketplaces = action.payload;
    },
    setTokens(state, action) {
      state.tokens = action.payload;
    },
    setTreasuryAddress(state, action) {
      state.treasuryAddress = action.payload;
    },
    setFundsTransferredLog(state, action) {
      state.fundsTransferredLog = action.payload;
    },
    setPendingRevenue(state, action) {
      state.pendingRevenue = action.payload;
    },
    setError(state, action) {
      state.error = action.payload.error.message;
    },
  },
});

export const {
  setMarketplaces,
  setTokens,
  setTreasuryAddress,
  setFundsTransferredLog,
  setPendingRevenue,
  setError,
} = coreContractsSlice.actions;

export default coreContractsSlice.reducer;

export const selectMarketplaces = (state) => state.salesService.marketplaces;
export const selectTokens = (state) => state.salesService.tokens;
export const selectFundsTransferredLog = (state) =>
  state.salesService.fundsTransferredLog;

/*
usar hooks para cada servicio, actualizar estado de manera sincrona
*/
