import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { connect, disconnect, setAddress } from "slices/web3ProviderSlice";

export default function Web3Events({ children }) {
  const web3Modal = useSelector((state) => state.web3Provider.web3Modal);
  const provider = useSelector((state) => state.web3Provider.provider);

  const dispatch = useDispatch();
  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      dispatch(connect());
    }
  }, [web3Modal, dispatch]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch(setAddress(accounts[0]));
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        dispatch(disconnect());
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, dispatch]);

  return <>{children}</>;
}
