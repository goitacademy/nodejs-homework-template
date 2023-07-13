const { UpsErrors, schemas, ctrlWraper } = require("../Helpers");
const { Contact } = require("../models/contact");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw UpsErrors(404, "Request faild");
  }
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw UpsErrors(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = schemas.validate(req.body);
  if (error) {
    throw UpsErrors(404, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw UpsErrors(404, "Error deleting the Contact");
  }
  res.json({ message: "Huray! its deleted" });
};

const updateContact = async (req, res) => {
  const { error } = schemas.validate(req.body);
  if (error) {
    throw UpsErrors(404, error.message);
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw UpsErrors(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { error } = schemas.validate(req.body);
  if (error) {
    throw UpsErrors(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw UpsErrors(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWraper(listContacts),
  getContactById: ctrlWraper(getContactById),
  addContact: ctrlWraper(addContact),
  removeContact: ctrlWraper(removeContact),
  updateContact: ctrlWraper(updateContact),
  updateFavorite: ctrlWraper(updateFavorite),
};
