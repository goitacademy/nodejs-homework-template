// import jwt from 'jsonwebtoken';
// import User from '../models/schemas/userModel.js'
  import Joi from "joi";

const verificationMiddleware = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    });
    const validationRes = schema.validate(req.body);

    if (validationRes.error) {
        return res
            .status(400)
            .json({ message: validationRes.error });
    }
    next();
};

export default verificationMiddleware;