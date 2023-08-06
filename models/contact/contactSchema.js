const { Schema } = require("mongoose");
const { handleMongooseError } = require("../../helpers");
const { PHONE_REGEXP } = require("../regexp");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: [2, "Name is too short"],
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
      match: new RegExp(PHONE_REGEXP),
      trim: true,
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

contactSchema.post("save", handleMongooseError);

module.exports = contactSchema;