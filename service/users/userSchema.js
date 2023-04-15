const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
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
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
       
    },
    token: String,
    avatarURL: String,
    

},
    { versionKey: false, timestamps: true},

)


const User = mongoose.model('user', userSchema);

module.exports = {
    User
};
