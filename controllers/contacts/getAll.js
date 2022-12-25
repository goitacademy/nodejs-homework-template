const contactsOperations = require("../../models/contactsOperations");

const getAll = async (req, res) => {
    const all = await contactsOperations.listContacts();
    res.json(all);
}

module.exports = getAll;