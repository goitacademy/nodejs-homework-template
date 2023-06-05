const { Contact } = require("../../models");
const createError = require("http-errors");

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: "succsess",
    code: 200,
    message: "contact deleted",
    data: deletedContact,
  });
};

module.exports = deleteContactById;