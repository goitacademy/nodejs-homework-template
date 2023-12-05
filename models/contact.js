const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers/index");


const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, {versionKey: false, timestamps: true});


contactSchema.post("save", handleMongooseError);


const addSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" required field`}),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9()+\s-]+$/).required(),
    favorite: Joi.boolean(),
});


const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})


const Contact = model("db-contacts", contactSchema);
const schemas = { addSchema, updateFavoriteSchema };

module.exports = {Contact, schemas};