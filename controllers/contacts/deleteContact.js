const { HTTP404Error } = require("../../helpers/errorHandlers");
const { removeContact } = require("../../services");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);

  if (!removedContact) {
    throw new HTTP404Error(`There is no such contact with id: ${contactId}`);
  }

  return res.json({ message: "contact deleted", status: "success", code: 200 });
};

module.exports = deleteContact;
