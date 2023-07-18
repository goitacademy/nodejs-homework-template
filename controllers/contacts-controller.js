const contactsService = require("../models/contacts.js");
const { HttpError } = require("../helpers/HttpError.js");
const { ctrlWrapper } = require("../decorators/index.js");

const getAll = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const add = async (req, res) => {
  const result = await contactsService.addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);

  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);

  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
