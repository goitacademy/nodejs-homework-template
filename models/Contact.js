const { Schema, model } = require('mongoose');
const handleSaveError = require('../helpers/hooks.js');
const Joi = require('joi');

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
},
    { versionKey: false, timestamps: true }
)

contactSchema.post("save", handleSaveError);

const Contact = model("contact", contactSchema)

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().required(),
});

const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

module.exports = {
  Contact,
  addSchema,
  updateSchema,
  updateFavoriteSchema
}
