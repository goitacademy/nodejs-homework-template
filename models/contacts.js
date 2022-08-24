const {Schema, model} = require("mongoose");
const Joi = require("joi");

const { handleErrors } = require("../helpers")

const phoneRegexp = /^(\d{3}) \d{3}-\d{4}$/;
                    
const contactSchema = new Schema({
  name:{
    type: [String, "name is required"],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    match: phoneRegexp,
    unique: true,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
    required: true
  }
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleErrors);

const addSchema = Joi.object({
  name: Joi.string().required(), 
  email: Joi.string().required(), 
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas
};