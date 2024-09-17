const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    password: {
        type: String,
        require: [true, 'Password is required'],
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
const User = mongoose.model('User', userSchema);

module.exports = User;