const contacts = require("../../models/contacts")

const { RequestError } = require("../../helpers")

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
        throw RequestError(404, "Not found")
    }
    res.status(201).json(result)
}

module.exports = updateContact;