 const Joi = require("joi");
 const {ValidationJoiError} =require("../helpers/errors")

module.exports = {
  addContactsValidationJoi: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      phone: Joi.string().min(10).max(13),
      email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });
    const validationJoiresult = schema.validate(req.body)
    if(validationJoiresult.error){
     throw new ValidationJoiError("Invalid input data", error.details)
    } 

    return ;
  }
,
putchContactsValidationJoi:(req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(10).max(13),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  });
  const validationJoiresult = schema.validate(req.body)
  if(validationJoiresult.error){
   throw new ValidationJoiError("Invalid input data", error.details)
  } 

  return next() 
   },

  putContactsValidationJoi:(req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      phone: Joi.string().min(10).max(13),
      email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });
    const validationJoiresult = schema.validate(req.body)
    if(validationJoiresult.error){
     throw new ValidationJoiError("Invalid input data", error.details)
    } 

    return next() ;
  }
}
