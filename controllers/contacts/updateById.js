const contactOperations = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactOperations.updateContactById(contactId, req.body);
  if (!result) {
    throw RequestError(404, "NotFound");
  }
  res.json(result);
};

module.exports = updateById;
