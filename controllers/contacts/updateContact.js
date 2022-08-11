const { Contact } = require('../../models/contact');
const { createError } = require('../../utils');

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!updateContact) {
        throw createError(404);
    };
    res.json(updateContact);
};

module.exports = updateContact;