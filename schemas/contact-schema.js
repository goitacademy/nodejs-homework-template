import Joi from "joi";


export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
 phone: Joi.string()
    .regex(/^(\+?7|8|099)?[- 0-9()]+$/)
    .required()
});

export const contactUpdateSchema = Joi.object(
{
  name: Joi.string(),
  email: Joi.string().email(),
 phone: Joi.string()
    .regex(/^(\+?7|8|099)?[- 0-9()]+$/)
    
}
);
