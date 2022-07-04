const { expect } = require("chai");
const { waffle, ethers } = require("hardhat");
const { deployMockContract, provider } = waffle;
const { deploySalesService, deployMarketplace } = require("../helpers");
const SalesService = require("services/SalesService");

describe("SalesService", () => {
  let contract,
    mockContract,
    mockSalesService,
    salesService,
    marketplace,
    mockERC721,
    mockManager;
  let owner, other;
  beforeAll(async () => {
    [owner, other] = provider.getWallets();

    const salesServiceJSON = require("services/abi/SalesService.json");
    const managerJSON = require("services/abi/NFTCollectionManager.json");
    const erc721JSON = require("services/abi/MockERC721.json");

    mockERC721 = await deployMockContract(owner, erc721JSON.abi);
    mockManager = await deployMockContract(owner, managerJSON.abi);

    mockContract = await deployMockContract(owner, salesServiceJSON.abi);

    contract = await deploySalesService(
      owner.address,
      other.address,
      other.address
    );

    marketplace = await deployMarketplace(
      mockManager.address,
      contract.address,
      other.address
    );

    mockSalesService = new SalesService(mockContract.address, provider);
    salesService = new SalesService(contract.address, provider);
  });

  it("Should add authorized marketplace", async () => {
    await mockContract.mock.addAuthorizedMarketplace.returns();
    expect(
      await mockSalesService.addAuthorizedMarketplace(other.address)
    ).to.have.property("hash");
  });

  it("Should remove authorized marketplace", async () => {
    await mockContract.mock.removeAuthorizedMarketplace.returns();
    expect(
      await mockSalesService.removeAuthorizedMarketplace(other.address)
    ).to.have.property("hash");
  });

  it("Should get authorized marketplace", async () => {
    await mockContract.mock.getAuthorizedMarketplaces.returns([other.address]);
    expect(await mockSalesService.getAuthorizedMarketplaces()).to.include(
      other.address
    );
  });

  it("Should add approved token", async () => {
    await mockContract.mock.addApprovedToken.returns();
    expect(
      await mockSalesService.addApprovedToken(other.address)
    ).to.have.property("hash");
  });

  it("Should remove approved token", async () => {
    await mockContract.mock.removeApprovedToken.returns();
    expect(
      await mockSalesService.removeApprovedToken(other.address)
    ).to.have.property("hash");
  });

  it("Should get approved token", async () => {
    await mockContract.mock.getApprovedTokens.returns([other.address]);
    expect(await mockSalesService.getApprovedTokens()).to.include(
      other.address
    );
  });

  it("Should retrieve pending revenue", async () => {
    await mockContract.mock.retrievePendingRevenue.returns();
    expect(await mockSalesService.retrievePendingRevenue()).to.have.property(
      "hash"
    );
  });

  it("Should return pending revenue", async () => {
    await mockContract.mock.getPendingRevenue.returns(
      ethers.utils.parseEther("1.0")
    );
    expect(await mockSalesService.getPendingRevenue(owner.address)).to.equal(
      ethers.utils.parseEther("1.0")
    );
  });

  it("Should set treasury address", async () => {
    await mockContract.mock.setTreasuryAddress.returns();
    expect(
      await mockSalesService.setTreasuryAddress(owner.address)
    ).to.have.property("hash");
  });

  it("Should return correct FundsTransferred log", async () => {
    await mockManager.mock.isWhitelistedCollection.returns(true);

    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();

    const tx = await marketplace
      .connect(owner)
      .createItem(mockERC721.address, 0, ethers.utils.parseEther("1.0"));
    tx.wait();

    const txa = await contract.addAuthorizedMarketplace(marketplace.address);
    txa.wait();

    await mockManager.mock.getFee.returns(0);

    await mockERC721.mock[
      "safeTransferFrom(address,address,uint256)"
    ].returns();

    const txb = await marketplace
      .connect(other)
      .buy(mockERC721.address, 0, ethers.constants.AddressZero, 0, {
        value: ethers.utils.parseEther("1.0"),
      });
    txb.wait();

    const txr = await contract.connect(owner).retrievePendingRevenue();
    txr.wait();

    const logs = await salesService.getFundsTransferredLog({});

    expect(logs[0]).to.have.property("user").and.to.equal(owner.address);
    expect(logs[0])
      .to.have.property("funds")
      .and.to.equal(ethers.utils.parseEther("1.0"));
  });
});
