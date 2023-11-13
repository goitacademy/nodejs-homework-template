const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusFavoriteContact,
  filterContactsByQuery,
} = require("../models/contacts");
const {
  catchAsyns,
  AppError,
  statusValidator,
  contactValidator,
} = require("../utilitie");
const { Contact } = require("../models/contactModel");

const getAllContacts = async (req, res) => {
  const result = await listContacts(req);
  res.status(200).json({
    status: "success",
    code: "200",
    data: {
      result,
    },
  });
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
    throw AppError(404, `Product with id=${id} not found`);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const addNewContact = async (req, res) => {
  const { error } = contactValidator(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const result = await addContact(req);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw AppError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact with id ${id} deleted`,
  });
};

const updContact = async (req, res) => {
  const { error } = contactValidator(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw AppError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

  const { error } = statusValidator(req.body);
  if (error) {
    error.status = 400;
    error.message = "Missing field favorite";
    throw error;
  }

  const result = await updateStatusFavoriteContact(id, req.body);
  if (!result) {
    throw AppError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const filterContacts = async (req, res) => {

  const contacts = await filterContactsByQuery(req.user, req.query);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = {
  getAllContacts: catchAsyns(getAllContacts),
  getOneContact: catchAsyns(getOneContact),
  addNewContact: catchAsyns(addNewContact),
  updContact: catchAsyns(updContact),
  deleteContact: catchAsyns(deleteContact),
  updateStatusContact: catchAsyns(updateStatusContact),
  filterContacts: catchAsyns(filterContacts),
};
