const contactsOperations = require('../../models/contacts');

const listContacts  = async (req, res, next) => {
    try {
        const contacts = await contactsOperations.listContacts()
        res.status(200).json({
            data: {
                result: contacts
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = listContacts;