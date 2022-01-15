import Joi from "joi";
import { HttpCode } from "../../../lib/constants";


const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
    subscription:Joi.string(),
    token: Joi.string()
})


export const validateUser = async (req, res, next) =>{
    try{
        await createUserSchema.validateAsync(req.body)
    } catch(err){
        return res.status(HttpCode.BAD_REQUEST).json({message: `${err.message.replace(/"/g, '')}`})
    }
    next()
}
