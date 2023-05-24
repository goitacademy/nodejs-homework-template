const contactsService = require("../models/contacts");

const HttpError = require("../helpers/HttpError");

const ctrlWrapper = require("../decorators/ctrlWrapper");
const contactsAddSchema = require("../schemas/contacts-schemas");

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  console.log(req);
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const error = await contactsAddSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsService.addContact(req.body);

  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(400, `missing fields`);
  }

  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContactById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  deleteContactById: ctrlWrapper(deleteContactById),
};
