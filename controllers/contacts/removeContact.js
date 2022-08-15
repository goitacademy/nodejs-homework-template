const { RequestError } = require('../../helpers');
const contactsOperation = require('../../models');

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const removedContact = await contactsOperation.removeContact(contactId);

        if (!removedContact) {
            throw RequestError(404, 'Not found');
        }

        res.json({ message: 'contact deleted' })
    } catch (error) {
        next(error)
    }
};

module.exports = removeContact;