const { ctrlWrapper, AppError } = require("../utils");

const { Contact } = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");


const {
  addSchema,
  updateFavoriteSchema,
} = require("../utils/validation/contactValidationSchema");

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const body = req.body;
  const { error } = addSchema.validate(body);
  if (error) {
    throw new AppError(400, "Missing required name field");
  }
  const result = await Contact.create({ ...body });
  res.status(201).json({ result });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error } = addSchema.validate(body);
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (error) {
    throw new AppError(400, "Missing fields");
  }

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ result, message: "Contact updated" });
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { error } = updateFavoriteSchema.validate({ favorite });
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (error) {
    throw new AppError(400, "Missing field favorite");
  }
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ result });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ result, message: "Contact deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  removeContact: ctrlWrapper(removeContact),
};
