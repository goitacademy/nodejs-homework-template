const { Schema, model, SchemaTypes } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name"],
    },
    email: {
      type: String,
      required: [true, "Enter email"],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, "Enter phone"],
      unique: true,
    },
    discription: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contacts = model("contact", contactSchema);

module.exports = Contacts;
