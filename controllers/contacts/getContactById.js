const { createError } = require("../../helpers");

const { Contact } = require("../../models/contacts");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getContactById;
