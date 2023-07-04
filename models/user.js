const { Schema, model } = require("mongoose");
const { HttpError } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
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
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const errorMessage = "Email is already in use";
    const httpError = new HttpError(409, errorMessage);
    next(httpError);
  } else {
    next(error);
  }
});

const User = model("user", userSchema);

module.exports = User;
