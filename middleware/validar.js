const Joi = require('joi');
const express = require('express');

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

const validate= (req, res, next) => {
    const { error, value } = userSchema.validate(req.body);
                                    
    console.log(req.body, error); 
    
    if (error) {
        return res.status(406).json({ message: `Missing required field(s): ${error.details.map(detail => detail.context.key).join(', ')}` });
    }
    
    next();
};

module.exports = validate;
