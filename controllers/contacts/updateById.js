const { RequestError } = require("../../utils/requestError");
const { updateContactById } = require("../../models/contacts");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContactById(contactId, req.body);
  if (!result) {
    throw RequestError(404, `Contacts with ${id} not found`);
  }
  res.status(200).json(result);
};

module.exports = updateById;