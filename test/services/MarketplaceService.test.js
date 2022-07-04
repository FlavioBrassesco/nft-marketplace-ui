const { expect } = require("chai");
const { waffle, ethers } = require("hardhat");
const { deployMockContract, provider } = waffle;
const MarketplaceService = require("services/MarketplaceService");
const marketplaceJSON = require("services/abi/NFTMarketplace.json");
const managerJson = require("services/abi/NFTCollectionManager.json");
const salesserviceJSON = require("services/abi/SalesService.json");
const forwarderJSON = require("services/abi/Forwarder.json");
const erc721JSON = require("services/abi/MockERC721.json");

const { deployMarketplace } = require("../helpers");

describe("MarketplaceService", () => {
  let marketplace,
    marketplaceService,
    mockERC721,
    mockForwarder,
    mockManager,
    mockMarketplace,
    mockMarketplaceService,
    mockSalesService;
  let owner;

  beforeAll(async () => {
    [owner] = provider.getWallets();

    mockManager = await deployMockContract(owner, managerJson.abi);
    mockSalesService = await deployMockContract(owner, salesserviceJSON.abi);
    mockForwarder = await deployMockContract(owner, forwarderJSON.abi);
    mockMarketplace = await deployMockContract(owner, marketplaceJSON.abi);
    mockERC721 = await deployMockContract(owner, erc721JSON.abi);

    marketplace = await deployMarketplace(
      mockManager.address,
      mockSalesService.address,
      mockForwarder.address
    );

    // For faster testing service methods.
    mockMarketplaceService = new MarketplaceService(
      mockMarketplace.address,
      provider
    );

    // For testing logs, since mock contract does not emit events
    marketplaceService = new MarketplaceService(marketplace.address, provider);
  });

  it("Should return marketplace item", async () => {
    await mockMarketplace.mock.items.returns(
      owner.address,
      ethers.utils.parseEther("1.0")
    );

    expect(
      await mockMarketplaceService.getItem(mockERC721.address, 0)
    ).to.deep.equal({
      seller: owner.address,
      price: ethers.utils.parseEther("1.0"),
      collectionAddress: mockERC721.address,
      tokenId: 0,
    });
  });

  it("Should return 2 marketplace items", async () => {
    await mockMarketplace.mock.getAllItemsCount.returns(2);
    await mockMarketplace.mock.itemByIndex
      .withArgs(mockERC721.address, 0)
      .returns(
        owner.address,
        ethers.utils.parseEther("1.0"),
        mockERC721.address,
        0
      );
    await mockMarketplace.mock.itemByIndex
      .withArgs(mockERC721.address, 1)
      .returns(
        owner.address,
        ethers.utils.parseEther("2.0"),
        mockERC721.address,
        1
      );
    const result = await mockMarketplaceService.getAllItems(mockERC721.address);
    expect(result).to.have.length(2);
    expect(result[0])
      .to.have.property("price")
      .and.to.equal(ethers.utils.parseEther("1.0"));
    expect(result[1])
      .to.have.property("price")
      .and.to.equal(ethers.utils.parseEther("2.0"));
  });

  it("Should return 1 market item from user", async () => {
    await mockMarketplace.mock.getUserItemsCount.returns(1);
    await mockMarketplace.mock.itemOfUserByIndex.returns(
      owner.address,
      ethers.utils.parseEther("1.0"),
      mockERC721.address,
      0
    );
    const result = await mockMarketplaceService.getAllItemsFromUser(
      owner.address,
      mockERC721.address
    );

    expect(result).to.have.length(1);
    expect(result[0])
      .to.have.property("price")
      .and.to.equal(ethers.utils.parseEther("1.0"));
  });

  it("Should create market item", async () => {
    await mockMarketplace.mock.createItem.returns();

    expect(
      await mockMarketplaceService.createItem(
        mockERC721.address,
        0,
        ethers.utils.parseEther("1.0")
      )
    ).to.have.property("hash");
  });

  it("Should update market item", async () => {
    await mockMarketplace.mock.updateItem.returns();

    expect(
      await mockMarketplaceService.updateItem(
        mockERC721.address,
        0,
        ethers.utils.parseEther("1.0")
      )
    ).to.have.property("hash");
  });

  it("Should cancel market item", async () => {
    await mockMarketplace.mock.cancelItem.returns();

    expect(
      await mockMarketplaceService.cancelItem(mockERC721.address, 0)
    ).to.have.property("hash");
  });

  it("Should buy a market item", async () => {
    await mockMarketplace.mock.buy.returns();

    expect(
      await mockMarketplaceService.buy(
        mockERC721.address,
        0,
        ethers.constants.AddressZero,
        0
      )
    ).to.have.property("hash");
  });

  it("Should return proper ItemCreated logs", async () => {
    await mockManager.mock.isWhitelistedCollection.returns(true);

    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();
    const tx = await marketplace
      .connect(owner)
      .createItem(mockERC721.address, 0, ethers.utils.parseEther("1.0"));
    tx.wait();

    const logs = await marketplaceService.getCreatedLog({});

    expect(logs[0]).to.have.property("seller").and.to.equal(owner.address);
    expect(logs[0])
      .to.have.property("collectionAddress")
      .and.to.equal(mockERC721.address);
    expect(logs[0]).to.have.property("tokenId").and.to.equal(0);
    expect(logs[0])
      .to.have.property("price")
      .and.to.equal(ethers.utils.parseEther("1.0"));
  });

  it("Should return proper ItemUpdated logs", async () => {
    await mockManager.mock.isWhitelistedCollection.returns(true);

    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();
    const tx = await marketplace
      .connect(owner)
      .createItem(mockERC721.address, 0, ethers.utils.parseEther("1.0"));
    tx.wait();

    const txu = await marketplace
      .connect(owner)
      .updateItem(mockERC721.address, 0, ethers.utils.parseEther("2.0"));
    txu.wait();

    const logs = await marketplaceService.getUpdatedLog({});

    expect(logs[0]).to.have.property("seller").and.to.equal(owner.address);
    expect(logs[0])
      .to.have.property("collectionAddress")
      .and.to.equal(mockERC721.address);
    expect(logs[0]).to.have.property("tokenId").and.to.equal(0);
    expect(logs[0])
      .to.have.property("price")
      .and.to.equal(ethers.utils.parseEther("2.0"));
  });

  it("Should return proper ItemTransferred logs", async () => {
    await mockManager.mock.isWhitelistedCollection.returns(true);

    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();
    const tx = await marketplace
      .connect(owner)
      .createItem(mockERC721.address, 0, ethers.utils.parseEther("1.0"));
    tx.wait();

    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();
    const txc = await marketplace
      .connect(owner)
      .cancelItem(mockERC721.address, 0);
    txc.wait();

    const logs = await marketplaceService.getTransferredLog({});

    expect(logs[0]).to.have.property("seller").and.to.equal(owner.address);
    expect(logs[0]).to.have.property("owner").and.to.equal(owner.address);
    expect(logs[0])
      .to.have.property("collectionAddress")
      .and.to.equal(mockERC721.address);
    expect(logs[0]).to.have.property("tokenId").and.to.equal(0);
    expect(logs[0])
      .to.have.property("price")
      .and.to.equal(ethers.utils.parseEther("1.0"));
  });
});
