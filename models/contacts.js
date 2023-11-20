const mongoose = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new mongoose.Schema(
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
      validate: {
        validator: function (v) {
          return phoneRegex.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Please use the format (XXX) XXX-XXXX`,
      },
    },
    favorite: {
      type: Boolean,
      required: [true],
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

module.exports = mongoose.model("Contact", contactSchema);
