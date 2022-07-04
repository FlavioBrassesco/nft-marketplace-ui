const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    minlength: 42,
    maxlength: 42,
  },
  tokenId: {
      type: String,
      required: true
  },
  uri: {
      type: String,
      required: true
  },
  status: {
      type: String,
      required: true
  },
  price: {
      type: String,
      required: true
  }
});

itemSchema.set("toJSON", {
  transform: (document, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

global.Item = global.Item || mongoose.model("Item", itemSchema);
module.exports = global.Item;
