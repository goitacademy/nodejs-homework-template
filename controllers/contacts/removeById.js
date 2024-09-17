const { createError } = require("../../helpers");
const contactsOperations = require("../../models/contacts");

const removeById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
        throw createError(404)
    }
    res.json({
        message: "contact deleted"
    })
}

module.exports = removeById;