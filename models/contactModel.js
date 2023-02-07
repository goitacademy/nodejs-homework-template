const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

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
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact,
};
