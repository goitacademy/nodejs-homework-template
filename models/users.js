const { Schema, model } = require("mongoose");
// const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
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
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

// create model
const User = model("user", userSchema);

// error checking
userSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

module.exports = { User, userSchema };
