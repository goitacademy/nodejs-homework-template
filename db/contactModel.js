const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    uniq: true,
  },
  email: { type: String, require: true },
  phone: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
