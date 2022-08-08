const { Contact } = require('../../models/contact');
const { createError } = require("../../utils");

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        throw createError(404);
    };
    res.json(contact);
};

module.exports = getContactById;