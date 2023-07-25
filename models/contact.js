const { Schema, model } = require("mongoose");
const service = require("../service");
const { schemas } = require("../schemas");

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: [
        schemas.emailRegexp,
        "Invalid email format. Please fill a valid email ",
      ],
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: [
        schemas.phoneRegexp,
        "Invalid phone number format. Please fill a valid phone number (000) 000-0000.",
      ],
      required: [true, "Set phone for contact"],
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

contactShema.post("save", service.handleMongooseError);

const Contact = model("contact", contactShema);

module.exports = { Contact };
