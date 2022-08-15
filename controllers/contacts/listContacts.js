const contactsOperation = require('../../models');

const listContacts = async (_, res, next) => {
    try {
        const allContacts = await contactsOperation.listContacts()
        res.json({ allContacts })
    } catch (error) {
        next(error)
    };
};

module.exports = listContacts;