const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const deleteContactById = await Contact.findByIdAndRemove(contactId);
  if (!deleteContactById) {
    throw new NotFound(`Contact not found`);
  }
  res.status(200).json({
    message: "contact deleted successfully",
    result: deleteContactById,
  });
};

module.exports = removeById;
