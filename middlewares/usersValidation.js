const Joi = require('joi');
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const userValidation = (req, res, next) => {

    const schema = Joi.object({
        password: Joi.string()
            .alphanum()
            .min(8)
            .max(32)
            .required(),
  
        email: Joi.string()
            .required(),
    })
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      res.status(400).json({'message': error.details[0].message})
      return
    }

    next()
}

const userTokenValidation = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    let userDetails;

    try {    
        userDetails = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err) {
        res.status(401).json({"message": "Not authorized"})
        return
    }

    const user = await User.findById(userDetails.id)

    if(!user) {
        res.status(401).json({"message": "Not authorized"})
        return
    }

    req.user = user

    next()
}

module.exports = {userValidation, userTokenValidation}