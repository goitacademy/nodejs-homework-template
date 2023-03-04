const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conts = new Schema(
  {
    id: {
      type: String,
      minlength: 1,
      maxlength: 70,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 170,
    },
    email: {
      type: String,
      minlength: 1,
      maxlength: 70,
    },
    phone: {
      type: String,
      minlength: 7,
      maxlength: 15,
    },
  },
  { versionKey: false, timestamps: true }
);

const Cont = mongoose.model("cont", conts);

module.exports = Cont;
