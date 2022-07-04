/*
Remplazar OnChainServiceFactory por CachedOnChainServiceFactory
*/
import { createContext, useRef, useContext, useEffect } from "react";

import useCoreContracts from "services/hooks/useCoreContracts";

import Web3Context from "./Web3Provider";

import OnChainServiceFactory from "services/OnChainServiceFactory";

export const OnChainServicesContext = createContext();

const onChainServiceFactory = new OnChainServiceFactory();

export function OnChainServicesProvider({ children }) {
  const { web3Provider } = useContext(Web3Context);

  const services = useRef({});
  const { contracts } = useCoreContracts();

  useEffect(() => {
    if (contracts.length) {
      const s = {};
      contracts.forEach((contract) => {
        const service = onChainServiceFactory.getService(
          contract.key,
          contract.address,
          web3Provider
        );
        if (service) s[contract.key] = service;
      });
      services.current = s;
    }
  }, [contracts, web3Provider]);

  return (
    <OnChainServicesContext.Provider value={{ ...services.current }}>
      {children}
    </OnChainServicesContext.Provider>
  );
}

export default OnChainServicesContext;
