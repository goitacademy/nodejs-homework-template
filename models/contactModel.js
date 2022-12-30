const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");


//-----------------------------------------------------------------------------
const contactSchema = Schema({
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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });


//! Правильный код ошибки contactSchema
contactSchema.post("save", handleSchemaValidationErrors)


//* ++++++++++++++++++++++ Схемы ВАЛИДАЦИИ Joi +++++++++++++++++++++++++
const contactJoiSchemaPut = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .required(),

    phone: Joi.string()
        // .alphanum()
        .min(5)
        .max(14)
        .required(),

    owner: Joi.string(),
    // .required(),

    favorite: Joi.bool()
        .optional(),
});

//--------------------------------------------------------------------
const contactJoiSchemaPatch = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .optional(),

    phone: Joi.string()
        // .alphanum()
        .min(5)
        .max(14)
        .optional(),

    favorite: Joi.bool()
        .optional(),
});

//--------------------------------------------------------------------
const contactJoiSchemaPatchFavorite = Joi.object({
    favorite: Joi.bool()
        .required(),
});
//* _______________________ Схемы ВАЛИДАЦИИ Joi _______________________


//? Создаем МОДЕЛЬ:
const Contact = model("contact", contactSchema); //! DB_HOST
// const Contact = model("product", contactSchema); //! DB_HOST1


module.exports = {
    Contact,
    contactJoiSchemaPut,
    contactJoiSchemaPatch,
    contactJoiSchemaPatchFavorite
};

