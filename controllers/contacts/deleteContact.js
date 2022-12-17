const { removeContact } = require("../../models/contacts");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  if (!deletedContact) {
    const err = new Error("Not found");
    err.status = 404;
    throw err;
  }

  res.json({ status: "success", data: deletedContact });
};
module.exports = deleteContact;
