const { listContacts } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
//
const getList = async (__, res) => {
  const result = await listContacts();
  if (!result) {
    throw HttpError(404, "Contacts not found");
  }
  res.status(200).json(result);
};
module.exports = getList;
