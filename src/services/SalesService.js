const { abi } = require("services/abi/SalesService.json");
const BaseContractService = require("services/BaseContractService");

class SalesService extends BaseContractService {
  constructor(address, provider) {
    super(address, abi, provider);
  }

  async addAuthorizedMarketplace(marketplaceAddress) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .addAuthorizedMarketplace(marketplaceAddress);
    tx.wait();
    return tx;
  }

  async removeAuthorizedMarketplace(marketplaceddress) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .removeAuthorizedMarketplace(marketplaceddress);
    tx.wait();
    return tx;
  }

  async getAuthorizedMarketplaces() {
    return await this.contract.getAuthorizedMarketplaces();
  }

  async addApprovedToken(erc20Address) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .addApprovedToken(erc20Address);
    tx.wait();
    return tx;
  }

  async removeApprovedToken(erc20Address) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .removeApprovedToken(erc20Address);
    tx.wait();
    return tx;
  }

  async getApprovedTokens() {
    return await this.contract.getApprovedTokens();
  }

  async retrievePendingRevenue() {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .retrievePendingRevenue();
    tx.wait();
    return tx;
  }

  async getPendingRevenue(userAddress) {
    return await this.contract.getPendingRevenue(userAddress);
  }

  async setTreasuryAddress(treasuryAddress) {
    const tx = await this.contract
      .connect(this.provider.getSigner())
      .setTreasuryAddress(treasuryAddress);
    tx.wait();
    return tx;
  }

  async getFundsTransferredLog({ user = null }, blocks) {
    const filter = this.contract.filters.FundsTransferred(user);
    filter._event = "FundsTransferred";
    return await super._getLogs(filter, blocks);
  }
}

module.exports = SalesService;
