const Contacts = require("../../models/contacts");

// delete contact by Id
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;

    const contact = await Contacts.findOne({ _id: contactId, owner: _id });

    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    await Contacts.findOneAndRemove({ _id: contactId, owner: _id });

    res.status(200).json({ message: "contact is deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
