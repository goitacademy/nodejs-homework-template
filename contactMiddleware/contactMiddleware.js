const Joi = require('joi');

const validationData = async(name,email,phone,favorite)=> {
  const schema = Joi.object({
    name: Joi.string()        
      .min(3)
      .max(30)
      .alphanum()
      .required(),    
    phone: [ 
      Joi.string()
      .required(),         
      Joi.number()
      .required()
    ],    
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    favorite: Joi.bool()
  })    

  try{       
    return schema.validate({name: name, email: email, phone: phone ,favorite:favorite});
  }catch(error){
    console.log(error.details);
  } 
}  

module.exports = {
  validationData   
};