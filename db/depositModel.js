const mongoose = require("mongoose");

const depositShema = new mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  amount: { type: Number, required: true },
});

const Deposit = mongoose.model("deposits", depositShema);

module.exports = {
  Deposit,
};
