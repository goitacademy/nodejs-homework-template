const contacts = require("../../models/contacts");

const removeContact = async (req, res, next) => {
    try {
        const contact = await contacts.removeContact(req.params.contactId);
        if (contact) {
            res.json({ message: 'contact deleted' });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = { removeContact };