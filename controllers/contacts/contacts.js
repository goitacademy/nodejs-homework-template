const contactsOperations = require("../../models/contacts");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await contactsOperations.getContactById(id);

  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const addContact = async (req, res) => {
  const result = await contactsOperations.addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Contact added successfully",
    data: {
      result,
    },
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact updated successfully",
    data: {
      result,
    },
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted successfully",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
