const { Schema } = require("mongoose");
const { handleMongooseError } = require("../../helpers");

const phoneRegexp = /^(\+)?([- ()]?\d[- ()]?){10,14}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: [2, "Very short name"],
      maxlength: 40,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Add email for contact"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

module.exports = contactSchema;
