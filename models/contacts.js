const mongoose = require("mongoose");

const schema = new mongoose.Schema( {
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

const Contact = mongoose.model('contact', schema);

module.exports = {
  Contact,
}
