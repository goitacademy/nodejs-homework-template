
import joi from 'joi';
import mongoose  from 'mongoose';

const {Types}  =mongoose;

const createSchema = joi.object({
    name:joi.string().min(2).max(30).optional(),
    email:joi.string().email().required(),
    role:joi.string().optional(),
    password:joi.string().required(),
});
const logInSchema = joi.object({
    name:joi.string().min(2).max(30).optional(),
    email:joi.string().email().required(),
    password:joi.string().required(),
});

export const validateUserCreate = async(req, res, next) =>{
    try {
        await createSchema.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({message: `Field ${ error.message.replace(/"/g, '')}`})
    }
    next();
    };


export const logInUserCreate = async(req, res, next) =>{
        try {
            await logInSchema.validateAsync(req.body)
        } catch (error) {
            return res.status(400).json({message: `Field ${ error.message.replace(/"/g, '')}`})
        }
        next();
        };
