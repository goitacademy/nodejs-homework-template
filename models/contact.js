const {Schema, model}= require("mongoose");
const Joi =require("joi")

const contactSchema=Schema ({
    
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
          match:/^\d{10}$/
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      
},{version:false,timestamps:true});

const joiSchema=Joi.object({
    name:Joi.string()
    .required().
    messages({"any.required": "missing required name field"}),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({"any.required": "missing required email field"}),
    phone:Joi.string().
    pattern( /^\d{10}$/)
    .length(10).required().messages({"any.required": "missing required phone field"}),
    favorite:Joi.boolean().default(false)
  })

  const favoriteJoiSchema=Joi.object({
    favorite:Joi.boolean()
    .required()
    . messages({"any.required": "missing  field favorite"}),
  })

const Contact =model("contact",contactSchema)

module.exports = {
    Contact,
    joiSchema,
    favoriteJoiSchema}