const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        avatarURL: String,
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: false }
);

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model("users", userSchema);

module.exports = User;
