import {
  useReducer,
  createContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};

const defaultWeb3Provider = new ethers.providers.JsonRpcProvider(
  "http://localhost:8545"
);

const getWeb3Modal = (function () {
  let instance = null;
  return () => {
    if (!instance && typeof window !== "undefined") {
      instance = new Web3Modal({
        cacheProvider: true,
        providerOptions,
      });
    }
    return instance;
  };
})();

export const Web3Context = createContext();

const initialState = {
  address: null,
  chainId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}

export function Web3Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const web3Provider = useRef(defaultWeb3Provider);
  const provider = useRef(null);

  const connect = useCallback(async function () {
    try {
      // This is the initial `provider` that is returned when
      // using web3Modal to connect. Can be MetaMask or WalletConnect.
      provider.current = await getWeb3Modal().connect();

      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      web3Provider.current = new ethers.providers.Web3Provider(
        provider.current
      );

      const signer = web3Provider.current.getSigner();
      const address = await signer.getAddress();

      const network = await web3Provider.current.getNetwork();

      dispatch({
        type: "SET_WEB3_PROVIDER",
        address,
        chainId: network.chainId,
      });
    } catch (error) {
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    }
  }, []);

  const disconnect = useCallback(
    async function () {
      await getWeb3Modal().clearCachedProvider();
      if (
        provider.current?.disconnect &&
        typeof provider.current.disconnect === "function"
      ) {
        await provider.current.disconnect();
        provider.current = null;
        web3Provider.current = defaultWeb3Provider;
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  // Auto connect to the cached provider
  useEffect(() => {
    if (getWeb3Modal().cachedProvider) {
      connect();
    }
  }, [connect]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider.current?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.current.on("accountsChanged", handleAccountsChanged);
      provider.current.on("chainChanged", handleChainChanged);
      provider.current.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.current.removeListener) {
          provider.current.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          provider.current.removeListener("chainChanged", handleChainChanged);
          provider.current.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return (
    <Web3Context.Provider
      value={{
        ...state,
        web3Provider: web3Provider.current,
        connect,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export default Web3Context;
