const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const nameSchema = [true, "Set name for contact"];

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: nameSchema,
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
  { versionKey: false, timestamp: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact };
