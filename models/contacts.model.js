const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const connectM = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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
});

const connect = mongoose.model("connect", connectM);

module.exports = connect;
