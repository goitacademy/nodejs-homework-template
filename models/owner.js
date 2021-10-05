const { Schema, model } = require("mongoose");
const Joi = require("joi")

const ownerSchema = Schema({
    content: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
    content: Joi.string().required()
})

const Owner = model("owner", ownerSchema);

module.exports = {
    Owner,
    joiSchema
}