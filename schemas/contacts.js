import Joi from 'joi';

const schemaValidation = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    phone: Joi.string().label('Number').required(),
});

export default schemaValidation;