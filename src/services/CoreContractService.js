const axios = require("axios");

function CoreContractService() {
  const uri = "/api/db/corecontracts";

  this.get = async (id) => {
    if (id) return await axios.get(`${uri}/${id}`);
    return [];
  };

  this.getAll = async () => {
    return await axios.get(uri);
  };

  this.add = async ({ key, address }) => {
    return await axios.post(uri, {
      key,
      address,
    });
  };

  this.delete = async (id) => {
    return await axios.delete(`${uri}/${id}`);
  };

  this.update = async ({ id, key, address }) => {
    return await axios.put(`${uri}/${id}`, {
      key,
      address,
    });
  };
}

module.exports = CoreContractService;
