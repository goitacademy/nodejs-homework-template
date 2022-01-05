
import joi from 'joi';
import mongoose  from 'mongoose';
import { MAX_AGE, MIN_AGE  } from '../../../lib/constants.js';

const {Types}  =mongoose;

const createSchema = joi.object({
    name:joi.string().min(2).max(30).required(),
    email:joi.string().email().required(),
    phone:joi.string().required(),
    age:joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: joi.bool().optional(),
});

const updateSchema =joi.object({
    name:joi.string().min(2).max(30).optional(),
    email:joi.string().email().optional(),
    phone:joi.string().optional(),
    age:joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: joi.bool().optional(),
}).or('name', 'email', 'phone', 'age', 'vaforite');

const updateFavoriteSchema =joi.object({
    favorite: joi.boolean().required(),
})

const regLimit = /\d+/
const querySchema =joi.object({
   limit: joi.string().pattern(new RegExp(regLimit)).optional(),
  skip: joi.number().min(0).optional(),
  sortBy: joi.string().valid('name', 'age', 'email').optional(),
  sortByDesc: joi.string().valid('name', 'age', 'email').optional(),
  filter: joi.string().pattern(new RegExp('(name|email|age)\\|?(name|email|age)+')).optional()
})

export const validateCreate = async(req, res, next) =>{
    try {
        await createSchema.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({message: `Field ${ error.message.replace(/"/g, '')}`})
    }
    next();
    };

export const validateUpdte = async(req, res, next) =>{
    try {
        await updateSchema.validateAsync(req.body)
    } catch (error) {
        const [{details}] = error.details;
   
        if (error.type === 'object.missing') {
            return res.status(400).json({message:'missing fields'})
        }  

        return res.status(400).json({message: `Field ${ error.message.replace(/"/g, '')}`})
    }
    next();
    };

export const validateUpdteFavorite = async(req, res, next) =>{
        try {
            await updateFavoriteSchema.validateAsync(req.body)
        } catch (error) {
            const [{details}] = error.details;
       
            if (error.type === 'object.missing') {
                return res.status(400).json({message:'missing fields favorite'})
            }
            return res.status(400).json({message: `Field ${ error.message.replace(/"/g, '')}`})
        }
        next();
        };
    
export const validateId = async(req, res, next) =>{
            if (!Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({message: `invalid Object ID`})
            }
            next()
        }

export const validateQuery = async(req, res, next) =>{
            try {
                await querySchema.validateAsync(req.query)
            } catch (error) {
                return res.status(400).json({message: error.message})
                // return res.status(400).json({message: `Field ${ error.message.replace(/"/g, '')}`})
            }
            next();
            };

