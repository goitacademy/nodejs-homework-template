const Contacts = require("../../models/contacts");

// delete contact by Id
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.findById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    await Contacts.findByIdAndRemove(contactId);

    res.status(200).json({ message: "contact is deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
