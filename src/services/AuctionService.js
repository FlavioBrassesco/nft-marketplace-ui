const { abi } = require("services/abi/NFTAuctions.json");
const BaseContractService = require("services/BaseContractService");

class AuctionService extends BaseContractService {
  constructor(address, provider) {
    super(address, abi, provider);
  }

  async getItem(collectionAddress, tokenId) {
    const { seller, currentBidder, currentBid, endsAt } =
      await this.contract.items(collectionAddress, tokenId);
    // match result expected from a contract's method call
    const result = [
      seller,
      currentBidder,
      currentBid,
      endsAt,
      collectionAddress,
      tokenId,
    ];
    result.seller = seller;
    result.currentBidder = currentBidder;
    result.currentBid = currentBid;
    result.endsAt = endsAt;
    result.collectionAddress = collectionAddress;
    result.tokenId = tokenId;

    return result;
  }

  async getAllItems(collectionAddress) {
    const count = await this.contract.getAllItemsCount(collectionAddress);
    if (count.gt(0)) {
      const items = await Promise.all(
        [...Array(count.toNumber())].map(async (v, i) => {
          return await this.contract.itemByIndex(collectionAddress, i);
        })
      );
      return items;
    }
  }

  async getAllItemsFromUser(userAddress, collectionAddress) {
    const count = await this.contract.getUserItemsCount(
      userAddress,
      collectionAddress
    );
    if (count.gt(0)) {
      const items = await Promise.all(
        [...Array(count.toNumber())].map(async (v, i) => {
          return await this.contract.itemOfUserByIndex(
            userAddress,
            collectionAddress,
            i
          );
        })
      );
      return items;
    }
  }

  async createItem(collectionAddress, tokenId, floorPrice, days) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .createItem(collectionAddress, tokenId, floorPrice, days);
    tx.wait();
    return tx;
  }

  async bid(collectionAddress, tokenId, erc20Address, amountIn) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .bid(collectionAddress, tokenId, erc20Address, amountIn);
    tx.wait();
    return tx;
  }

  async finishAuction(collectionAddress, tokenId) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .finishAuction(collectionAddress, tokenId);
    tx.wait();
    return tx;
  }

  async getTransferredLog(
    { to = null, collection = null, tokenId = null },
    blocks
  ) {
    const filter = this.contract.filters.ItemTransferred(
      to,
      collection,
      tokenId
    );
    filter._event = "ItemTransferred";
    return await super._getLogs(filter, blocks);
  }

  async getCreatedLog(
    { seller = null, collection = null, tokenId = null },
    blocks
  ) {
    const filter = this.contract.filters.ItemCreated(
      seller,
      collection,
      tokenId
    );
    filter._event = "ItemCreated";
    return await super._getLogs(filter, blocks);
  }

  async getBidCreatedLog(
    { bidder = null, collection = null, tokenId = null },
    blocks
  ) {
    const filter = this.contract.filters.BidCreated(
      bidder,
      collection,
      tokenId
    );
    filter._event = "BidCreated";
    return await super._getLogs(filter, blocks);
  }
}

module.exports = AuctionService;
