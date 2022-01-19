const Joi = require('joi');

const addSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    phone:Joi.string().required(),
})

const updateSchema=Joi.object({
    name:Joi.string().optional(),
    email:Joi.string().optional(),
    phone:Joi.string().optional(),
}).or('name', 'email', 'phone')


const updateStatusSchema = Joi.object({
    favorite:Joi.bool().required()
})

const signupSchema = Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(30).required()
})

const loginSchema = Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(30).required()
})



const validateAdd = async (req,res,next) => {
    try {
        await addSchema.validateAsync(req.body)
    } catch (error) {
        const keyContact=error.message.split(' ').splice(0,1).join("").replace(/"/g,"");
        return res.status(400).json({message:`missing required ${keyContact} field`});
    }
    next()
}

const validateUpdate = async(req,res,next) => {
    try {
        await updateSchema.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({message:error.message.replace(/"/g,"")})
    }
    next()
}

const validateUpdateStatus = async (req,res,next) => {
    try {
        await updateStatusSchema.validateAsync(req.body)
    } catch (error) {
        const keyContact=error.message.split(' ').splice(0,1).join("").replace(/"/g,"");
        return res.status(400).json({message:`missing required ${keyContact} field`});
    }
    next()
}

const validateSignup = async (req,res,next) => {
    try {
        await signupSchema.validateAsync(req.body)

    } catch (error) {
        return res.status(400).json({message:error.message.replace(/"/g,"")});
    }
    next();
}

const validateLogin = async (req,res,next) => {
    try {
        await loginSchema.validateAsync(req.body)

    } catch (error) {
        return res.status(400).json({message:error.message.replace(/"/g,"")});
    }
    next();
}

module.exports= {validateAdd,validateUpdate,validateUpdateStatus,validateSignup, validateLogin}