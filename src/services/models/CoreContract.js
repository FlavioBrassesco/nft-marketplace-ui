const mongoose = require("mongoose");

const coreContractSchema = new mongoose.Schema({
  key: {
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

coreContractSchema.set("toJSON", {
  transform: (document, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

global.CoreContract = global.CoreContract || mongoose.model("CoreContract", coreContractSchema);
module.exports = global.CoreContract;
