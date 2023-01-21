// const contactOperations = require("../../models/contacts");
const { Contact } = require("../../models");
const createError = require("http-errors");
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createError(
      404,
      `Contact with contactId - ${contactId} is not found`
    );
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

module.exports = getById;
