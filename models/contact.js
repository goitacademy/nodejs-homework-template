const Joi = require("joi");
const {Schema, model} = require("mongoose");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean().default(false),
  }); 

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavorite,
}

const contactsSchema = new Schema({
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
    ref: "user",
    required: true
  }
},  {versionKey: false, timestamps: true});

const Contact = model("contact", contactsSchema);

module.exports = {
  Contact,
  schemas
}
