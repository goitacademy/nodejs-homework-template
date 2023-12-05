const { Schema, model } = require("mongoose");
const gravatar = require("gravatar"); // Import gravatar
const { handleSaveError } = require("./hooks");

const emailRegexp = /^\w+(\.-?\w+)*@\w+(\.-?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: null },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250", r: "pg", d: "mm" }, true);
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleSaveError);

const User = model("user", userSchema);

module.exports = User;
