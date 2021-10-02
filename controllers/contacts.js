const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../helpers/index");
const contactsOperations = require("../model/contacts/index");

const getAll = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({ status: "success", code: 200, payload: contacts });
};

const getById = async (req, res, next) => {
  const result = await contactsOperations.getContactById(req.params.contactId);

  if (!result) {
    throw new NotFound("Not found.");
  }

  sendSuccessRes(res, { result });
};

const post = async (req, res, next) => {
  const result = await contactsOperations.addContact(req.body);
  sendSuccessRes(res, { result }, 201);
};

const removeById = async (req, res, next) => {
  const result = await contactsOperations.removeContact(req.params.contactId);

  if (!result) {
    throw new NotFound("Not found.");
  }
  sendSuccessRes(res, { message: "Success delete" });
};

const put = async (req, res, next) => {
  const result = await contactsOperations.updateContact(
    req.params.contactId,
    req.body
  );

  if (!result) {
    throw new NotFound("Not found.");
  }
  sendSuccessRes(res, { result });
};

module.exports = {
  getAll,
  getById,
  post,
  removeById,
  put,
};
