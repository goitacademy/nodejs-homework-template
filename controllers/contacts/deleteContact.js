const contactsOperations = require("../../models/contacts");
const { HttpError } = require("../../helpers/HttpError");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsOperations.removeContact(
    id
  );
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

module.exports = deleteContact;
