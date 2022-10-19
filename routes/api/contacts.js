const express = require('express')

const Joi = require('joi')

const contactValidation = (req, res, next) => {
    const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            phone: Joi.string().required()
        });

        const validationResult = schema.validate(req.body);

        if (validationResult.error) {
            return res.status(400).json({
                status: validationResult.error.details,
                code: 400,
                message: "U've got an empty row!"
            });
        }

        next();
}
    
module.exports = contactValidation;

const router = express.Router();

const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../../models/contacts');

router.get('/', listContacts);
router.get('/:contactId', getContactById);
router.post('/', contactValidation, addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', contactValidation, updateContact);

module.exports = router




