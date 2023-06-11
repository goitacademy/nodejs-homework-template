const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../middlewares");

const contactsSchema = new Schema(  {
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
  }, {versionKey: false});
  contactsSchema.post("save", handleMongooseError);

const Contact = model("contact", contactsSchema);

module.exports = Contact;