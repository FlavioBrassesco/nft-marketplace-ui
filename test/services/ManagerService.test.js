const { expect } = require("chai");
const { waffle, ethers } = require("hardhat");
const { deployMockContract, provider } = waffle;
const managerJson = require("services/abi/NFTCollectionManager.json");
const ManagerService = require("services/ManagerService");

describe("ManagerService", () => {
  let owner, other;
  let mockManager, managerService;

  beforeAll(async () => {
    [owner, other] = provider.getWallets();

    mockManager = await deployMockContract(owner, managerJson.abi);

    managerService = new ManagerService(mockManager.address, provider);
  });

  it("Should return collection data", async () => {
    await mockManager.mock.getFee.returns(10);
    await mockManager.mock.getFloorPrice.returns(
      ethers.utils.parseEther("1.0")
    );
    await mockManager.mock.isWhitelistedCollection.returns(true);

    const result = await managerService.getCollectionData(other.address);
    expect(result).to.deep.equal({
      address: other.address,
      fee: ethers.BigNumber.from(10),
      floorPrice: ethers.utils.parseEther("1.0"),
      isWhitelisted: true,
    });
  });

  it("Should correctly enumerate collections", async () => {
    await mockManager.mock.getCollectionsCount.returns(1);
    await mockManager.mock.collectionByIndex.returns(other.address);
    await mockManager.mock.getFee.returns(10);
    await mockManager.mock.getFloorPrice.returns(
      ethers.utils.parseEther("1.0")
    );
    await mockManager.mock.isWhitelistedCollection.returns(true);

    const result = await managerService.getAllCollections();
    expect(result).to.have.length(1);
    expect(result[0]).to.have.property("isWhitelisted").and.to.equal(true);
  });

  it("Should add whitelisted collection", async () => {
    await mockManager.mock.addWhitelistedCollection.returns();

    expect(
      await managerService.addWhitelistedCollection(other.address)
    ).to.have.property("hash");
  });

  it("Should set fee", async () => {
    await mockManager.mock.setFee.returns();

    expect(await managerService.setFee(other.address, 10)).to.have.property(
      "hash"
    );
  });

  it("Should set floorPrice", async () => {
    await mockManager.mock.setFloorPrice.returns();

    expect(
      await managerService.setFloorPrice(
        other.address,
        ethers.utils.parseEther("1.0")
      )
    ).to.have.property("hash");
  });
});
