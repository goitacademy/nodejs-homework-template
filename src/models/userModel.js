const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const User = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String
});
User.pre('save', async function () {
    if (this.isNew) this.password = await bcrypt.hash(this.password, 10);

})

module.exports = mongoose.model('User', User);