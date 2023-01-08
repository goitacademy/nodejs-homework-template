const {Schema, model} = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(  {
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
      type: Schema.ObjectId,
      ref: 'user',
    }
    
}, { versionKey: false, timestamps: true });
  
const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
         id: Joi.any,
    phone: Joi.string().min(10),
    favorite: Joi.bool(),
})

const statusJoiSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiSchema,
    statusJoiSchema
}