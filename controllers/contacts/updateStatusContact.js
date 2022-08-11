const { Contact } = require('../../models/contact');
const { createError } = require("../../utils");

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!updatedContact) {
        throw createError(404);
    };
    res.json(updatedContact);
};

module.exports = updateStatusContact;