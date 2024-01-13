const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
    select: false,
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
  avatarUrl: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: function() {
      return !this.verify;
    },
  },
},
  {
  timestamps: true,
  versionKey: false,
}

);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");
    this.avatarUrl = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=retro`;
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
