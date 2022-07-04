const { abi } = require("services/abi/NFTMarketplace.json");
const BaseContractService = require("services/BaseContractService");

class MarketplaceService extends BaseContractService {
  constructor(address, provider) {
    super(address, abi, provider);
  }

  async getItem(collectionAddress, tokenId) {
    const { seller, price } = await this.contract.items(
      collectionAddress,
      tokenId
    );
    return {
      seller,
      price,
      collectionAddress,
      tokenId,
    };
  }

  async getAllItems(collectionAddress) {
    const count = await this.contract.getAllItemsCount(collectionAddress);
    if (count.gt(0)) {
      const items = await Promise.all(
        [...Array(count.toNumber())].map(async (v, i) => {
          return this.contract.itemByIndex(collectionAddress, i);
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

  async createItem(collectionAddress, tokenId, price) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .createItem(collectionAddress, tokenId, price);
    tx.wait();
    return tx;
  }

  async updateItem(collectionAddress, tokenId, price) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .updateItem(collectionAddress, tokenId, price);
    tx.wait();
    return tx;
  }

  async cancelItem(collectionAddress, tokenId) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .cancelItem(collectionAddress, tokenId);
    tx.wait();
    return tx;
  }

  async buy(collectionAddress, tokenId, erc20Address, amountIn) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .buy(collectionAddress, tokenId, erc20Address, amountIn);
    tx.wait();
    return tx;
  }

  async getTransferredLog(
    { seller = null, collection = null, tokenId = null },
    blocks
  ) {
    const filter = this.contract.filters.ItemTransferred(
      seller,
      null,
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

  async getUpdatedLog(
    { seller = null, collection = null, tokenId = null },
    blocks
  ) {
    const filter = this.contract.filters.ItemUpdated(
      seller,
      collection,
      tokenId
    );
    filter._event = "ItemUpdated";
    return await super._getLogs(filter, blocks);
  }
}

module.exports = MarketplaceService;
