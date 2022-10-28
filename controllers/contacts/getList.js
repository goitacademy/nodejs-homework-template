const contacts = require("../../models/contacts")

const getList = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
}

module.exports = getList;