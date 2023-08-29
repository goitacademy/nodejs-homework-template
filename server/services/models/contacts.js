import { Schema, model } from "mongoose";

const contact = new Schema(
  {
    name: {
      type: String,
      match: [/^[A-Za-z\s]+$/, "Name must only contain letters"],
      minLength: [3, "Name must contain at least 3 characters"],
      maxLength: [25, "Name must contain max 25 characters"],
      trim: true,
      required: [true, "The name field is required"],
    },
    email: {
      type: String,
      match: [
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        "Enter a valid e-mail address",
      ],
      trim: true,
    },
    phone: {
      type: String,
      match: [
        /^[0-9\s+\-()]+$/,
        "Phone must only contain numbers, spaces, plus signs, hyphens and parentheses",
      ],
      minLength: [3, "Phone must contain at least 3 characters"],
      maxLength: [16, "Phone must contain max 16 characters"],
      trim: true,
      required: [true, "The phone field is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("Contact", contact);

export default Contact;
