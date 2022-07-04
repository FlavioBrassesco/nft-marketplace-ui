const { expect } = require("chai");
const { waffle, ethers } = require("hardhat");
const { deployMockContract, provider } = waffle;
const { deployMinter } = require("../helpers");
const erc721JSON = require("services/abi/MockERC721.json");
const CollectionService = require("services/CollectionService");

describe("CollectionService", () => {
  let owner, other;
  let mockERC721, erc721, mockERC721Service, erc721Service;

  beforeAll(async () => {
    [owner, other] = provider.getWallets();

    mockERC721 = await deployMockContract(owner, erc721JSON.abi);

    mockERC721Service = new CollectionService(mockERC721.address, provider);
  });

  beforeEach(async () => {
    erc721 = await deployMinter(
      "ERC721",
      "E721",
      "http://localhost:8545",
      "http://localhost:8545",
      10000,
      0
    );
    erc721Service = new CollectionService(erc721.address, provider);
  });

  it("Should return collection data", async () => {
    await mockERC721.mock.name.returns("ERC721");
    await mockERC721.mock.symbol.returns("E721");
    await mockERC721.mock.contractURI.returns("http://localhost:8545");
    await mockERC721.mock.totalSupply.returns(10000);

    const result = await mockERC721Service.getCollectionData();

    expect(result).to.deep.equal({
      name: "ERC721",
      symbol: "E721",
      address: mockERC721.address,
      metadataURL: "http://localhost:8545",
      supply: ethers.BigNumber.from(10000),
    });
  });

  it("Should return token data", async () => {
    await mockERC721.mock.tokenURI.returns("http://localhost:8545/tokenURI");
    await mockERC721.mock.contractURI.returns("http://localhost:8545");
    await mockERC721.mock.ownerOf.returns(owner.address);

    const result = await mockERC721Service.getToken(0);

    expect(result).to.deep.equal({
      address: mockERC721.address,
      tokenId: 0,
      owner: owner.address,
      collectionURI: "http://localhost:8545",
      tokenURI: "http://localhost:8545/tokenURI",
    });
  });

  it("Should return all tokens data", async () => {
    await mockERC721.mock.totalSupply.returns(1);
    await mockERC721.mock.tokenByIndex.returns(0);
    await mockERC721.mock.tokenURI.returns("http://localhost:8545/tokenURI");
    await mockERC721.mock.contractURI.returns("http://localhost:8545");
    await mockERC721.mock.ownerOf.returns(owner.address);

    const result = await mockERC721Service.getAllTokens();

    expect(result).to.have.length(1);
    expect(result[0]).to.have.property("owner").and.to.equal(owner.address);
  });

  it("Should mint a token", async () => {
    await mockERC721.mock.totalSupply.returns(0);
    await mockERC721.mock.mint.returns(0);

    expect(await mockERC721Service.mint()).to.have.property("hash");
  });

  it("Should return Transfer log", async () => {
    const tx = await erc721.connect(owner).mint(owner.address, "0.json");
    tx.wait();

    const txtr = await erc721
      .connect(owner)
      .transferFrom(owner.address, other.address, 0);
    txtr.wait();

    const logs = await erc721Service.getTransferLog({});

    expect(logs).to.have.length(2);
    expect(logs[0])
      .to.have.property("from")
      .and.to.equal(ethers.constants.AddressZero);
    expect(logs[1]).to.have.property("from").and.to.equal(owner.address);
  });

  it("Should return minted items log", async () => {
    const tx = await erc721.connect(owner).mint(owner.address, "0.json");
    tx.wait();

    const txtr = await erc721
      .connect(owner)
      .transferFrom(owner.address, other.address, 0);
    txtr.wait();

    const logs = await erc721Service.getMintLog({});

    expect(logs).to.have.length(1);
    expect(logs[0])
      .to.have.property("from")
      .and.to.equal(ethers.constants.AddressZero);
  });
});
