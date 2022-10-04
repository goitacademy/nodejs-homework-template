const contacts = require("../../models/contacts");
const { RequestError } = require("../../utils");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json(result);
};

module.exports = getById;
