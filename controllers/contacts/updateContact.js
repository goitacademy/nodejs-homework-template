const { updateContact } = require("../../servises/contacts");

const updateContactController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const updatedContact = req.body;

  if (!updatedContact) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const contact = await updateContact(id, updatedContact);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ contact, message: "Success, contact updated" });
};

module.exports = {
  updateContact: updateContactController,
};
