const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: { type: String },
  symbol: { type: String },
  address: {
    type: String,
    required: true,
    minlength: 42,
    maxlength: 42,
  },
  fee: { type: String },
  floorPrice: { type: String },
  isWhitelisted: { type: Boolean },
  metadataURL: {
    type: String,
    required: true,
  },
  metadataId: { type: String },
  sales: {
    type: Number,
  },
  volume: {
    type: String,
  },
  supply: {
    type: String,
  },
  items: {
    type: Number,
  },
});

collectionSchema.set("toJSON", {
  transform: (document, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

global.Collection =
  global.Collection || mongoose.model("Collection", collectionSchema);
module.exports = global.Collection;
