// const contactOperations = require("../../models/contacts");
const createError = require("http-errors");

const { Contact } = require("../../models");
const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw createError(
      404,
      `Contact with contactId - ${contactId} is not found`
    );
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { contact },
  });
};

module.exports = removeById;
