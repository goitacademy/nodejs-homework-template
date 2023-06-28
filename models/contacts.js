const { Schema, model } = require("mongoose");

const { mongooseError } = require("./../utils");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", mongooseError);

const Contact = model("contacts", contactSchema);

module.exports = Contact;
