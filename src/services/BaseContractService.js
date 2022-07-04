const { ethers } = require("ethers");

class BaseContractService {
  constructor(address, abi, web3Provider) {
    this.address = address;
    this.abi = abi;
    this.provider = web3Provider;
    this.contract = this._getContract(address, abi, web3Provider);
    this.interface = new ethers.utils.Interface(abi);
  }

  _getContract(address, abi, provider) {
    return new ethers.Contract(address, abi, provider);
  }

  async _getLogs(filter, blocks = 10000) {
    const bn = await this.provider.getBlockNumber();
    filter.fromBlock = bn - blocks || 0;
    filter.toBlock = "latest";

    const logs = await this.provider.getLogs(filter);
    const decodedEvents = logs.map((log) =>
      this.interface.decodeEventLog(filter._event, log.data, log.topics)
    );
    return decodedEvents;
  }
}

module.exports = BaseContractService;
