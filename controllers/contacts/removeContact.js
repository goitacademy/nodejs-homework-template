const { Contact } = require('../../models/contact');
const { createError } = require("../../utils");

const removeContact = async (req, res) => {
    const { contactId } = req.params;
        const removedContact = await Contact.findByIdAndRemove(contactId);
        if (!removedContact) {
        throw createError(404);
        };
        res.json({
        message: "contact deleted",
        });
    };

module.exports = removeContact;