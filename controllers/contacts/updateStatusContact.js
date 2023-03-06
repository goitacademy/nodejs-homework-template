const Contact = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!req.body) {
    res.status(400).json({ message: "missing field favorite" });
  }
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

module.exports = updateStatusContact;