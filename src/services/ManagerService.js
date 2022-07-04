const { abi } = require("services/abi/NFTCollectionManager.json");
const BaseContractService = require("services/BaseContractService");

class ManagerService extends BaseContractService {
  constructor(address, provider) {
    super(address, abi, provider);
  }

  async getCollectionData(address) {
    return {
      address,
      fee: await this.contract.getFee(address),
      floorPrice: await this.contract.getFloorPrice(address),
      isWhitelisted: await this.contract.isWhitelistedCollection(address),
    };
  }

  async getAllCollections() {
    const count = await this.contract.getCollectionsCount();

    if (count.gt(0)) {
      const collections = await Promise.all(
        [...Array(count.toNumber())].map(async (a, i) => {
          const address = await this.contract.collectionByIndex(i);
          return this.getCollectionData(address);
        })
      );

      return collections;
    }
  }

  async addWhitelistedCollection(address) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .addWhitelistedCollection(address, true);
    tx.wait();
    return tx;
  }

  async setFee(address, fee) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .setFee(address, fee);
    tx.wait();
    return tx;
  }

  async setFloorPrice(address, floorPrice) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .setFloorPrice(address, floorPrice);
    tx.wait();
    return tx;
  }
}

module.exports = ManagerService;

const schemas = `
o2m (collection to items)
collection {
  id
  address
  fee
  floorPrice
  whitelistStatus
  !cmetadataId
}

o2m (item to offers) 
o2o (item to user)
o2o (item to metadata)
item {
  id
  tokenId
  !address
  !owner
  price
  status
  ?currentBidder
  ?currentBid
  ?endsAt
  offers[id]
  !metadataId
}

user {
  id
  address
  items[id]
  offers[id]
}

offer {
  id
  !itemId
  !userId
  price
}

metadata {
  id
  !itemId
  img
  traits[{}]
}

cmetadata {
  id
  !collectionId
  img
  banner
  description
  etc
}
`;
