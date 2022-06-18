const { createError } = require("../../helpers");
const contactsOperations = require("../../models/contacts");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}

module.exports = getById;