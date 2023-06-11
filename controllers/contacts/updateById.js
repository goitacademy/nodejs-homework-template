const createError = require("http-errors");
const contacts = require("../../models/contacts");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  console.log("id", req.params);
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw createError(404, "Not found");
  }
  console.log("result", result);
  res.status(200).json(result);
};

module.exports = updateById;
