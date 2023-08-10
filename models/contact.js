const { Schema, model } = require("mongoose");
const { handleSaveError, handleUpdValidate } = require("../models/hooks");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre("findOneAndUpdate", handleUpdValidate);

contactSchema.post("findOneAndUpdate", handleSaveError);

contactSchema.post("save", handleSaveError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
