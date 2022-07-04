const { expect } = require("chai");
const { waffle, ethers } = require("hardhat");
const { deployMockContract, provider } = waffle;
const { deployBuyOffers } = require("../helpers");
const buyofferJSON = require("services/abi/NFTBuyOffers.json");
const managerJSON = require("services/abi/NFTCollectionManager.json");
const salesJSON = require("services/abi/SalesService.json");
const BuyOfferService = require("services/BuyOfferService");

describe("BuyOfferService", () => {
  let owner, other;
  let mockBuyOffers,
    buyoffers,
    mockBuyOfferService,
    buyOfferService,
    mockManager,
    mockSales;

  beforeAll(async () => {
    [owner, other] = provider.getWallets();

    mockBuyOffers = await deployMockContract(owner, buyofferJSON.abi);
    mockManager = await deployMockContract(owner, managerJSON.abi);
    mockSales = await deployMockContract(owner, salesJSON.abi);

    mockBuyOfferService = new BuyOfferService(mockBuyOffers.address, provider);
  });

  beforeEach(async () => {
    buyoffers = await deployBuyOffers(
      7,
      mockManager.address,
      mockSales.address,
      other.address
    );
    buyOfferService = new BuyOfferService(buyoffers.address, provider);
  });

  it("Should get all offers", async () => {
    await mockBuyOffers.mock.getAllOffersCount.returns(1);
    await mockBuyOffers.mock.offerByIndex.returns(
      owner.address,
      ethers.utils.parseEther("1.0")
    );

    const result = await mockBuyOfferService.getAllOffers(other.address, 0);

    expect(result).to.have.length(1);
    expect(result[0]).to.have.property("user").and.to.equal(owner.address);
    expect(result[0])
      .to.have.property("bid")
      .and.to.equal(ethers.utils.parseEther("1.0"));
  });

  it("Should get all user offers", async () => {
    await mockBuyOffers.mock.getUserOffersCount.returns(1);
    await mockBuyOffers.mock.offerOfUserByIndex.returns(
      ethers.utils.parseEther("1.0")
    );

    const result = await mockBuyOfferService.getAllUserOffers(
      owner.address,
      other.address
    );

    expect(result).to.have.length(1);
    expect(result[0]).to.have.property("user").and.to.equal(owner.address);
    expect(result[0])
      .to.have.property("bid")
      .and.to.equal(ethers.utils.parseEther("1.0"));
  });

  it("Should create offer", async () => {
    await mockBuyOffers.mock.createOffer.returns();

    expect(
      await mockBuyOfferService.createOffer(
        other.address,
        0,
        ethers.constants.AddressZero,
        0
      )
    ).to.have.property("hash");
  });

  it("Should cancel offer", async () => {
    await mockBuyOffers.mock.cancelOffer.returns();

    expect(
      await mockBuyOfferService.cancelOffer(other.address, 0)
    ).to.have.property("hash");
  });

  it("Should accept offer", async () => {
    await mockBuyOffers.mock.acceptOffer.returns();

    expect(
      await mockBuyOfferService.acceptOffer(other.address, 0, other.address)
    ).to.have.property("hash");
  });

  it("Should get OfferCreated log", async () => {
    await mockManager.mock.isWhitelistedCollection.returns(true);
    await mockSales.mock.approvePayment.returns(ethers.utils.parseEther("1.0"));

    const tx = await buyoffers
      .connect(owner)
      .createOffer(other.address, 0, ethers.constants.AddressZero, 0, {
        value: ethers.utils.parseEther("1.0"),
      });
    tx.wait();
    const logs = await buyOfferService.getOfferCreatedLog({});

    expect(logs).to.have.length(1);
    expect(logs[0]).to.have.property("bidder").and.to.equal(owner.address);
    expect(logs[0])
      .to.have.property("collectionAddress")
      .and.to.equal(other.address);
    expect(logs[0])
      .to.have.property("tokenId")
      .and.to.equal(ethers.BigNumber.from(0));
    expect(logs[0])
      .to.have.property("bid")
      .and.to.equal(ethers.utils.parseEther("1.0"));
  });

  it.only("Should get OfferCreated log", async () => {
    await mockManager.mock.isWhitelistedCollection.returns(true);
    await mockSales.mock.approvePayment.returns(ethers.utils.parseEther("1.0"));

    const tx = await buyoffers
      .connect(owner)
      .createOffer(other.address, 0, ethers.constants.AddressZero, 0, {
        value: ethers.utils.parseEther("1.0"),
      });
    tx.wait();

    await mockSales.mock.unlockPendingRevenue.returns();

    const txc = await buyoffers.connect(owner).cancelOffer(other.address, 0);
    txc.wait();

    const logs = await buyOfferService.getOfferStatusChangedLog({});
    console.log(logs);
    expect(logs).to.have.length(1);
    expect(logs[0]).to.have.property("bidder").and.to.equal(owner.address);
    expect(logs[0])
      .to.have.property("collectionAddress")
      .and.to.equal(other.address);
    expect(logs[0])
      .to.have.property("tokenId")
      .and.to.equal(ethers.BigNumber.from(0));
    expect(logs[0])
      .to.have.property("bid")
      .and.to.equal(ethers.utils.parseEther("1.0"));
    expect(logs[0]).to.have.property("accepted").and.to.equal(false);
  });
});
