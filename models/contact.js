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
});

contactSchema.post("save", handleMongooseError);

module.export = mongoose.model("Contact", contactSchema);
