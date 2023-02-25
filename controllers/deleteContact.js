const { removeContact } = require("../models/contacts");

const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);

    res.status(200).json(`Contact by ID ${contactId}: deleted`);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  deleteContact,
};
