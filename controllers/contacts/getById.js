const contacts = require("../../models/contacts");
const { RequesError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactsId } = req.params;
  const result = await contacts.getContactById(contactsId);
  res.status(200).json(result);
  if (!result) {
    throw RequesError(404, "Not found");
  }
  res.json(result);
};
module.exports = getById;
