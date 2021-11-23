const { removeContact } = require("../../controllers");
const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);
  console.log(removedContact);

  if (!removedContact) {
    return res.json({ message: "Not found", code: 404, status: "failed" });
  }

  return res.json({ message: "contact deleted", status: "success", code: 200 });
};

module.exports = deleteContact;
