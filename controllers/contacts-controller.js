const { Contact } = require("../models/Contact");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../decorators");

const listContactsController = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const addContactController = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
/*
const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({ message: "Delete success" });
};
*/

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

module.exports = {
  listContactsController: controllerWrapper(listContactsController),
  getContactByIdController: controllerWrapper(getContactByIdController),
  addContactController: controllerWrapper(addContactController),
  //removeContactController: controllerWrapper(removeContactController),
  updateContactController: controllerWrapper(updateContactController),
};
