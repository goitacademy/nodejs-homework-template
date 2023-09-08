import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: Schema.Types.String,
    email: Schema.Types.String,
    phone: Schema.Types.Number,
  },
  { timestamps: true }
);

export const Contact = model("contacts", contactSchema);
