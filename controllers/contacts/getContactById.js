const { Contact } = require("../../models/contact");
const createError = require("../../helpers/createError");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-createdAt -updatedAt");
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};
module.exports = getContactById;
