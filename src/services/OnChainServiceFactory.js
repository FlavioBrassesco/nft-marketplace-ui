import ManagerService from "services/ManagerService";
import SalesService from "services/SalesService";
import BuyOfferService from "services/BuyOfferService";
import AuctionService from "services/AuctionService";
import MarketplaceService from "services/MarketplaceService";

export default class OnChainServiceFactory {
  getService(key = null, address, provider) {
    switch (key) {
      case "manager":
        return new ManagerService(address, provider);
      case "sales":
        return new SalesService(address, provider);
      case "marketplace":
        return new MarketplaceService(address, provider);
      case "buyoffer":
        return new BuyOfferService(address, provider);
      case "auction":
        return new AuctionService(address, provider);
      default:
        return null;
    }
  }
}
