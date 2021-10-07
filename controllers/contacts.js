const { NotFound } = require("http-errors");

const contactsOperations = require("../model/contacts");

const getAll = async (req, res, next) => {
  const contacts = await contactsOperations.getAll();
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
  const contact = await contactsOperations.getById(id);
  if (!contact) {
    throw new NotFound(`Contacts with id=${id} not found`);
  }
  res.json(contact);
};

const add = async (req, res, next) => {
  const result = await contactsOperations.add(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.updateById(id, req.body);
  if (!result) {
    throw new NotFound(`Contacts with id=${id} not found`);
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
  const result = await contactsOperations.removeById(id);
  if (!result) {
    throw new NotFound(`Contacts with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Success delete",
  });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
};
