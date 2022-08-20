const contacts = require("../../models/contacts");
const { requestError } = require("../../helpers/");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw requestError(404, `Id ${id} not found, try a different id`);
  }
  res.json({ message: "Contact deleted" });
};

module.exports = removeContact;
