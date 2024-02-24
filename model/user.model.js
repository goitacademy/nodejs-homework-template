const { Schema, model } = require("mongoose");
const gravatar = require("gravatar");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
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
  avatarURL: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.avatarURL) {
      const avatarURL = gravatar.url(this.email, {
        protocol: "http",
        s: "250",
        rating: "pg",
        d: "404",
      });
      this.avatarURL = avatarURL;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = model("User", userSchema);

module.exports = User;
