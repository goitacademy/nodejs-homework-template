const Joi = require('joi');

const newContactSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(14).pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).required(),
})
const updateContactSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).min(3).max(30).allow(""),
    email: Joi.string().email().allow(""),
    phone: Joi.string().min(6).max(14).pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).allow(""),
})



module.exports = {
    addContactValidation: (req, res, next) => { 
        const validationResult = newContactSchema.validate(req.body);
        // console.log(validationResult);
        if (validationResult.error) {
            // console.log(validationResult.error.details);
            return res.status(400).json({ "message": validationResult.error.details })
        }
        next()
    },
    updateContactValidation: (req, res, next) => { 
        // console.log(Object.values(req.body));
        const { name, email, phone } = req.body;
        if (name === '' && email === '' && phone === '') {
            return res.status(400).json({ "message": "missing fields (at least one of the fields should be filled)" })
        }

        const validationResult = updateContactSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ "d": validationResult.error.details })
        }
        next()
    }
}
