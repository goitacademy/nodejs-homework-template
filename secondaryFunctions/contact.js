const contacts = require('../models/contacts');


const getAll = async (reg, res) => {
    const result = await contacts.listContacts();
    res.JSON(result);
}

module.exports = {
    getAll,
}