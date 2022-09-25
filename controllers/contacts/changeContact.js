const { updateContact } = require("../../models/contacts");
const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const newContact = await updateContact(contactId, body);
    res.status(200);
    res.json({ contact: newContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = changeContact;