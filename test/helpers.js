const { ethers } = require("hardhat");

const eth$ = ethers.utils.parseEther;
const wei$eth = ethers.utils.formatEther;

const deployMinter = async (
  name,
  symbol,
  contractURI,
  baseURI,
  maxSupply,
  floorPrice
) => {
  const NFTMinter = await ethers.getContractFactory("MockERC721");
  const nftminter = await NFTMinter.deploy(
    name,
    symbol,
    contractURI,
    baseURI,
    maxSupply,
    floorPrice
  );
  await nftminter.deployed();
  return nftminter;
};
const mint = async (nftminter, address, tokensQty) => {
  for (let i = 0; i < tokensQty; i++) {
    const tx = await nftminter.mint(address, `${i}`);
    tx.wait();
  }
};

const deployManager = async () => {
  const NFTCollectionManager = await ethers.getContractFactory(
    "NFTCollectionManager"
  );
  const nftcollectionmanager = await NFTCollectionManager.deploy();
  await nftcollectionmanager.deployed();
  return nftcollectionmanager;
};

const deployMarketplace = async (managerAddress, salesServiceAddress, forwarderAddress) => {
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const nftmarketplace = await NFTMarketplace.deploy(
    managerAddress, salesServiceAddress, forwarderAddress
  );
  await nftmarketplace.deployed();
  return nftmarketplace;
};

const deployAuctions = async (maxDays, managerAddress, salesServiceAddress, forwarderAddress) => {
  const NFTAuctions = await ethers.getContractFactory("NFTAuctions");
  const nftauctions = await NFTAuctions.deploy(maxDays, managerAddress, salesServiceAddress, forwarderAddress);
  await nftauctions.deployed();
  return nftauctions;
};

const deployBuyOffers = async (maxDays, managerAddress, salesServiceAddress, forwarderAddress) => {
  const NFTBuyOffers = await ethers.getContractFactory("NFTBuyOffers");
  const nftbuyoffers = await NFTBuyOffers.deploy(maxDays, managerAddress, salesServiceAddress, forwarderAddress);
  await nftbuyoffers.deployed();
  return nftbuyoffers;
};

const deployUniFactory = async (feeToSetterAddress) => {
  const Unifactory = await ethers.getContractFactory("MockUniFactory");
  const unifactory = await Unifactory.deploy(feeToSetterAddress);
  await unifactory.deployed();
  return unifactory;
};

const deployUniRouter = async (factoryAddress, wethAddress) => {
  const UniRouter = await ethers.getContractFactory("MockUniRouter");
  const unirouter = await UniRouter.deploy(factoryAddress, wethAddress);
  await unirouter.deployed();
  return unirouter;
};

const deployERC20 = async () => {
  const ERC20 = await ethers.getContractFactory("MockERC20");
  const erc20 = await ERC20.deploy();
  await erc20.deployed();
  return erc20;
};

const deployWeth = async () => {
  const Weth = await ethers.getContractFactory("MockWeth");
  const weth = await Weth.deploy();
  await weth.deployed();
  return weth;
};

const deploySalesService = async (treasuryAddress, weth, router) => {
  const SalesService = await ethers.getContractFactory("SalesService");
  const salesservice = await SalesService.deploy(treasuryAddress, weth, router);
  await salesservice.deployed();
  return salesservice;
};

const deploySalesServiceERC20 = async (treasuryAddress, weth, erc20, router) => {
  const SalesService = await ethers.getContractFactory("SalesServiceERC20");
  const salesservice = await SalesService.deploy(treasuryAddress, weth, erc20, router);
  await salesservice.deployed();
  return salesservice;
};

const deployForwarder = async (name, version) => {
  const Forwarder = await ethers.getContractFactory("Forwarder");
  const forwarder = await Forwarder.deploy(name, version);
  await forwarder.deployed();
  return forwarder;
}


module.exports.deployMinter = deployMinter;
module.exports.deployManager = deployManager;
module.exports.deployMarketplace = deployMarketplace;
module.exports.deployAuctions = deployAuctions;
module.exports.deployBuyOffers = deployBuyOffers;
module.exports.deployWeth = deployWeth;
module.exports.deployERC20 = deployERC20;
module.exports.deployUniFactory = deployUniFactory;
module.exports.deployUniRouter = deployUniRouter;
module.exports.deploySalesService = deploySalesService;
module.exports.deploySalesServiceERC20 = deploySalesServiceERC20;
module.exports.deployForwarder = deployForwarder;
module.exports.mint = mint;
module.exports.eth$ = eth$;
module.exports.wei$eth = wei$eth;
