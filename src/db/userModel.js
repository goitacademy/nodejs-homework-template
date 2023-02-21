const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: String,
    token: {
        type: String,
        default: null,
    },
},
    { versionKey: false, timestamps: true },
);

userSchema.pre('save', async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    };
});

const User = mongoose.model('user', userSchema);

module.exports = {
    User
}