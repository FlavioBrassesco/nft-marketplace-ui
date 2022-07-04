const mongoose = require("mongoose");

const siteOptionsSchema = new mongoose.Schema({
  updated: {
    type: String
  },
  options: {
    title: { type: String, required: true },
    description: { type: String },
    logoURL: { type: String },
  },
  terms: {
    type: String
  },
  socialLinks: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
      _id: false
    },
  ],
});

siteOptionsSchema.set("toJSON", {
  transform: (document, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

siteOptionsSchema.statics.getSingleton = function getSingleton(callback) {
  this.findOne()
    .sort({ updated: -1 })
    .limit(1)
    .exec((err, model) => {
      if (err) {
        callback(err, null);
      } else if (model === null) {
        callback(err, new global.SiteOptions());
      } else {
        callback(err, model);
      }
    });
};

global.SiteOptions =
  global.SiteOptions || mongoose.model("SiteOptions", siteOptionsSchema);

module.exports = global.SiteOptions;
