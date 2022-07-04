const { abi } = require("services/abi/NFTBuyOffers.json");
const BaseContractService = require("services/BaseContractService");

class BuyOfferService extends BaseContractService {
  constructor(address, provider) {
    super(address, abi, provider);
  }

  async getAllOffers(collectionAddress, tokenId) {
    const count = await this.contract.getAllOffersCount(
      collectionAddress,
      tokenId
    );

    if (count.gt(0)) {
      const offers = await Promise.all(
        [...Array(count.toNumber())].map(async (v, i) => {
          return await this.contract.offerByIndex(
            collectionAddress,
            tokenId,
            i
          );
        })
      );
      return offers;
    }
  }

  async getAllUserOffers(userAddress, collectionAddress) {
    const count = await this.contract.getUserOffersCount(
      userAddress,
      collectionAddress
    );

    if (count.gt(0)) {
      const offers = await Promise.all(
        [...Array(count.toNumber())].map(async (v, i) => {
          const offer = await this.contract.offerOfUserByIndex(
            userAddress,
            collectionAddress,
            i
          );
          const result = [userAddress, offer];
          result.user = userAddress;
          result.bid = offer;
          return result;
        })
      );
      return offers;
    }
  }

  async createOffer(collectionAddress, tokenId, erc20Address, amountIn) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .createOffer(collectionAddress, tokenId, erc20Address, amountIn);
    tx.wait();
    return tx;
  }

  async cancelOffer(collectionAddress, tokenId) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .cancelOffer(collectionAddress, tokenId);
    tx.wait();
    return tx;
  }

  async acceptOffer(collectionAddress, tokenId, bidder) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .acceptOffer(collectionAddress, tokenId, bidder);
    tx.wait();
    return tx;
  }

  async getOfferCreatedLog(
    { bidder = null, collectionAddress = null, tokenId = null },
    blocks
  ) {
    const filter = this.contract.filters.OfferCreated(
      bidder,
      collectionAddress,
      tokenId
    );
    filter._event = "OfferCreated";
    return await super._getLogs(filter, blocks);
  }

  async getOfferStatusChangedLog(
    { bidder = null, collectionAddress = null, tokenId = null },
    blocks
  ) {
    const filter = this.contract.filters.OfferStatusChanged(
      bidder,
      collectionAddress,
      tokenId
    );
    filter._event = "OfferStatusChanged";

    return await super._getLogs(filter, blocks);
  }
}
module.exports = BuyOfferService;
