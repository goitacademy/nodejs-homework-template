const {Schema, model} = require("mongoose");
const Joi = require("joi");

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
      },

}, {versionKey: false, timestamps: true});


const joiSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z ]+$/),
  
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  
    phone: Joi.string()
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .messages({
        "string.pattern.base":
          "Invalid phone number format. The format should be (XXX) XXX-XXXX.",
      })
      .required(),

    favorite: Joi.boolean(),      
  });

  const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  })


const Contact = model('contact', contactSchema);

module.exports = {
    Contact, 
    joiSchema,
    updateFavoriteSchema,
}