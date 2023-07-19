/* const Joi = require('joi');


  const contactAddSchema = Joi.object({
    
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
  })
  console.log(this.contactAddSchema);


  const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
  })
  
  const schemas = {
    contactAddSchema,
    updateFavoriteSchema,
  };

  module.exports = schemas; */