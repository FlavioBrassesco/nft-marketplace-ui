const { expect } = require("chai");
const { waffle, ethers } = require("hardhat");
const { deployMockContract, provider } = waffle;
const AuctionService = require("services/AuctionService");
const auctionJSON = require("services/abi/NFTAuctions.json");
const managerJson = require("services/abi/NFTCollectionManager.json");
const salesserviceJSON = require("services/abi/SalesService.json");
const forwarderJSON = require("services/abi/Forwarder.json");
const erc721JSON = require("services/abi/MockERC721.json");

const { deployAuctions } = require("../helpers");

describe("AuctionService", () => {
  let auctions,
    auctionService,
    mockERC721,
    mockForwarder,
    mockManager,
    mockAuctions,
    mockAuctionService,
    mockSalesService;
  let owner, other;

  beforeAll(async () => {
    [owner, other] = provider.getWallets();

    mockManager = await deployMockContract(owner, managerJson.abi);
    mockSalesService = await deployMockContract(owner, salesserviceJSON.abi);
    mockForwarder = await deployMockContract(owner, forwarderJSON.abi);
    mockAuctions = await deployMockContract(owner, auctionJSON.abi);
    mockERC721 = await deployMockContract(owner, erc721JSON.abi);

    auctions = await deployAuctions(
      7,
      mockManager.address,
      mockSalesService.address,
      mockForwarder.address
    );

    // For faster testing service methods.
    mockAuctionService = new AuctionService(mockAuctions.address, provider);

    // For testing logs, since mock contract does not emit events
    auctionService = new AuctionService(auctions.address, provider);
  });

  it("Should return an item", async () => {
    await mockAuctions.mock.items.returns(
      owner.address,
      ethers.constants.AddressZero,
      ethers.utils.parseEther("1.0"),
      123456
    );

    const result = await mockAuctionService.getItem(mockERC721.address, 0);

    expect(result).to.have.property("seller").and.to.equal(owner.address);
    expect(result).to.have.property("endsAt").and.to.equal(123456);
    expect(result)
      .to.have.property("currentBidder")
      .and.to.equal(ethers.constants.AddressZero);
    expect(result)
      .to.have.property("currentBid")
      .and.to.equal(ethers.utils.parseEther("1.0"));
    expect(result)
      .to.have.property("collectionAddress")
      .and.to.equal(mockERC721.address);
    expect(result).to.have.property("tokenId").and.to.equal(0);
  });

  it("Should return all items", async () => {
    await mockAuctions.mock.getAllItemsCount.returns(1);
    await mockAuctions.mock.itemByIndex.returns(
      owner.address,
      ethers.constants.AddressZero,
      ethers.utils.parseEther("1.0"),
      123456,
      mockERC721.address,
      0
    );

    const result = await mockAuctionService.getAllItems(mockERC721.address);

    expect(result).to.have.length(1);
    expect(result[0]).to.have.property("seller").and.to.equal(owner.address);
  });

  it("Should return all items from user", async () => {
    await mockAuctions.mock.getUserItemsCount.returns(1);
    await mockAuctions.mock.itemOfUserByIndex.returns(
      owner.address,
      ethers.constants.AddressZero,
      ethers.utils.parseEther("1.0"),
      123456,
      mockERC721.address,
      0
    );

    const result = await mockAuctionService.getAllItemsFromUser(
      owner.address,
      mockERC721.address
    );

    expect(result).to.have.length(1);
    expect(result[0]).to.have.property("seller").and.to.equal(owner.address);
  });

  it("Should create an item", async () => {
    await mockAuctions.mock.createItem.returns();
    expect(
      await mockAuctionService.createItem(
        mockERC721.address,
        0,
        ethers.utils.parseEther("1.0"),
        7
      )
    ).to.have.property("hash");
  });

  it("Should bid for an item", async () => {
    await mockAuctions.mock.bid.returns();
    expect(
      await mockAuctionService.bid(
        mockERC721.address,
        0,
        ethers.constants.AddressZero,
        0
      )
    ).to.have.property("hash");
  });

  it("Should finish an auction", async () => {
    await mockAuctions.mock.finishAuction.returns();
    expect(
      await mockAuctionService.finishAuction(mockERC721.address, 0)
    ).to.have.property("hash");
  });

  it("Should return ItemCreated Log", async () => {
    await mockManager.mock.isWhitelistedCollection.returns(true);
    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();

    const tx = await auctions
      .connect(owner)
      .createItem(mockERC721.address, 0, ethers.utils.parseEther("1.0"), 7);
    tx.wait();

    const logs = await auctionService.getCreatedLog({});

    expect(logs).to.have.length(1);
    expect(logs[0]).to.have.property("seller").and.to.equal(owner.address);
    expect(logs[0])
      .to.have.property("collectionAddress")
      .and.to.equal(mockERC721.address);
    expect(logs[0]).to.have.property("tokenId").and.to.equal(0);
    expect(logs[0])
      .to.have.property("price")
      .and.to.equal(ethers.utils.parseEther("1.0"));
    expect(logs[0]).to.have.property("endsAt");
  });

  it("Should return BidCreated Log", async () => {
    await mockManager.mock.isWhitelistedCollection.returns(true);
    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();

    const tx = await auctions
      .connect(owner)
      .createItem(mockERC721.address, 0, ethers.utils.parseEther("1.0"), 7);
    tx.wait();

    await mockSalesService.mock.approvePayment.returns(
      ethers.utils.parseEther("1.0")
    );

    const txb = await auctions
      .connect(other)
      .bid(mockERC721.address, 0, ethers.constants.AddressZero, 0, {
        value: ethers.utils.parseEther("1.0"),
      });
    txb.wait();

    const logs = await auctionService.getBidCreatedLog({});

    expect(logs).to.have.length(1);
    expect(logs[0])
      .to.have.property("currentBidder")
      .and.to.equal(other.address);
    expect(logs[0])
      .to.have.property("collectionAddress")
      .and.to.equal(mockERC721.address);
    expect(logs[0]).to.have.property("tokenId").and.to.equal(0);
    expect(logs[0])
      .to.have.property("currentBid")
      .and.to.equal(ethers.utils.parseEther("1.0"));
    expect(logs[0]).to.have.property("endsAt");
  });

  it("Should return ItemTransferred Log", async () => {
    await mockManager.mock.isWhitelistedCollection.returns(true);
    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();

    const tx = await auctions
      .connect(owner)
      .createItem(mockERC721.address, 0, ethers.utils.parseEther("1.0"), 7);
    tx.wait();

    await ethers.provider.send("evm_increaseTime", [605000]);

    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();

    const txf = await auctions
      .connect(owner)
      .finishAuction(mockERC721.address, 0);
    txf.wait();

    const logs = await auctionService.getTransferredLog({});

    expect(logs).to.have.length(1);
    expect(logs[0]).to.have.property("from").and.to.equal(owner.address);
    expect(logs[0]).to.have.property("to").and.to.equal(owner.address);
    expect(logs[0])
      .to.have.property("collectionAddress")
      .and.to.equal(mockERC721.address);
    expect(logs[0]).to.have.property("tokenId").and.to.equal(0);
    expect(logs[0])
      .to.have.property("price")
      .and.to.equal(ethers.utils.parseEther("1.0"));
    expect(logs[0]).to.have.property("sold").and.to.equal(false);
  });
});
