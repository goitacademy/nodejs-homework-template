const { Schema, model } = require("mongoose")
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
    },  owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required:true
    }
}, { versionKey: false })
const Contact = model("contact", contactSchema)
const favJoiSchema = Joi.object({
    favorite:Joi.boolean().required()
  })
module.exports = {
favJoiSchema,
    Contact
};