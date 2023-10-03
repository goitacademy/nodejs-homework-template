const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { catchAsyns, AppError, dataValidator } = require("../utilitie");

const getAllContacts = async (req, res) => {
  const result = await listContacts();
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
  const { error } = dataValidator(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const result = await addContact(req.body);
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
  res.status(200).json({ message: "Contact deleted" });
};

const updContact = async (req, res, next) => {
  const { error } = dataValidator(req.body);
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
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = {
  getAllContacts: catchAsyns(getAllContacts),
  getOneContact: catchAsyns(getOneContact),
  addNewContact: catchAsyns(addNewContact),
  updContact: catchAsyns(updContact),
  deleteContact: catchAsyns(deleteContact),
};
