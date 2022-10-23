const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      minlength: 2,
      maxlength: 30,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      minlength: 2,
      maxlength: 10,
      required: [true, "Phone is required"],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

contact.post("save", handleSaveErrors);

const Contact = model("contacts", contact);

module.exports = {
  Contact,
};
