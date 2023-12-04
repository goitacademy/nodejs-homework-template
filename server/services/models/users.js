import { Schema, model } from "mongoose";

const user = new Schema(
  {
    pubId: { type: String, required: true },
    username: {
      type: String,
      match: [/^[A-Za-z\s]+$/, "Username must only contain letters"],
      minLength: [3, "Username must contain at least 3 characters"],
      maxLength: [25, "Username must contain max 25 characters"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The e-mail field is required"],
      match: [
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        "Enter a valid e-mail address",
      ],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      validate: [
        {
          validator: value => {
            return /[A-Za-z]/.test(value);
          },
          message: "Password must contain at least one letter",
        },
        {
          validator: value => {
            return /\d/.test(value);
          },
          message: "Password must contain at least one number",
        },
      ],
      minLength: [8, "Password must contain at least 8 characters"],
      required: [true, "The password field is required"],
      trim: true,
    },
    subscription: {
      type: String,
      enum: {
        values: ["starter", "pro", "business"],
        message:"Subscription must be one of these values - [starter, pro, business]",
      },
      default: "starter",
    },
      avatarURL: { type: String, required: true },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("User", user);

export default User;
