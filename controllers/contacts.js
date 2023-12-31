const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const getAllContacts = await contacts.listContacts();
  res.status(200).json(getAllContacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const getContact = await contacts.getContactById(contactId);

  if (!getContact) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json(getContact);
};

const addContact = async (req, res, next) => {
  const requiredFields = ["name", "email", "phone"];
  const missingFields = requiredFields.filter((field) => !(field in req.body));
  if (missingFields.length > 0) {
    return res.status(400).send({
      message: `missing required ${missingFields.join(", ")} field(s)`,
    });
  }
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, error.message);
  //   }
  const addedContact = await contacts.addContact(req.body);
  res.status(201).json(addedContact);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  console.log(deletedContact);
  if (!deletedContact) {
    throw HttpError(400, "Not found!");
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const requiredFields = ["name", "email", "phone"];
  const missingFields = requiredFields.filter((field) => !(field in req.body));
  if (missingFields.length > 0) {
    return res.status(400).send({
      message: `missing ${missingFields.join(", ")} field(s)`,
    });
  }
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, error.message);
  //   }
  const { contactId } = req.params;
  const updatedContact = await contacts.updateContact(contactId, req.body);
  if (!updatedContact) {
    throw HttpError(400, "Not found!");
  }
  res.status(201).json(updatedContact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
