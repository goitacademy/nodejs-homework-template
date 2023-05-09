const { changeContact } = require("../services/contactsServices");

const updateContact = async (req, res, __) => {
  const { contactId } = req.params;
  const body = req.body;
  const updatedContact = await changeContact(contactId, body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  if (!Object.values(body).length) {
    return res.status(400).json({ message: "missing fields" });
  }

  res.status(200).json(updatedContact);
};

module.exports = updateContact;
