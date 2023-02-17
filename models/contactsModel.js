const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const сontactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
        unique: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Contact", сontactSchema);