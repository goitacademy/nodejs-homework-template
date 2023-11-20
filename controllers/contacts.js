const { Contact, schemas } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const validationResult = schemas.addSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details[0].message });
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const validationResult = schemas.updateFavoriteSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details[0].message });
  }

  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

const favorite = async (req, res) => {
  const { id } = req.params;
  const validationResult = schemas.updateFavoriteSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details[0].message });
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
  favorite: ctrlWrapper(favorite),
};
