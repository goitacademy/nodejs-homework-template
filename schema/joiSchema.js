const Joi = require('joi');

// module.exports = {
//   addPostValidation: (req, res, next) => {
    

//     const schema = Joi.object({
//       name: Joi.string(),
//       phone: Joi.string(),
//       email: Joi.string()
//     });

//     const validationResult = schema.validate(req.boby)
//     if (validationResult.error) {
//       return res.status(400).json({status:validationResult.error.details})
//     }

//   }
// }


    const schema = Joi.object({
      name: Joi.string().required(),
      phone: Joi.string(),
      email: Joi.string(),
      favorite: Joi.boolean(),
    });

    
module.exports = { schema }