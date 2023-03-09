// import jwt from 'jsonwebtoken';
// import User from '../models/schemas/userModel.js'

  import Joi from "joi";

const updStatusMiddleware = (req, res, next) => {
    const schema = Joi.object({
        subscription: Joi.any().valid('starter', 'pro', 'business'.required())
    })
    const resultOfValidation = schema.validate(req.body);
    if (resultOfValidation.err) {
        return res.status(400).json(err.message)
    }
    next()
};

export default updStatusMiddleware;