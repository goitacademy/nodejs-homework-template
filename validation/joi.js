import Joi from 'joi';

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  
 export function validateContactData(req, res, next) {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  }