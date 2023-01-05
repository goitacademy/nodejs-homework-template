const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Set name for contact"],
    },
    emeil: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      validate: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
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

const Contact = model("contact", contactSchema);
module.exports = Contact;
