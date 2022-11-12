const { status } = require("../helpers/status");
const Joi = require("joi");

const putContactsValidation = (req, res, next)=>{
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(10).optional(),
     
        email: Joi.string()
         .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
         })
         .optional(),
     
        phone: Joi.string().alphanum().min(4).max(10).optional(),
       });
       const validationResult = schema.validate(req.body);
       if (validationResult.error) {
        return status(res, 400, {
         message: "Not found",
         status: validationResult.error.details,
        });

}
next()
}

const postContactsValidation = (req, res, next)=>{
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(10).required(),
        email: Joi.string()
         .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
         })
         .required(),
        phone: Joi.string().alphanum().min(4).max(10).required(),
       });
     
       const validationResult = schema.validate(req.body);
       if (validationResult.error) {
        return status(res, 400, {
         message: "missing required name field",
         status: validationResult.error.details,
        });

}
next()
}

module.exports = {
    postContactsValidation,
    putContactsValidation
}