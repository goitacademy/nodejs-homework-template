const { Contact } = require("../../models");
const createError = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw createError(404, "Not found");
  }
  res.status(200).json({ status: "success", code: 200, data });
};
module.exports = getContactById;
