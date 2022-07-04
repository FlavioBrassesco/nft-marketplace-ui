const { ethers } = require("ethers");
const { abi } = require("services/abi/MockERC721.json");
const BaseContractService = require("services/BaseContractService");

class CollectionService extends BaseContractService {
  constructor(address, provider) {
    super(address, abi, provider);
  }

  async getCollectionData() {
    return {
      name: await this.contract.name(),
      symbol: await this.contract.symbol(),
      address: this.address,
      metadataURL: await this.contract.contractURI(),
      supply: await this.contract.totalSupply(),
    };
  }

  async getToken(tokenId) {
    const collectionURI = await this.contract.contractURI();
    const tokenURI = await this.contract.tokenURI(tokenId);
    const owner = await this.contract.ownerOf(tokenId);

    return {
      address: this.address,
      tokenId,
      owner,
      collectionURI,
      tokenURI,
    };
  }

  async getAllTokens() {
    const totalSupply = await this.contract.totalSupply();
    if (totalSupply.gt(0)) {
      const tokens = await Promise.all(
        [...Array(totalSupply.toNumber())].map(async (t, i) => {
          const tokenId = await this.contract.tokenByIndex(i);
          return this.getToken(tokenId);
        })
      );
      return tokens;
    }
  }

  async mint() {
    const totalSupply = await this.contract.totalSupply();
    const signer = this.provider.getSigner();
    const address = await signer.getAddress();

    const tx = await this.contract
      .connect(signer)
      .mint(address, `${totalSupply}.json`);
    tx.wait();
    return tx;
  }

  async getTransferLog({ from = null, to = null, tokenId = null }, blocks) {
    const filter = this.contract.filters.Transfer(from, to, tokenId);
    filter._event = "Transfer";
    return await super._getLogs(filter, blocks);
  }

  async getMintLog({ to = null, tokenId = null }, blocks) {
    return await this.getTransferLog(
      {
        from: ethers.constants.AddressZero,
        to,
        tokenId,
      },
      blocks
    );
  }
}

module.exports = CollectionService;
