const createError = require("../../helpers/createError");
const { getContactById } = require("../../models/contactsModel");

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    throw createError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = getById;
