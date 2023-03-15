const Contact = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findOneAndUpdate(contactId, req.body, {new: true});

  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

module.exports = updateStatusContact;