const mongoose = require("mongoose");
const mongoosePag = require("mongoose-paginate");

const Ad = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

Ad.plugin(mongoosePag);

module.exports = mongoose.model("Ad", Ad);
