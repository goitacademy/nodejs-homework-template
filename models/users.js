const { Schema, model, SchemaTypes } = require("mongoose");

const usersSchema = new Schema({
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
    owner: {
        type: SchemaTypes.ObjectId,
        ref: "user",
    },
});

const User = model("user", usersSchema);

module.exports = User;
