const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      validate: {
        validator: (value) => /^\+380\d{9}$/.test(value),
        message: "Invalid phone format. Please use the format +380XXXXXXXXX.",
      },
      unique: true,
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
