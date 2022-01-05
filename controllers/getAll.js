const { Contact } = require("../models")

const getAll = async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts)
}

module.exports = getAll;