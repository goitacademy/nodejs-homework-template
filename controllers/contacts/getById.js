const Contact = require("../../models/contact");

const { httpError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw httpError(404);
  }
  res.json(result);
};

module.exports = getById;
