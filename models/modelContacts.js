const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const contactSchama = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/,
    },
    email: {
      type: String,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      default: "Not email:(",
    },
    phone: {
      type: String,
      match: /^[0-9: -/+]+$/,
      required: true,
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

contactSchama.post("save", handleMongooseError);

const Contact = model("contact", contactSchama);

module.exports = Contact;
