const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
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

module.exports = model("contacts", schema); // именует модель которая будет созданна при запросе к базе
