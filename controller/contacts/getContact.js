const Contacts = require("../../models/contacts");

// get contact by Id
const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contacts.findById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContact;
