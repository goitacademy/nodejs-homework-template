const Joi = require('joi');


const validationData = async(name,email,phone)=> {
    const schema = Joi.object({
      name: Joi.string()        
          .min(3)
          .max(30)
          .required(),  
    
        phone: [ 
          Joi.string(),         
          Joi.number()
        ],
    
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
  const { error, value } = schema.validate({name: name, email: email, phone: phone });
  if (error){
    console.log(error.details);
    return  false;
  } else {
    return value;
  } 
} 
 

module.exports = {
  validationData   
};