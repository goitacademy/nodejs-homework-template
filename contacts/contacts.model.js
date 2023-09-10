import { Schema, model } from "mongoose";

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
  },
  { timestamps: true }
);

export const Contact = model("contacts", contactSchema);
