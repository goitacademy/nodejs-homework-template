const { Contacts } = require("../../db/contactsModel");
async function deleteContact(req, res) {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndRemove(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
}
module.exports = {
  deleteContact,
};
