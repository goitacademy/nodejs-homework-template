const constacts = require("../../models/contacts")

const getAll = async (req, res, next) => {
    const result = await constacts.listContacts();

    res.json(result);

}

module.exports = getAll;