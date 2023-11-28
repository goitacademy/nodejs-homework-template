const { contactsSchema } = require("../../schemas");
const { HttpError } = require("../../helpers");
const asyncHandler = require("express-async-handler");
const { ContactServices } = require("../../services");

const createContact = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { _id: owner } = req.user;
  if (!name) {
    throw HttpError(400, "provide all required fields");
  }
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await ContactServices.add({ ...req.body, owner });
  res.status(201).json({ code: 201, message: "Success", data: result });
});

module.exports = createContact;
