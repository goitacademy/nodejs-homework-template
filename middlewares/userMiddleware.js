// import jwt from 'jsonwebtoken';
// import User from '../models/schemas/userModel.js'
  import Joi from "joi";

const userMiddleware = (req, res, next) => {
    const schema = Joi.object({

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    });
    const resultOfValidation = schema.validate(req.body);
    if (resultOfValidation.err) {
        return res.status(400).json(err.message)
    }
    next()
};

export default userMiddleware