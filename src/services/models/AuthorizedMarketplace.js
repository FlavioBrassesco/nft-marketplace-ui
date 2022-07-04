const mongoose = require("mongoose");

const authorizedMarketplaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  address: {
    type: String,
    required: true,
    minlength: 42,
    maxlength: 42,
  },
});

authorizedMarketplaceSchema.set("toJSON", {
  transform: (document, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

global.AuthorizedMarketplace = global.AuthorizedMarketplace || mongoose.model("AuthorizedMarketplace", authorizedMarketplaceSchema);
module.exports = global.AuthorizedMarketplace;
