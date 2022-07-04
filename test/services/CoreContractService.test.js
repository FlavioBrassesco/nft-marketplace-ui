import axios from "axios";
const CoreContractService = require("services/CoreContractService");

jest.mock("axios");

describe("CoreContractService", () => {
  let coreContractService;
  beforeAll(() => {
    coreContractService = new CoreContractService();
  });

  it("Should return an array of core contracts", () => {
    const returnedValue = [
      {
        key: "manager",
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        id: "62a204a5f2f94a677165fd68",
      },
      {
        key: "weth",
        address: "0xb367f032d93F642f64180aa35FbDB2315678afec",
        id: "94a677165fd6862a204a5f2f",
      },
    ];
    axios.get.mockResolvedValue(returnedValue);
    return coreContractService.getAll().then((data) => {
      expect(data).toEqual(returnedValue);
    });
  });

  it("Should return an core contract matching the passed key", () => {
    const returnedValue = {
      key: "manager",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      id: "62a204a5f2f94a677165fd68",
    };
    axios.get.mockResolvedValue(returnedValue);
    return coreContractService.get("62a204a5f2f94a677165fd68").then((data) => {
      expect(data).toEqual(returnedValue);
    });
  });

  it("Should add a new core contract", () => {
    const returnedValue = {
      key: "newcontract",
      address: "0x5FbDB2315678aF642f64180aa3fecb367f032d93",
      id: "94a677165fd6862a204a5f2f",
    };
    axios.post.mockResolvedValue(returnedValue);

    return coreContractService
      .add({
        key: "newcontract",
        address: "0x5FbDB2315678aF642f64180aa3fecb367f032d93",
      })
      .then((data) => {
        expect(data).toEqual(returnedValue);
      });
  });

  it("Should delete a core contract", () => {
    const returnedValue = "";
    axios.delete.mockResolvedValue(returnedValue);

    return coreContractService
      .delete("94a677165fd6862a204a5f2f")
      .then((data) => {
        expect(data).toEqual(returnedValue);
      });
  });

  it("Should update a core contract", () => {
    const returnedValue = {
      key: "updated",
      address: "0x5FbDB2315678aF642f64180aa3fecb367f032d93",
      id: "94a677165fd6862a204a5f2f",
    };
    axios.put.mockResolvedValue(returnedValue);

    return coreContractService
      .update({
        id: "94a677165fd6862a204a5f2f",
        key: "updated",
        address: "0x5FbDB2315678aF642f64180aa3fecb367f032d93",
      })
      .then((data) => {
        expect(data).toEqual(returnedValue);
      });
  });
});
