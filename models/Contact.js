const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", mongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
