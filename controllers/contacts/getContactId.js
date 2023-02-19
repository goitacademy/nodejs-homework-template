const contactsOperations = require("../../models/contacts");
const { HttpError } = require("../../helpers/HttpError");

const getContactId = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsOperations.getContactById(
    id
  );
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

module.exports = getContactId;
