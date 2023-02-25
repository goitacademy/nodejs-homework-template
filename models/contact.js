const { Schema, model } = require("mongoose");
const handleSaveError = require("../helpers/handleSaveErrors");

const contactSchema = new Schema(
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
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
};
