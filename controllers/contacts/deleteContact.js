const { removeContact } = require("../../servises/contacts");

const deleteContactController = async (req, res, next) => {
  const { contactId: id } = req.params;

  const contact = await removeContact(id);
  if (!contact) {
    return res.status(404).json({ message: `Not found` });
  }
  res.json({ contact, message: "Contact deleted" });
};

module.exports = {
  removeContact: deleteContactController,
};
