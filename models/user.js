const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils/index");

const userScheme = new Schema({

    password: {
        type: String,
        required: [true, 'Password is required'],
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
    token: {
        type: String,
    },

     
});

userScheme.post("save", mongooseError);

const User = model("user", userScheme);



module.exports = User;