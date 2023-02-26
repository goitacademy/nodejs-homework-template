const Joi = require('joi');

const name = Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я0-9іІїЇєЄґҐ']{3,20}$/);
const email = Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ua', 'org', 'net']}});
const phone = Joi.string()
    .pattern(/^[+0-9]{13}$/);

const schemaPost = Joi.object().keys({
    name: name.required(),
    email: email.required(),
    phone: phone.required(),
});

const schemaUpdate = Joi.object().keys({
    name: name.optional(),
    email: email.optional(),
    phone: phone.optional(),
});


module.exports = {
    addPostValidation: (req, res, next) => {
        const validationResult = schemaPost.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({status: validationResult.error.details[0].message})
        }

        next();
    },
    updatePostValidation: (req, res, next) => {
        const validationResult = schemaUpdate.validate(req.body);
        if (validationResult.error
        ) {
            return res.status(400).json({status: validationResult.error.details[0].message})
        }
        next();
    }
};
