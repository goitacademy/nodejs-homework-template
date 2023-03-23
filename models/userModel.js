const { Schema, model } = require("mongoose");
const { hash } = require("bcrypt");

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
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }
});

const User = model("user", userSchema);

module.exports = {
  User,
};
