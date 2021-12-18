/* eslint-disable semi */
/* eslint-disable quotes */
const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
} = require("../model/contacts");

const { NotFound } = require("http-errors");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw new NotFound(`Product with id=${id} not found`);
  }
  res.json(contact);
};

const add = async (req, res, next) => {
  const result = await addContact(req.body);
  console.log(result);
  res.json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  const result = await updateContactById(id, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result },
  });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
};
