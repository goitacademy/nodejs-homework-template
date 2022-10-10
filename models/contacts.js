const {Schema, model} = require("mongoose");

const Joi = require("joi");

const toEmail = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } };

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false, timestamps: true})

contactSchema.post("save", (error, data, next) => {
  const {name, code} = error;
  error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
  next();
})

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(toEmail),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema); 

module.exports = {
  schemas,
  Contact,
}
