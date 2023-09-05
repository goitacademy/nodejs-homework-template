const mongoose = require("mongoose");
const bCrypt = require('bcrypt');
const { Schema } = mongoose;


const user = new Schema(
    {
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
        }
    }
);

user.methods.setPassword = function(password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", user);
module.exports = User;