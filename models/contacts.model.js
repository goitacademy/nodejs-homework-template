import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: Schema.Types.String,
    },
    phone: {
      type: Schema.Types.String,
    },
    favorite: {
      type: Schema.Types.Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema, "contacts");
