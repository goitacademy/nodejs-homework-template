const { removeContact } = require("../models/contacts");

const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);

    res.status(201).json(`Contact by ID ${contactId}: deleted`);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

module.exports = {
  deleteContact,
};
