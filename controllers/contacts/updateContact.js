const contacts = require("../../models/contacts");

const updateContact = async (req, res, next) => {
    try {
      const contact = await contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        res.json(contact);
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};

module.exports = { updateContact };