const { httpError } = require("../../helpers");
const { getContactById } = require("../../services/contactsService");

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await getContactById(contactId, _id);
  if (!contact) throw httpError(400, "Bad request!");

  res.json(contact);
};

module.exports = { getContactByIdController };
