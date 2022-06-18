const { createError } = require("../../helpers");
const contactsOperations = require("../../models/contacts");
const { contactSchema } = require("../../schemas/contacts");

const updateById = async (req, res) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
        throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}

module.exports = updateById;