const { Schema, model } = require("mongoose");

const contactSchemaMongoose = new Schema(
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
  },
  { toJSON: { versionKey: false } }
);

const Contact = model("contact", contactSchemaMongoose);

module.exports = {
  Contact,
};
