const contacts = require("../../models/contacts");
const { RequestError } = require("../../utils/index");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(req.params);
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  console.log(result);
  res.status(200).json(result);
};

module.exports = getContactById;
