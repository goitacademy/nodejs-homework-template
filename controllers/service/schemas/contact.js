import mongoose from "mongoose";

const { Schema, model } = mongoose;

const contacts = new Schema({
  name: {
    type: String,
    minLenght: 3,
    maxLenght: 32,
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
  },
});

const Contact = model("contact", contacts, "contacts");

export { Contact };
