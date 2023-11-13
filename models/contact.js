const { Schema, model } = require("mongoose");

const { MongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      index: true,
      unique: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      match:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      match: /^\(\d{3}\) \d{3}-\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", MongooseError);

module.exports = model("Contact", contactSchema);
