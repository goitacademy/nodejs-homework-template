const Joi = require("joi")

const userbody = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email(),
    favorite: Joi.boolean()
}).or("name", "age", "email","favorite")

const validateInfoput=(req,res,next)=>{
    console.log("entroooooo");
    const {error}=userbody.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).json({"message": "missing fields--"})      
    }
    next();
}

module.exports =validateInfoput;