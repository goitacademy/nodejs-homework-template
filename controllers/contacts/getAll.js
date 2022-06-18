const contactsOperations = require("../../models/contacts");

const getAll = async (req, res)=> {
    const result = await contactsOperations.listContacts();
    res.json(result);
}

module.exports = getAll;