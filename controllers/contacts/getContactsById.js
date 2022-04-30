const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.json({ status: 200, message: "success", data: result });
};

module.exports = getContactsById;
