const { Contact } = require("../../models");
const createError = require("http-errors");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  if (!data) {
    throw createError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data,
  });
};
module.exports = updateStatusContact;
