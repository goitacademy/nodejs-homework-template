const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactShema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
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
        ref: "user",
    },
},{versionKey: false, timestamps: true});

const Contact = model("contact", contactShema);

 
const joiSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    phone: Joi.string().max(12).pattern(/^[0-9]+$/).required(),
    favorite: Joi.boolean(),
 });

const favoriteJoiSchema = Joi.object({
    favorite: Joi.bool().required(),
});

module.exports = {
    Contact,
    joiSchema,
    favoriteJoiSchema,
};



