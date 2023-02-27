const { Schema, model } = require("mongoose");
const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
      maxlength: 15,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false, timestamps: true }
);
const User = model("user", userSchema);
module.exports = { User };
