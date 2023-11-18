const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers/handleMongooseError");

const contactSchema = new mongoose.Schema({
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
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'user',
  // },
});

contactSchema.post("save", handleMongooseError);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {Contact};
