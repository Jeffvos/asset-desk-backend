const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assetSchema = new Schema({
  assetID: {
    type: Number,
    required: true,
    unique: true
  },
  assetSN: {
    type: String,
    required: true,
    unique: true
  },
  assetVendor: {
    type: String,
    required: true
  },
  assetModel: {
    type: String,
    required: true
  },
  assetStatus: {
    type: String,
    required: true
  },
  assetDep: {
    type: String,
    required: true
  },
  assetUser: {
    type: String
  }
});

module.exports = mongoose.model("Asset", assetSchema);
