export default function connectEthers(address, abi) {
    const ethers = require("ethers");
  
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
    );
  
    return new ethers.Contract(address, abi, provider);
  }
  