
const Joi = require('joi')

const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
const numberPattern = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/

const schemaCreateContact = Joi.object({
   name: Joi.string()
    .pattern(namePattern)   
    .min(3)
        .max(30)
    .required(),
    
   email: Joi.string()
     .pattern(emailPattern)
      .required(),
      
  phone: Joi.string()
    .pattern(numberPattern)
.required(),
    
})


const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(namePattern)
    .min(3)
    .max(30),
 
  email: Joi.string()
    .pattern(emailPattern),
   

  phone: Joi.string()
    .pattern(numberPattern),
    


})


module.exports = { schemaCreateContact, schemaUpdateContact}


// "id": "6",
//     "name": "Abbot Franks",
//         "email": "scelerisque@magnis.org",
//             "phone": "(186) 568-3720"

  // .integer(),

    // email: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

    // const schemaCreateContact = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .max(30)
//     .required().messages({
//       'any.required': 'Поле name обязательное',
//       'string.empty': 'Поле name не может быть пустым',
//     }),

//   email: Joi.string()
//     .pattern(/('[a-zA-Z0-9]')+/)
//     .required(),

//   phone: Joi.number().integer(),

// })

