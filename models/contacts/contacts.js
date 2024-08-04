const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
    avatarURL: String,
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
});

userSchema.methods.setPassword = async function (password) {
    this.password = await bcrypt.hash(password, 12);
};

userSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema, "users");

module.exports = User;