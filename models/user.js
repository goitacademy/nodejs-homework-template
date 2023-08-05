const { Schema, model } = require("mongoose");
const { handleSaveError, handleUpdValidate } = require("../models/hooks");
const emailRegexp = require("../constants/user-constants");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Set email"],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, "Set password"],
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
		avatarURL: {
			type: String,
			required: true,
		}
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleUpdValidate);

userSchema.post("findOneAndUpdate", handleSaveError);

userSchema.post("save", handleSaveError);

const User = model("user", userSchema);

module.exports = User;
