const Joi =require("joi")

exports.userValidation=(data)=>{
    const schema=Joi.object({
        name:Joi.string().min(2).max(255).required(),
        email:Joi.string().min(2).max(255).required().email(),
        phone:Joi.string().min(2).max(20).required(),
    })

    return schema.validate(data)
}