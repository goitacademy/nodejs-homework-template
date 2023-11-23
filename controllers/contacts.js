const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json({ status: "success", code: 200, data: { allContacts } });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contactById = await contacts.getById(id);
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.json({ status: "success", code: 200, data: { contactById } });
};

const addNewContact = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, "missing required name field");
  //   }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json({ status: "success", code: 201, data: { newContact } });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const removedContact = await contacts.removeContact(id);
  if (!removedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};

const updateContact = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, "missing fields");
  //   }

  const { id } = req.params;
  const updatedContact = await contacts.updateContact(id, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact updated",
    updatedContact,
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
