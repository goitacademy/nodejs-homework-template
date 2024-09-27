const { getContactById } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
//
const getById = async (req, res) => {
  console.log(req.params.contactId);
  const result = await getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};
module.exports = getById;
