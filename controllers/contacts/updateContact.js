const { RequestError } = require('../../helpers');
const contactsOperation = require('../../models');
const schemas = require('../../schemas/contact');

const updateContact = async (req, res, next) => {
    try {
        const { error } = schemas.add.validate(req.body);

        if (error) {
            throw RequestError(400, error.message)
        };

        const { contactId } = req.params;
        const updateContact = await contactsOperation.updateContact(contactId, req.body);

        if (!updateContact) {
            throw RequestError(404, 'Not found');
        };

        res.json({ updateContact })
    } catch (error) {
        next(error);
    };
};

module.exports = updateContact;