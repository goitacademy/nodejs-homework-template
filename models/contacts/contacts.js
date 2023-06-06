const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");
const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            required: [true, "Set email for contact"],
        },
        phone: {
            type: String,
            required: [true, "Set phone for contact"],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    }, {versionKey: false}
)

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
}