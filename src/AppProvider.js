import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import coreContractsReducer from "state/coreContractsSlice";
import salesServiceReducer from "state/salesServiceSlice";
import { Web3Provider } from "contexts/Web3Provider";
import { OnChainServicesProvider } from "contexts/OnChainServicesProvider";

const store = configureStore({
  reducer: {
    coreContracts: coreContractsReducer,
    salesService: salesServiceReducer,
  },
});

export default function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <Web3Provider>
        <OnChainServicesProvider>{children}</OnChainServicesProvider>
      </Web3Provider>
    </Provider>
  );
}
