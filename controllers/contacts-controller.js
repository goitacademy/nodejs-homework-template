// const Joi = require("joi");

const contactService = require("./../models/index.js");
const HttpError = require("./../helpers/HttpError.js");

const ctrlWrapper = require("../decorators/ctrlWrapper.js");

const getAll = async (req, res) => {
  const result = await contactService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.getById(id);
  if (!result) {
    res.status(404);
    throw HttpError(404, `Not found with id: ${id}`);
  }
  res.json(result);
};

const post = async (req, res) => {
  const result = await contactService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactService.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, `The contact with ${contactId} is not found.`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactService.removeContact(contactId);
  if (!result) {
    res.status(404);
    throw HttpError(404, `The contact with id ${contactId} is not found.`);
  }

  res.json({
    message: "Delete is successful",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  post: ctrlWrapper(post),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
