import {httpCode} from '../lib/constants.js';
import joi from 'joi';

const emailSchema = joi.object({
    name:joi.string().min(2).max(30).optional(),
    email:joi.string().email().required(),
});


export const emailValidate = async(req, res, next) =>{
    try {
        await emailSchema.validateAsync(req.body)
    } catch (error) {
        return res.status(httpCode.BAD_REQUEST).json({message: `Field ${ error.message.replace(/"/g, '')}`})
    }
    next();
}