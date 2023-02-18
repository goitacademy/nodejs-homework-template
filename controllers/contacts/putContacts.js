const contactsOperations = require("../../models/contacts");
const { HttpError } = require("../../helpers/HttpError");

const putContacts = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsOperations.updateContact(
    id,
    req.body
  );
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

module.exports = putContacts;
