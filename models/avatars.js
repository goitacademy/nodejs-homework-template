const {Schema, model} = require("mongoose");

const avatarSchema = Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
}, {versionKey: false, timestamps: true});

const Avatar = model("product", avatarSchema);

module.exports = {
    Avatar
}