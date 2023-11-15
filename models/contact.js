const { Schema, model } = require('mongoose');

const Joi = require('joi')

const {handleMongooseError} = require('../helpers/handleMongooseError')

const contactScema = new Schema({
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
        ref: 'user',
        required: true
    }
}, {
    versionKey: false,
});

contactScema.post('save', handleMongooseError)

const Contact = model('contact', contactScema);

// JOI

const addScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const favoriteScheme = Joi.object({
    favorite: Joi.boolean().required(),
})

module.exports = {
    Contact,
    addScheme,
    favoriteScheme
};