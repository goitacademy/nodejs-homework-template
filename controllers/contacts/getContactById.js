const { HttpError } = require("../../helpers");
const asyncHandler = require("express-async-handler");
const { ContactServices } = require("../../services");

const getContactById = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactServices.getById(contactId);
  if (!result) {
    throw HttpError(404, `not found`);
  }
  res.json({ code: 200, message: "Success", data: result });
});

module.exports = getContactById;
