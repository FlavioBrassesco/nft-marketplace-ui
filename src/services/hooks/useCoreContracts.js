import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetch, selectAll } from "state/coreContractsSlice";

export default function useCoreContracts() {
  const contracts = useSelector(selectAll);
  const dispatch = useDispatch();
  useEffect(() => {
    if (contracts.length === 0) {
      dispatch(fetch());
    }
  }, [contracts, dispatch]);

  return { contracts };
}
