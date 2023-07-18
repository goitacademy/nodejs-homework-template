const Joi = require('joi');
const { Schema, model} = require("mongoose");
const Schema = mongoose.Schema;

  const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
  })
  
  const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
  })
  
  const schemas = {
    contactAddSchema,
    updateFavoriteSchema,
  };

  module.exports = schemas;