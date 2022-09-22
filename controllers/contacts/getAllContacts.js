const contacts = require("../../models/contacts");

const getAllContacts = async (req, res) => {
    const data = await contacts.listContacts();
    res.json(data);
};

module.exports = getAllContacts;