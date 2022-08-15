const { RequestError } = require('../../helpers');
const contactsOperation = require('../../models');
const schemas = require('../../schemas/contact');

const addContact = async (req, res, next) => {
    try {
        const { error } = schemas.add.validate(req.body);

        if (error) {
            throw RequestError(400, error.message)
        };

        const newContact = await contactsOperation.addContact(req.body);
        res.status(201).json({ newContact });
    } catch (error) {
        next(error)
    }
};

module.exports = addContact;