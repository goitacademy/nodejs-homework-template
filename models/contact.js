const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

const joiShema=Joi.object({
        name: Joi.string()
            // .alphanum()
            .min(3)
            .max(30)
            .regex(
                /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
                "Name can only consist of letters, apostrophes, dashes and spaces."
            )
            .required(),
        email: Joi.string()
            .email()
            .required(),
        phone: Joi.string()
            .min(10)
            .max(18)
            .pattern(/^[+]?[0-9]?[-.\s]?[(]?[0-9]{1,3}?[)]?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/)
            .message('Enter the phone in the following format (***) ***-****')
            .required(),
        favorite: Joi.boolean()
            .optional()
    })

const favoriteJoiShema = Joi.object({
    favorite: Joi.boolean()
        .required()
})

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiShema,
    favoriteJoiShema
};