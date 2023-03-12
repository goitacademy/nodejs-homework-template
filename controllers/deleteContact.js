const { removeContact } = require('../models/contacts')

const deleteContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        await removeContact(contactId);
        res.status(200).json(`Contact ${contactId} deleted`);
    } catch (err) {
        res.status(404).json('Not found');
    }
};

module.exports = {
    deleteContact,
};