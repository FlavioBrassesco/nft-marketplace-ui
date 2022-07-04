import { useContext, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFundsTransferredLog,
  selectMarketplaces,
  selectTokens,
  setMarketplaces,
  setTokens,
  setError,
  setFundsTransferredLog,
  setPendingRevenue,
} from "state/salesServiceSlice";

import OnChainServicesContext from "contexts/OnChainServicesProvider";

export const useSalesService = () => {
  const dispatch = useDispatch();
  const marketplaces = useSelector(selectMarketplaces);
  const tokens = useSelector(selectTokens);
  const fundsTransferredLog = useSelector(selectFundsTransferredLog);
  const { pendingRevenue, treasuryAddress } = useSelector(
    (state) => state.salesService
  );

  const { sales } = useContext(OnChainServicesContext);

  const getAuthorizedMarketplaces = useCallback(async () => {
    sales
      .getAuthorizedMarketplaces()
      .then((marketplaces) => dispatch(setMarketplaces(marketplaces)))
      .catch((e) => {
        dispatch(setError({ error: e }));
      });
  }, [sales, dispatch]);

  useEffect(() => {
    if (marketplaces.length === 0 && sales) {
      getAuthorizedMarketplaces();
    }
  }, [marketplaces, getAuthorizedMarketplaces, sales]);

  const getApprovedTokens = useCallback(async () => {
    sales
      .getApprovedTokens()
      .then((tokens) => dispatch(setTokens(tokens)))
      .catch((e) => dispatch(setError({ error: e })));
  }, [sales, dispatch]);

  useEffect(() => {
    if (tokens.length === 0 && sales) {
      getApprovedTokens();
    }
  }, [tokens, getApprovedTokens, sales]);

  const getFundsTransferredLog = useCallback(
    async (user = null, blocks = null) => {
      sales
        .getFundsTransferredLog(user, blocks)
        .then((log) => dispatch(setFundsTransferredLog(log)))
        .catch((e) => dispatch(setError({ error: e })));
    },
    [sales, dispatch]
  );

  const getPendingRevenue = useCallback(async () => {
    sales
      .getPendingRevenue()
      .then((funds) => dispatch(setPendingRevenue(funds)))
      .catch((e) => dispatch(setError({ error: e })));
  }, [sales, dispatch]);

  return {
    getAuthorizedMarketplaces,
    marketplaces,
    getApprovedTokens,
    tokens,
    getFundsTransferredLog,
    fundsTransferredLog,
    getPendingRevenue,
    pendingRevenue,
    treasuryAddress,
  };
};
