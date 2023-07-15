const { Contact } = require("../../models");

const createError = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createError(404, `Product with ID=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: contact },
  });
};

module.exports = getById;