const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {handleMongooseError} = require('../helpers')

// схемa mongoose
const contactSchema = new Schema({
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
}, { versionKey: false, timestamps: true });
// схема бросает ошибку с нужным статусом
contactSchema.post("save", handleMongooseError);


// Joi схема на добавление данных в поля 
const addSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});
// Joi схема на обновление поля favorite
const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { addSchema, schemaUpdateFavorite };

// создаём модель на основе mongoose схемы
const Contact = model('contact', contactSchema)


module.exports = { Contact, schemas };
