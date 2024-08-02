const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarURL: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        required: [true, "Verify token is required"]
    }
});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
