import Joi from "joi";


export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
   'any.required': '"name" must be  exist' 
    }),
    email: Joi.string().required().messages({
        'any.required': '"email" must be  exist' 
    }),
    phone: Joi.string().required().messages({
     'any.required': '"phone" must be  exist'    
    })
})


export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})