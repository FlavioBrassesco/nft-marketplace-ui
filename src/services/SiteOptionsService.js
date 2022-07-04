const axios = require("axios");

function SiteOptionsService() {
  const uri = "http://localhost:3000/api/db/options";

  this.get = async () => {
    return await axios.get(uri);
  };

  this.udpate = async (options) => {
    return await axios.put(`${uri}`, options);
  };
}

module.exports = SiteOptionsService;
