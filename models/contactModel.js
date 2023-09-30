const { model, Schema } = require("mongoose");
const { errorMongooseHandler } = require("../utilits");

const contactsSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", errorMongooseHandler);

const Contact = model("Contact", contactsSchema);

module.exports = Contact;
