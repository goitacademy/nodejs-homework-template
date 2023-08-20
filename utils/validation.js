const Joi = require('joi')


const validateUser = (user) => {
    const schema = Joi.object({
      email: Joi.string().email().min(15).max(500).required(),
      password: Joi.string().min(8).max(1024).required(),
    })
    return schema.validate(user)
}

module.exports = validateUser;




// const schema = Joi.object({
//     name: Joi.string()
//     .required(),
//     email: Joi.string()
//     .email()
//     .required(),
//     phone: Joi.number().required(),
//     // id: Joi.string().required(),
// }) 

// module.exports = {schema}