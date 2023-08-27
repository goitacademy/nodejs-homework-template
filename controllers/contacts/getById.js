const { Contact } = require("../../models");
const { httpError } = require("../../helpers");

const getById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw httpError(404, "This contact was not found");
  }
  return res.json(result);
};

module.exports = getById;
