const mongoose = require("mongoose");
const normalize = require("normalize-mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  regNo: {
    type: String,
    unique: true,
  },
  monthlyPrice: {
    type: Number,
    required: false,
  },
  yearlyPrice: {
    type: Number,
    required: false,
  },
});

schema.plugin(normalize);

const ProviderDetail = mongoose.model("ProviderDetail", schema);
module.exports = ProviderDetail;
