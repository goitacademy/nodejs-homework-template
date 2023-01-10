
const { Schema, model } = require("mongoose");
const {handleMongooseError} = require("../helpers")
const Joi = require("joi");
const { required } = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})
const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})
module.exports = {
    addSchema,
    updateFavoriteSchema,
}


const contactSchema = new Schema(  {
    name: {
        type: String,
        unique: true,
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
    ref: "user",
    required: true,
    }
  },{versionKey: false, timestamps: true})

contactSchema.post("save", handleMongooseError)

const Contact = model("contact", contactSchema)

module.exports = Contact;

