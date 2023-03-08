const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conts = new Schema(
  {
    // id: { type: Number, required: true },
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Cont = mongoose.model("cont", conts);

module.exports = Cont;
