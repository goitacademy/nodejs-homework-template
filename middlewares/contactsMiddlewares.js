const fs = require('fs').promises;

const contactsPath = require('../models/contacts');

exports.checkUserById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);

        const getItem = await contacts.find(item => item.id === contactId);

        if (!getItem) {
            return null;
        }

        req.getItem = getItem;

        next();
    } catch (error) {}
};
