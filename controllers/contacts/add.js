const { createError } = require("../../helpers");
const contactsOperations = require("../../models/contacts");
const { contactSchema } = require("../../schemas/contacts");

const add = async (req, res) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
        throw createError(400, error.message);
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json(result);
}

module.exports = add;