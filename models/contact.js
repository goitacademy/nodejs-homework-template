const Joi = require("joi");
const {Schema, model} = require("mongoose");

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
      favorite: {
        type: Boolean,
        default: false,
      },
}, {versionKey: false, timestamps: true});

const joiAddContactSchema = Joi.object({
    
  name: Joi.string()    
      .min(2)
      .max(15)
      .required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),

    phone: Joi.string()   
      .min(10)
      .max(20)
      .required(),

    favorite: Joi.boolean(),
  });

  const joiUpdateFavoriteSchema = Joi.object({ 
    favorite: Joi.boolean().required(),
  });

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas: {
      add: joiAddContactSchema,
      updateFavofite: joiUpdateFavoriteSchema
  }
};