const {
  listContacts,
  updateContact,
  getContactById,
} = require("../models/contacts");

const putController = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Missing fields" });
    }
    if (!req.body.name) {
      res.status(400).json({ message: 'Missing required "name" field' });
    }
    if (!req.body.email) {
      res.status(400).json({ message: 'Missing required "email" field' });
    }
    if (!req.body.phone) {
      res.status(400).json({ message: 'Missing required "email" field' });
    }
    const { contactId } = req.params;

    const currentContacts = await listContacts();

    const index = currentContacts.findIndex((item) => item.id === contactId);

    if (index !== -1) {
      await updateContact(contactId, req.body);

      const updatedContact = await getContactById(contactId);

      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  putController,
};
