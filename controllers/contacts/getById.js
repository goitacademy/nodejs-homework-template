const { Contact } = require("../../models/contacts");
const { createError } = require("../../helpers");

const getById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  if (!result) {
    throw createError(404, `Contact with ID ${id} not found`);
  }
  res.status(200).send(result);
};

module.exports = getById;
