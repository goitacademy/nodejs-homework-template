const Joi = require('joi');
const { Schema, model } = require('mongoose');

const addShema = Joi.object({
  name: Joi.string()
        .min(2)
        .max(30)
        .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().required(),
    favorite: Joi.boolean(),
})

const updateFavoriteShema = Joi.object({
  favorite: Joi.boolean().required(),
});

const shemas = {
    add: addShema,
    updateFavorite: updateFavoriteShema,
}

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        unique: true,
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
  owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, {versionKey:false, timestamps:true});

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    shemas,
};