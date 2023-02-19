const { Contact } = require("../../models");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndDelete(contactId);

  if (!data) {
    throw createError(404, "Not found");
  }
  res.status(200).json({
    status: "succses",
    code: 200,
    message: "contact deleted",
    data,
  });
};
module.exports = removeContact;
