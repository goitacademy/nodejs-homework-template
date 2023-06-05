const { RequestError } = require("../../utils/requestError");
const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw RequestError(404, `Contact with ${id} not found`);
  }
  res.status(200).json(result);
};

module.exports = getById;