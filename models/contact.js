const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const contactsSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
contactsSchema.post("save", handleMongooseError);

const Contact = model("contact", contactsSchema);
module.exports = {
  Contact,
};
