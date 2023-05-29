const { HttpError } = require("../../helpers");
const asyncHandler = require("express-async-handler");
const { ContactServices } = require("../../services");

const deleteContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactServices.delete(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({ status: 200, message: "contact deleted" });
});

module.exports = deleteContact;
