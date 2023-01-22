const { Contacts } = require("../../db/contactsModel");
async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const upContact = await Contacts.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
  if (!upContact) {
    res.status(400).json({ message: "Not found" });
  }
  res.status(200).json(upContact);
}

module.exports = {
  updateContacts,
};
