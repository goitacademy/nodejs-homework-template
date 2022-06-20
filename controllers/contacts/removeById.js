const { Contact } = require("../../models");
const createError = require("http-errors");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: {
      result: removedContact,
    },
  });
};

module.exports = removeById;
