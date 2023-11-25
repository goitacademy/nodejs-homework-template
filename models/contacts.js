const { Schema, model } = require("mongoose");
const { handleError } = require("../error");

const contactSchema = new Schema({
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
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
}, {
    versionKey: false,
    timestamps: true,
});

contactSchema.post("save", function(error, doc, next) {
    handleError(error, doc, next);
});

const Contact = model("contact", contactSchema);

module.exports = { Contact };