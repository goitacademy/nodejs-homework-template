const { Schema, model } = require("mongoose");
const { mongoSwerverError } = require("../../utils");
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
      ref: "user",
      required: [true, "Set owner for contact"],
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", mongoSwerverError);
const Contact = model("contact", contactSchema);

module.exports = Contact;
