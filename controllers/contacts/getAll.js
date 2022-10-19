const contacts = require('../../models/contacts');

const getAll = async(_, res, next) => {
    try {
        const result = await contacts.listContacts();
        res.json(result)
    } catch (error) {
        next(error);
    }
};

module.exports = getAll;