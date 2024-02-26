import mongoose from "mongoose";

const SchemaContact = mongoose.Schema;

const contacts = new SchemaContact(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaContact.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Contact = mongoose.model("contact", contacts);
