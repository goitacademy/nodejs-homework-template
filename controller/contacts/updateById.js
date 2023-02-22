const { updateContact } = require("../../models/contacts");
const { RequestError } = require("../../helpers/RequestError");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.status(200).json(result);
};

module.exports = updateById;
