// -----------------------------------------------------
//                 Controllers
// -----------------------------------------------------
const contacts = require("../models/contacts");
const { ctrlWrapper } = require("../utils");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json({
    code: 200,
    result: result,
  });
};

const getContactById = async (req, res) => {
  const contact = await contacts.getContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    code: 200,
    result: contact,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
