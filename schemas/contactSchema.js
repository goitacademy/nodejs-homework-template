const mongoose = require("mongoose")

const Contact = new mongoose.Schema({
  email: { type: String },
  name: { type: String, required: true },
  phone: { type: String },
  favorite: { type: Boolean, default: false },
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', }
})

module.exports = mongoose.model('Contact', Contact)