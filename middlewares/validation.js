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

module.exports= {validateAdd,validateUpdate,validateUpdateStatus}