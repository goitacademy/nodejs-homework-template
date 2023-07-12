const { listContacts, removeContact } = require("../../../models/contacts");

const deleteController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const currentContacts = await listContacts();

    const index = currentContacts.findIndex((item) => item.id === contactId);

    if (index === -1) {
      res.status(404).json({ message: "Not found" });
    } else {
      await removeContact(contactId);

      res.status(200).json({ message: "Contact deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteController,
};
