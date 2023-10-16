import Joi from 'joi'


export const contactAddSchema = Joi.object({
    name: Joi.string()
           .min(3)
           .max(30)
           .required().messages({
       "any.required": `missing required name field`
     }),
     email: Joi.string()
           .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({'string.email': 'email must be a valid email'})
           .required().messages({
       "any.required": `missing required email field`
     }),
     
     phone: Joi.string() 
     .required().messages({
       "any.required": `missing required phone field`
     })
     .pattern(new RegExp('^[+()0-9 ]{3,30}$')).messages({ 
          "string.pattern.base": `The phone number cannot contain letters. Example of a correct number: +(380)000000000`
      }),
      favorite: Joi.boolean().messages({
        "boolean.base": `field favorite must be a boolean`
      })
   })
   
   export const contactFavoriteUpdate = Joi.object({
     favorite: Joi.boolean().messages({
        "boolean.base": `field favorite must be a boolean`
     })
     .required()
   })


   export const userSignUpSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

export const userSignInSchema = Joi.object({
    email: Joi.string().required().messages({
      "any.required": "email is required"
    }),
    password: Joi.string().min(6).required().messages({
      "any.required": "password is required"
    })
})

