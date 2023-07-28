const { Schema, model } = require("mongoose");
const { handleSaveError, handleUpdValidate } = require("../models/hooks");
const emailRegexp = require("../constants/user-constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name"],
    },
    email: {
      type: String,
			required: [true, "Set email"],
			match: emailRegexp,
    },
    password: {
      type: String,
			required: [true, "Set password"],
			minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleUpdValidate);

userSchema.post("findOneAndUpdate", handleSaveError);

userSchema.post("save", handleSaveError);

const User = model("user", userSchema);


module.exports = User;